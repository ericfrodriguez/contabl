"use client"

import { cn, getFormattedAmount, getFormattedDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionRow = {
  id: number;
  description: string;
  amount: string;
  date: Date | null;
  currency: string;
  recurrenceDate: string | null;
  type: string;
}

export const columns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className={cn("text-right font-medium", { "text-positive": row.original.type === "income" })}>{getFormattedAmount(row.getValue('amount'), row.original.currency, row.original.type)}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => getFormattedDate(row.getValue('date')),
  },
  {
    accessorKey: "recurrenceDate",
    header: "Recurrence Date",
    cell: ({ row }) => getFormattedDate(row.original.recurrenceDate) ?? '-',
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellActions data={row.original} />
  // },
]