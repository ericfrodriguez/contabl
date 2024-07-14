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

import { db } from "@/server/db";
import { IncomesClient } from './components/client';
import type { IncomeRow } from "./components/columns";

export const dynamic = "force-dynamic";

export default async function IncomesPage() {
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
    <ContentLayout title="All Incomes">
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
            <BreadcrumbPage>Incomes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <IncomesClient data={incomes} />
      </PlaceholderContent>
    </ContentLayout>
  );
}
