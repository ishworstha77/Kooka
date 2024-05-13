import { AnalyticsTable } from "@/lib/feature/admin/AnalyticsTable";
import ApexChart from "@/lib/feature/admin/ApexChart";
import DashboardLayout from "@/lib/feature/admin/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ApexChart />
    </DashboardLayout>
  );
}
