import "server-only";
import { type IncomeRow } from "@/app/(dashboard)/incomes/components/columns";
import { db } from "@/server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAllIncomes = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const incomes: IncomeRow[] = await db.query.incomes.findMany({
    where: (model, { eq }) => eq(model.userId, user.id),
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
