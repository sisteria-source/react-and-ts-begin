export function Home() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-purple-500 mb-4">
        🏠 หน้าแรก
      </h1>
      <p className="text-gray-400 leading-relaxed">
        ยินดีต้อนรับสู่แอปของฉัน! สร้างด้วย React + TypeScript + Tailwind
      </p>
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-300">
          💡 ลองกดเมนู "งานของฉัน" เพื่อจัดการ Todo
        </p>
      </div>
    </div>
  );
}
