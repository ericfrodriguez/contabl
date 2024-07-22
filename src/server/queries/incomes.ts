import "server-only";
import { type IncomeRow } from "@/app/(dashboard)/incomes/components/columns";
import { db } from "@/server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAllIncomes = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const session = await isAuthenticated();
  if (!session) throw new Error("Unauthorized");

  const incomes: IncomeRow[] = await db.query.incomes.findMany({
    columns: {
      id: true,
      description: true,
      amount: true,
      date: true,
      recurrenceDate: true,
      currency: true,
    },
  });

  return incomes;
};
