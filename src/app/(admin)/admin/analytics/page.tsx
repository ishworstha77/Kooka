import { AnalyticsTable } from "@/lib/feature/admin/AnalyticsTable";
import DashboardLayout from "@/lib/feature/admin/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <AnalyticsTable />
    </DashboardLayout>
  );
}
