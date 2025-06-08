import "server-only";
import { type TransactionRow } from "@/app/(dashboard)/transactions/components/columns";
import { db } from "@/server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { transactions } from "../db/schema";

type NewTransaction = typeof transactions.$inferInsert;

export const getAllTransactions = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const transactions: TransactionRow[] = await db.query.transactions.findMany({
    where: (model, { eq }) => eq(model.userId, user.id),
    columns: {
      id: true,
      description: true,
      amount: true,
      date: true,
      recurrenceDate: true,
      currency: true,
      type: true,
    },
  });

  return transactions;
};

export async function createTransaction(transaction: NewTransaction) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");
  try {
    const newTransaction: NewTransaction[] = await db
      .insert(transactions)
      .values({
        userId: user.id,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        recurrenceDate: transaction.recurrenceDate,
        type: transaction.type,
        currency: transaction.currency,
      })
      .returning();

    console.log(newTransaction);
    return newTransaction;
  } catch (error) {
    throw new Error("Error to create transaction");
  }
}
