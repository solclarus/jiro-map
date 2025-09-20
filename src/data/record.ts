import { db } from "@/db";
import { records } from "@/db/schemas/record";
import "server-only";
import { eq } from "drizzle-orm";

export const getRecords = async () => {
  return (await db.query.records.findMany()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
};

export const getRecordById = async (id: string) => {
  return await db.query.records.findFirst({ where: eq(records.id, id) });
};
