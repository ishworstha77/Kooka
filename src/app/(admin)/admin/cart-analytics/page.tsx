import { CartAnalyticsTable } from "@/lib/feature/admin/CartAnalyticsTable";
import DashboardLayout from "@/lib/feature/admin/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <CartAnalyticsTable />
    </DashboardLayout>
  );
}
