import type { Metadata } from "next";
import { ShopCard } from "@/components/shop-card";

export const metadata: Metadata = {
  title: "店舗一覧",
};

// TODO: 実際のデータベースから取得する
const mockShops = [
  {
    id: "shop_001",
    name: "ラーメン二郎 三田本店",
    address: "東京都港区三田2-16-4",
    description: "二郎系ラーメンの総本山",
  },
  {
    id: "shop_002",
    name: "ラーメン二郎 神保町店",
    address: "東京都千代田区神田神保町2-40",
    description: "神保町の老舗店舗",
  },
  {
    id: "shop_003",
    name: "ラーメン二郎 池袋東口店",
    address: "東京都豊島区南池袋1-17-1",
    description: "池袋の人気店",
  },
];

export default function Shops() {
  return (
    <main className="container py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </main>
  );
}
