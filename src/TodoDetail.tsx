import { useParams, Link } from "react-router-dom";

import { useTodos } from "./TodoContext";


export function TodoDetail() {
  // 1. ดึง id ออกจาก URL
  const { id } = useParams();

  // 2. โหลด todos จาก localStorage แล้วหาตัวที่ id ตรง
  const { todos } = useTodos(); // หยิบจากตู้กลาง! ไม่อ่าน localStorage แล้ว

  const todo = todos.find((t) => t.id === Number(id));

  // 3. ถ้าหาไม่เจอ
  if (!todo) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">ไม่พบงานนี้ 🤔</h1>
        <Link to="/todos" className="text-indigo-400 hover:underline">
          ← กลับไปลิสต์งาน
        </Link>
      </div>
    );
  }

  // 4. ถ้าเจอ แสดงรายละเอียด
  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link to="/todos" className="text-indigo-400 hover:underline">
        ← กลับไปลิสต์งาน
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-4">รายละเอียดงาน</h1>
      <div className="p-5 bg-gray-800 rounded-lg space-y-2">
        <p className="text-gray-400">
          ID: <span className="text-white">{todo.id}</span>
        </p>
        <p className="text-gray-400">
          ข้อความ: <span className="text-white">{todo.text}</span>
        </p>
        <p className="text-gray-400">
          สถานะ:{" "}
          <span className={todo.done ? "text-green-400" : "text-yellow-400"}>
            {todo.done ? "✅ เสร็จแล้ว" : "⏳ ยังไม่เสร็จ"}
          </span>
        </p>
      </div>
    </div>
  );
}
