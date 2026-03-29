"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PatientFormData } from "@/lib/types"

async function requireRole(...roles: string[]) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")
  if (!roles.includes(session.user.role))
    throw new Error("Forbidden — insufficient role")
  return session
}

export async function getAllPatients() {
  await requireRole("ADMIN", "DOCTOR")  
  return prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  })
}


export async function getAllDoctors() {
  await requireRole("ADMIN")  
  return prisma.user.findMany({
    where: { role: "DOCTOR" },
    select: { id: true, name: true, email: true, createdAt: true },
  })
}

export async function createPatient(data: PatientFormData) {
  const session = await requireRole("ADMIN", "DOCTOR")
  return prisma.patient.create({
    data: {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      createdById: session.user.id,
    },
  })
}