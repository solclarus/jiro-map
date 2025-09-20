import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { users } from "./auth";

export const records = pgTable("records", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  shopId: text("shop_id").notNull(), // 将来的に shops テーブルの外部キーにする予定
  visitedAt: timestamp("visited_at").notNull(), // 訪問日時
  rating: integer("rating"), // 評価（1-5）- 将来の拡張用
  notes: text("notes"), // メモ - 将来の拡張用
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const petRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));
