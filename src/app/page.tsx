import { db } from "@/server/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const incomes = await db.query.incomes.findMany();
  console.log(incomes);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {
        incomes[0]?.description
      }
    </main>
  );
}
