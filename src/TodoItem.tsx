import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodos } from "./TodoContext";
import type { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export function TodoItem(props: TodoItemProps) {
  const { editTodo } = useTodos();              // หยิบ editTodo จากตู้กลาง
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(props.todo.text);

  function handleSave() {
    editTodo(props.todo.id, editText);
    setIsEditing(false);                        // กลับสู่โหมดปกติ
  }

  // 🅰️ โหมดแก้ไข
  if (isEditing) {
    return (
      <li className="flex items-center gap-2 p-3 bg-gray-800 rounded-md">
        <input
          className="flex-1 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-500"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
        />
        <button
          type="button"
          onClick={handleSave}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
        >
          บันทึก
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-sm"
        >
          ยกเลิก
        </button>
      </li>
    );
  }

  // 🅱️ โหมดปกติ
  return (
    <li className="flex items-center gap-2 p-3 bg-gray-800 rounded-md">
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={props.todo.done}
          onChange={props.onToggle}
          className="w-4 h-4 accent-indigo-500"
        />
        <span className={props.todo.done ? "line-through text-gray-500" : ""}>
          {props.todo.text}
        </span>
      </label>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white text-sm"
      >
        แก้ไข
      </button>
      <Link
        to={`/todos/${props.todo.id}`}
        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm no-underline"
      >
        ดู
      </Link>
      <button
        type="button"
        onClick={props.onDelete}
        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
      >
        ลบ
      </button>
    </li>
  );
}
