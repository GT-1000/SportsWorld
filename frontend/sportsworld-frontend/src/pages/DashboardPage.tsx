import FinanceOverview from "../components/FinanceOverview";
import PurchaseAthletes from "../components/PurchaseAthletes";
import LoanSection from "../components/LoanSection";
import { useState } from "react";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-blue-600 mb-2">
      Dashboard
    </h1>
    <p className="text-gray-600 mb-8">
      Financial overview and athlete purchases
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Section 1 */}
      <div className="bg-white rounded-lg shadow p-6">
        <FinanceOverview refreshKey={refreshKey} />
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-lg shadow p-6">
        <LoanSection onLoanAdded={() => setRefreshKey(k => k + 1)} />
      </div>

      {/* Section 3 */}
      <div className="bg-white rounded-lg shadow p-6">
        <PurchaseAthletes />
      </div>
    </div>
  </div>
);
}