import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function PostsQuery() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient(); // เข้าถึง cache เพื่อสั่งรีเฟรช

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"], // ป้ายชื่อข้อมูลนี้ (ใช้สำหรับ cache)
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
      return res.json() as Promise<Post[]>;
    },
  });

  // 🆕 mutation สำหรับ "สร้างโพสต์ใหม่" (POST)
  const createPost = useMutation({
    mutationFn: async (newTitle: string) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: "เนื้อหาตัวอย่าง" }),
      });
      if (!res.ok) throw new Error("สร้างโพสต์ไม่สำเร็จ");
      return res.json() as Promise<Post>;
    },
    onSuccess: () => {
      // สำเร็จ → สั่งให้รายการโพสต์โหลดใหม่
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle(""); // ล้างช่อง
    },
  });

  if (isLoading)
    return <p className="text-center text-gray-500 py-10">⏳ กำลังโหลด...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">
        ❌ {(error as Error).message}
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        ⚡ โพสต์ (TanStack Query) ({posts?.length ?? 0})
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        เวอร์ชันนี้มี cache — กลับมาหน้านี้อีกครั้งจะไม่โหลดใหม่
      </p>

      {/* 🆕 ฟอร์มสร้างโพสต์ */}
      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="หัวข้อโพสต์ใหม่..."
          className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
        />
        <button
          type="button"
          onClick={() => createPost.mutate(title)}
          disabled={createPost.isPending || title === ""}
          className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 font-medium disabled:opacity-50"
        >
          {createPost.isPending ? "กำลังสร้าง..." : "สร้างโพสต์"}
        </button>
      </div>

      <ul className="space-y-3">
        {posts?.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Link
              to={`/posts/${post.id}`}
              className="text-lg font-semibold text-indigo-400 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-400 mt-2 line-clamp-2">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
