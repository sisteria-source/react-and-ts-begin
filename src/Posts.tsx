// import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { Link } from "react-router-dom";

type Post = {
    id: number;
    title: string;
    body: string;
};

export function Posts() {
    // const [posts, setPosts] = useState<Post[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");

    //   useEffect(() => {
    //     // เรียก API ตอน component โหลดครั้งแรก
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //       .then((res) => {
    //         if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
    //         return res.json();
    //       })
    //       .then((data) => {
    //         setPosts(data);
    //         setLoading(false);
    //       })
    //       .catch((err) => {
    //         setError(err.message);
    //         setLoading(false);
    //       });
    //   }, []); // [] = ทำครั้งเดียวตอนเปิดหน้า
    // useEffect(() => {
    //     // สร้างฟังก์ชัน async แยกข้างใน
    //     async function loadPosts() {
    //         try {
    //             const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    //             if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
    //             const data = await res.json();
    //             setPosts(data);
    //         } catch (err) {
    //             if (err instanceof Error) setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     loadPosts(); // เรียกใช้
    // }, []);
    const { data: posts, loading, error } = useFetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
    );


    // 1. สถานะกำลังโหลด
    if (loading) return <p className="text-center text-gray-500 py-10">⏳ กำลังโหลด...</p>;

    // 2. สถานะ error
    if (error) return <p className="text-center text-red-500 py-10">❌ {error}</p>;

    // 3. สถานะสำเร็จ — แสดงข้อมูล
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">
                📰 โพสต์ทั้งหมด ({posts?.length ?? 0})
            </h1>
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
