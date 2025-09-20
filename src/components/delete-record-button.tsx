"use client";

import { useRouter } from "next/navigation";
import { deleteRecord } from "@/actions/record";
import { Button } from "./ui/button";

export function DeleteRecordButton({ recordId }: { recordId: string }) {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        deleteRecord(recordId);
        router.refresh();
      }}
    >
      削除
    </Button>
  );
}
