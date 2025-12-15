import FinanceOverview from "../components/FinanceOverview";
import PurchaseAthletes from "../components/PurchaseAthletes";
import LoanSection from "../components/LoanSection";
import { useState } from "react";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Section 1 */}
      <FinanceOverview refreshKey={refreshKey}/>

      {/* Secction 2 */}
      <LoanSection onLoanAdded={() => setRefreshKey(k => k+1)} />

      {/* Section 3 */}
      <PurchaseAthletes />
    </div>
  );
}