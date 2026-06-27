import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. ประกาศ "กฎ" ของฟอร์มด้วย Zod
const schema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  age: z.coerce.number().min(18, "ต้องอายุ 18 ปีขึ้นไป"),
});

// 2. แปลงกฎ Zod → TypeScript type อัตโนมัติ
type FormInput = z.input<typeof schema>;   // ก่อน validate (age ยังเป็นค่าดิบ)
type FormData = z.output<typeof schema>;   // หลัง validate (age เป็น number)

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(schema),
  });

  // 3. ทำงานเมื่อฟอร์มผ่านการตรวจสอบแล้ว
  function onSubmit(data: FormData) {
    alert("สมัครสำเร็จ! " + JSON.stringify(data));
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ช่องชื่อ */}
        <div>
          <input
            {...register("name")}
            placeholder="ชื่อ"
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* ช่องอีเมล */}
        <div>
          <input
            {...register("email")}
            placeholder="อีเมล"
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ช่องอายุ */}
        <div>
          <input
            {...register("age")}
            placeholder="อายุ"
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 font-medium"
        >
          สมัคร
        </button>
      </form>
    </div>
  );
}
