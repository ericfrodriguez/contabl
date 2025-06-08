import React from 'react';
import type { IncomeRow } from './columns';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface IncomesClientProps {
  data: IncomeRow[],
}

export const IncomesClient = ({ data }: IncomesClientProps) => {
  return (
    <>
      <DataTable data={data} columns={columns} />
    </>
  )
}