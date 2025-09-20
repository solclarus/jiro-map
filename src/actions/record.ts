"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { records } from "@/db/schemas/record";
import { verifySession } from "@/lib/session";
import { recordFormSchema } from "@/schemas/record";
import type { Record, RecordFormData } from "@/types/record";

export async function createRecord(formData: RecordFormData) {
  const data = recordFormSchema.parse(formData);
  const session = await verifySession();
  const userId = session.user.id;

  await db.insert(records).values({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  });
  revalidatePath("/records");
}

export async function updateRecord(id: string, formData: RecordFormData) {
  const data = recordFormSchema.parse(formData);
  const session = await verifySession();
  const userId = session.user.id;

  await db
    .update(records)
    .set({ ...data, updatedAt: new Date(), userId })
    .where(and(eq(records.id, id), eq(records.userId, userId)));
  revalidatePath("/records");
}

export async function deleteRecord(id: string) {
  const session = await verifySession();
  const userId = session.user.id;

  await db
    .delete(records)
    .where(and(eq(records.id, id), eq(records.userId, userId)));
  revalidatePath("/records");
}
