import type z from "zod";
import type { records } from "@/db/schemas/record";
import type { recordFormSchema } from "@/schemas/record";

export type Record = typeof records.$inferSelect;
export type RecordFormData = z.infer<typeof recordFormSchema>;
