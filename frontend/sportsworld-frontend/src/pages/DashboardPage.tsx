import FinanceOverview from "../components/FinanceOverview";
import PurchaseAthletes from "../components/PurchaseAthletes";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Section 1 */}
      <FinanceOverview />

      {/* Section 3 */}
      <PurchaseAthletes />
    </div>
  );
}