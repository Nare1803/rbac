"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { UserRole } from "@/lib/types";

const ROLES: { value: UserRole; label: string; desc: string; color: string }[] =
  [
    { value: "PATIENT", label: "Պացիենտ", desc: "Հիվանդ", color: "teal" },
    { value: "DOCTOR", label: "Բժիշկ", desc: "Մասնագետ", color: "blue" },
    { value: "ADMIN", label: "Ադմին", desc: "Կառավարիչ", color: "amber" },
  ];

const colorMap: Record<string, { bg: string; border: string }> = {
  teal: { bg: "#E1F5EE", border: "#0F6E56" },
  blue: { bg: "#E6F1FB", border: "#185FA5" },
  amber: { bg: "#FAEEDA", border: "#854F0B" },
};

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("PATIENT");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const password = form.get("password") as string;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: form.get("email"),
        password,
        role,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Գրանցումը ձախողվեց");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.get("email") as string,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Գրանցումը հաջողվեց, սակայն մուտքը ձախողվեց");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-2xl shadow-sm p-10 space-y-7">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#185FA5] flex items-center justify-center shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-medium text-gray-900">MedPanel</span>
        </div>

        <div>
          <h1 className="text-[22px] font-medium text-gray-900">
            Ստեղծեք հաշիվ
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ընտրեք ձեր դերը և լրացրեք տվյալները
          </p>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-500 mb-2.5">
            Ձեր դերը
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => {
              const active = role === r.value;
              const c = colorMap[r.color];
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className="rounded-lg px-2 py-3 text-center transition-all"
                  style={{
                    border: active
                      ? `1.5px solid ${c.border}`
                      : "0.5px solid #d1d5db",
                    background: active ? c.bg : "white",
                  }}
                >
                  <p className="text-[12px] font-medium text-gray-900">
                    {r.label}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{r.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              id: "name",
              label: "Անուն Ազգանուն",
              type: "text",
              placeholder: "Անի Պետրոսյան",
            },
            {
              id: "email",
              label: "Էլ. հասցե",
              type: "email",
              placeholder: "ani@example.com",
            },
            {
              id: "password",
              label: "Գաղտնաբառ",
              type: "password",
              placeholder: "Նվազ. 6 նիշ",
            },
          ].map((f) => (
            <div key={f.id} className="space-y-1.5">
              <label
                htmlFor={f.id}
                className="text-[13px] font-medium text-gray-500"
              >
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required
                minLength={f.id === "password" ? 6 : undefined}
                placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                           text-gray-900 outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent transition placeholder:text-gray-300"
              />
            </div>
          ))}

          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#185FA5] hover:bg-[#0C447C] text-white rounded-lg
                       py-2.5 text-sm font-medium transition-colors disabled:opacity-50
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Գրանցվում...
              </>
            ) : (
              "Գրանցվել"
            )}
          </button>
        </form>

        <p className="text-center text-[13px] text-gray-500">
          Արդեն հաշիվ ունե՞ք{" "}
          <Link
            href="/login"
            className="text-[#185FA5] font-medium hover:underline"
          >
            Մուտք գործել
          </Link>
        </p>
      </div>
    </main>
  );
}
