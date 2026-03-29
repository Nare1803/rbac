import { auth } from "@/lib/auth"
import { signOut } from "@/lib/auth"
import Link from "next/link"

export default async function MainNav() {
  const session = await auth()
  const role = session?.user.role

  return (
    <nav className="flex items-center gap-6 text-sm font-medium">
      <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
        Dashboard
      </Link>

      {(role === "ADMIN" || role === "DOCTOR") && (
        <Link href="/dashboard/patients" className="hover:text-blue-600 transition-colors">
          Պացիենտներ
        </Link>
      )}

      {role === "ADMIN" && (
        <Link href="/dashboard/doctors" className="hover:text-blue-600 transition-colors">
          Բժիշկներ
        </Link>
      )}

      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}
      >
        <button
          type="submit"
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Ելք
        </button>
      </form>
    </nav>
  )
}