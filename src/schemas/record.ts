import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { records } from "@/db/schemas/record";

export const recordFormSchema = createInsertSchema(records, {
  visitedAt: z.date(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().max(500).optional(),
}).omit({
  id: true,
  userId: true,
  shopId: true,
  createdAt: true,
  updatedAt: true,
});
