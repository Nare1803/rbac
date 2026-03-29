"use client";

import { useSession } from "next-auth/react";
import type { UserRole as Role } from "@/lib/types"

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
  fallback = null,
}: RoleGuardProps) {
  const { data: session } = useSession();

  if (!session) return null;
  if (!allowedRoles.includes(session.user.role)) return <>{fallback}</>;

  return <>{children}</>;
}
