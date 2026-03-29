import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const ALLOWED_ROLES = ["PATIENT", "DOCTOR", "ADMIN"];

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ error: "Անվավեր դեր" }, { status: 403 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: "Էլ. հասցեն արդեն գրանցված է" },
      { status: 400 },
    );
  }

  const hashed = await hash(password, 12);
  const parts = (name as string).trim().split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ") || "—";

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, email, password: hashed, role },
    });

    if (role === "PATIENT") {
      await tx.patient.create({
        data: { firstName, lastName, createdById: user.id },
      });
    }
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
