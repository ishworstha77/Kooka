import { SalesPage } from "@/lib/feature/admin/SalesPage";
import DashboardLayout from "@/lib/feature/admin/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <SalesPage />
    </DashboardLayout>
  );
}
