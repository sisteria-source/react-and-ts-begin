import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Todo } from "./types";

// 1. รูปร่างของข้อมูลในตู้ (มีอะไรให้หยิบบ้าง)
type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
editTodo: (id: number, newText: string) => void;   // 👈 เพิ่ม

};

// 2. สร้างตู้ (เริ่มเป็น null)
const TodoContext = createContext<TodoContextType | null>(null);

// 3. Provider = ตัวที่ถือ state จริง + เติมลงตู้
export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("my-todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string) {
    if (text === "") return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function editTodo(id: number, newText: string) {
  setTodos(
    todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
  );
}

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo, editTodo  }}>
      {children}
    </TodoContext.Provider>
  );
}

// 4. Custom hook สำหรับหยิบข้อมูลจากตู้ (พร้อมเช็ค null)
// eslint-disable-next-line react-refresh/only-export-components
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos ต้องอยู่ใน TodoProvider");
  return context;
}
