import React from 'react';
import type { IncomeRow } from './colums';
import { columns } from './colums';
import { DataTable } from '@/components/ui/data-table';

interface IncomesClientProps {
  data: IncomeRow[],
}

export const IncomesClient = ({ data }: IncomesClientProps) => {
  return (
    <>
      <div>
    
      </div>
      <DataTable data={data} columns={columns} />
    </>
  )
}