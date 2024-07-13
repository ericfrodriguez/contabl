import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { db } from "@/server/db";
import { IncomesClient } from './components/client';
import type { IncomeRow } from "./components/colums";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

export default async function IncomesPage() {
  const { getUser } = getKindeServerSession();
  console.log(await getUser());

  const incomes: IncomeRow[] = await db.query.incomes.findMany({
    columns: {
      id: true,
      description: true,
      amount: true,
      date: true,
      recurrenceDate: true,
      currency: true,
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginLink>Sign in</LoginLink>
      <LogoutLink>Logout</LogoutLink>
      <div className="flex flex-col w-full max-w-7xl">
        <div className="space-y-4 p-8 pt-6">
          <IncomesClient data={incomes} />
        </div>
      </div>

    </main>
  );
}
