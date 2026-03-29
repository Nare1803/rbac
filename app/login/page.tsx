"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("Սխալ էլ. հասցե կամ գաղտնաբառ");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-2xl shadow-sm p-10 space-y-7">
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
            Բարի գալուստ
          </h1>
          <p className="text-sm text-gray-500 mt-1">Մուտք գործեք ձեր հաշիվ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[13px] font-medium text-gray-500"
            >
              Էլ. հասցե
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="ani@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         text-gray-900 outline-none focus:ring-2 focus:ring-blue-500
                         transition placeholder:text-gray-300"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-[13px] font-medium text-gray-500"
            >
              Գաղտնաբառ
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         text-gray-900 outline-none focus:ring-2 focus:ring-blue-500
                         transition placeholder:text-gray-300"
            />
          </div>

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
                Մուտք...
              </>
            ) : (
              "Մուտք գործել"
            )}
          </button>
        </form>

        <p className="text-center text-[13px] text-gray-500">
          Հաշիվ չունե՞ք{" "}
          <Link
            href="/register"
            className="text-[#185FA5] font-medium hover:underline"
          >
            Գրանցվել
          </Link>
        </p>
      </div>
    </main>
  );
}
