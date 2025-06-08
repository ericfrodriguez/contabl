import Link from "next/link";

import PlaceholderContent from "@/components/dashboard/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { IncomesClient } from './components/client';
import { getAllTransactions } from "@/server/queries/transactions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewTransactionModal } from '../../../components/modals/new-transaction-modal';

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  return (
    <ContentLayout title="All Incomes">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <NewTransactionModal />
      </div>
      <PlaceholderContent>
        <IncomesClient data={transactions} />
      </PlaceholderContent>
    </ContentLayout>
  );
}
