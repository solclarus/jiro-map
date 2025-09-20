"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { records } from "@/db/schemas/record";
import { verifySession } from "@/lib/session";
import { recordFormSchema } from "@/schemas/record";
import type { RecordFormData } from "@/types/record";

export async function createRecord(formData: RecordFormData, shopId: string) {
  const data = recordFormSchema.parse(formData);
  const session = await verifySession();
  const userId = session.user.id;

  await db.insert(records).values({
    ...data,
    shopId,
    userId,
  });
  revalidatePath("/records");
}

export async function updateRecord(
  id: string,
  formData: RecordFormData,
  shopId: string,
) {
  const data = recordFormSchema.parse(formData);
  const session = await verifySession();
  const userId = session.user.id;

  await db
    .update(records)
    .set({ ...data, shopId, updatedAt: new Date() })
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
