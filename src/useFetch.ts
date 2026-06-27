import { useState, useEffect } from "react";

// <T> = ใช้กับข้อมูล type ไหนก็ได้ (Post, Todo, อะไรก็ได้)
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [url]); // โหลดใหม่ถ้า url เปลี่ยน

  // คืน 3 ค่าให้ component เอาไปใช้
  return { data, loading, error };
}
