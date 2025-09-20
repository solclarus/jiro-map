import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    address?: string;
    description?: string;
  };
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{shop.name}</CardTitle>
        {shop.address && (
          <CardDescription>{shop.address}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {shop.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {shop.description}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/shops/${shop.id}`}>
              詳細を見る
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link 
              href={`/records/new?shopId=${shop.id}`}
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              記録する
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}