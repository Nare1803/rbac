import type { Metadata } from "next"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: {
    default: "MedPanel",
    template: "%s | MedPanel",
  },
  description: "Բժշկական կառավարման համակարգ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hy" suppressHydrationWarning>
      <body className="font-sans bg-gray-50 text-gray-900 antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}