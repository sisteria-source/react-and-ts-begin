import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function PostDetail() {
  const { id } = useParams(); // ดึง id จาก URL

  // เอา id ต่อท้าย url → ขอโพสต์ตัวเดียวจาก API
  const { data: post, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (loading) return <p className="text-center text-gray-500 py-10">⏳ กำลังโหลด...</p>;
  if (error) return <p className="text-center text-red-500 py-10">❌ {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link to="/posts" className="text-indigo-400 hover:underline">
        ← กลับไปลิสต์โพสต์
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-3">{post?.title}</h1>
      <p className="text-gray-300 leading-relaxed">{post?.body}</p>
      <p className="text-sm text-gray-500 mt-4">โพสต์ ID: {post?.id}</p>
    </div>
  );
}
