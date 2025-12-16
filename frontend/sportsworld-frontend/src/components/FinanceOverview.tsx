import { useEffect, useState } from "react";
import { financeService } from "../services/financeService";

type Finance = {
  moneyLeft: number;
  numberOfPurchases: number;
  moneySpent: number;
};

export default function FinanceOverview({ refreshKey }: { refreshKey: number }) {
  const [finance, setFinance] = useState<Finance | null>(null);

  useEffect(() => {
    financeService
      .getFinance()
      .then(setFinance)
      .catch(() => setFinance(null));
  }, [refreshKey]);

  if (!finance) {
    return (
      <p className="text-red-600 font-medium">
        Could not load financial data
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Financial situation
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Money left:</span>{" "}
          {finance.moneyLeft}
        </p>

        <p>
          <span className="font-medium">Number of purchases:</span>{" "}
          {finance.numberOfPurchases}
        </p>

        <p>
          <span className="font-medium">Total spending:</span>{" "}
          {finance.moneySpent}
        </p>
      </div>
    </div>
  );
}