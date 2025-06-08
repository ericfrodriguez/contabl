import { createTransaction } from "@/server/queries/transactions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { getUser } = getKindeServerSession();

  const onCreate = async (event: React.FormEvent) => {
    const user = await getUser();
    if (user) {
      const newTransaction = {
        description: 'Almuerzo Mc Donalds',
        amount: '12000',
        date: new Date('24-10-2024'),
        currency: 'ARS' as const,
        recurrenceDate: null,
        type: 'expense' as const,
        userId: user?.id,
      }
      await createTransaction(newTransaction);
    }
  }

  return (
    <form onSubmit={onCreate} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}