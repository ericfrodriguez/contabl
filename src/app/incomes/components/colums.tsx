"use client"

import { getFormattedAmount, getFormattedDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IncomeRow = {
  id: number;
  description: string;
  amount: string;
  date: Date | null;
  currency: string;
  recurrenceDate: string | null;
}

export const columns: ColumnDef<IncomeRow>[] = [
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
    cell: ({ row }) => <div className="text-right font-medium">{getFormattedAmount(row.getValue('amount'), row.original.currency)}</div>,
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