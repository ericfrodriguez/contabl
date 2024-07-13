import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();
  const session = await isAuthenticated();

  if (!session) {
    redirect('/sign-in');
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
