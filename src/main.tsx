import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Home } from "./Home";
import { About } from "./About";
import { TodoApp } from "./TodoApp";
import { TodoDetail } from "./TodoDetail";
import { Posts } from "./Posts";
import { PostsQuery } from "./PostsQuery";
import { PostDetail } from "./PostDetail";
import { TodoProvider } from "./TodoContext";
import "./pages.css";
import { SignupForm } from "./SignupForm";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <TodoProvider>

      <BrowserRouter>
        {/* แถบเมนู แสดงทุกหน้า */}
        <nav style={{ display: "flex", gap: 16, padding: 16 }}>
          <NavLink to="/" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            หน้าแรก
          </NavLink>
          <NavLink to="/todos" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            งานของฉัน
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            เกี่ยวกับ
          </NavLink>
          <NavLink to="/posts" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            โพสต์
          </NavLink>
          <NavLink to="/posts-query" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            โพสต์ ⚡
          </NavLink>
          <NavLink to="/signup" style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#646cff" : "#888",
          })}>
            สมัคร
          </NavLink>


        </nav>


        {/* ตรงนี้จะสลับเนื้อหาตาม URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts-query" element={<PostsQuery />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/signup" element={<SignupForm />} />




          <Route path="*" element={
            <div style={{ padding: 20 }}>
              <h1>🚧 404 - ไม่พบหน้านี้</h1>
              <p>ขออภัย ไม่มีหน้าที่คุณกำลังหา</p>
              <NavLink to="/">กลับหน้าแรก</NavLink>
            </div>
          } />

        </Routes>
      </BrowserRouter>
    </TodoProvider>
    </QueryClientProvider>
  </StrictMode>
);
