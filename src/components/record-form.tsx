"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createRecord, updateRecord } from "@/actions/record";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recordFormSchema } from "@/schemas/record";
import type { Record, RecordFormData } from "@/types/record";

interface RecordFormProps {
  shopId: string;
  defaultValues?: Record;
}

export function RecordForm({ shopId, defaultValues }: RecordFormProps) {
  const router = useRouter();
  const form = useForm<RecordFormData>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: defaultValues
      ? {
          visitedAt: defaultValues.visitedAt,
          rating: defaultValues.rating ?? undefined,
          notes: defaultValues.notes ?? "",
        }
      : {
          visitedAt: new Date(),
          rating: undefined,
          notes: "",
        },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(data: RecordFormData) {
    try {
      if (defaultValues) {
        await updateRecord(defaultValues.id, data, shopId);
      } else {
        await createRecord(data, shopId);
        form.reset();
      }
      toast.success(`訪問記録を${defaultValues ? "編集" : "作成"}しました`);
      router.push("/records");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("エラーが発生しました");
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="visitedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>訪問日時</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().slice(0, 16)
                          : field.value
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>評価（1-5）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      placeholder="1-5の評価を入力してください"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : undefined);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メモ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="訪問時の感想やメモを入力してください"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {defaultValues ? "更新" : "作成"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
