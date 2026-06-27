import { useState, useRef, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./TodoContext";
import { useMemo } from "react";   // เพิ่ม import
import { useCallback } from "react";

export function TodoApp() {
    // หยิบจากตู้กลาง! ไม่ต้องมี state/logic ของ todos ในนี้แล้ว
    const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

    // state เฉพาะ UI ของหน้านี้ (เก็บไว้เหมือนเดิม)
    const [text, setText] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus(); // โฟกัสตอน component โหลดครั้งแรก
    }, []);


    // const visibleTodos = todos.filter((todo) => {
    //     if (filter === "active") return !todo.done;
    //     if (filter === "done") return todo.done;
    //     return true;
    // });


    const visibleTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === "active") return !todo.done;
            if (filter === "done") return todo.done;
            return true;
        });
    }, [todos, filter]);   // 👈 คำนวณใหม่เฉพาะเมื่อ todos หรือ filter เปลี่ยน



    // ปุ่มเพิ่ม: เรียก addTodo จากตู้ แล้วล้างช่อง
    // function handleAdd() {
    //     addTodo(text);
    //     setText("");
    // }
    const handleAdd = useCallback(() => {
        addTodo(text);
        setText("");
    }, [text, addTodo]);



    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-gray-900 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-4">📝 Todo List ของฉัน</h2>

            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
                    placeholder="พิมพ์งานที่ต้องทำ..."
                />
                <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 font-medium"
                    onClick={handleAdd}
                >
                    เพิ่ม
                </button>
            </div>

            <div className="flex gap-2 mt-4">
                {(["all", "active", "done"] as const).map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-md text-sm ${
                            filter === f
                                ? "bg-indigo-500 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                        {f === "all" ? "ทั้งหมด" : f === "active" ? "ยังไม่เสร็จ" : "เสร็จแล้ว"}
                    </button>
                ))}
            </div>

            {visibleTodos.length === 0 ? (
                <p className="text-center text-gray-500 italic py-6">
                    {filter === "all"
                        ? "🎉 ยังไม่มีงาน เพิ่มงานแรกของคุณเลย!"
                        : "ไม่มีงานในหมวดนี้"}
                </p>
            ) : (
                <ul className="mt-4 space-y-2">
                    {visibleTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={() => toggleTodo(todo.id)}
                            onDelete={() => deleteTodo(todo.id)}
                        />
                    ))}
                </ul>
            )}

            {todos.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                    ตอนนี้มีงานทั้งหมด: {todos.length} อัน
                </p>
            )}
        </div>
    );

}
