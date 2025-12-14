import { useEffect, useState } from "react";
import { financeService } from "../services/financeService";

export default function FinanceOverview() {
  const [finance, setFinance] = useState<{
    moneyLeft: number;
    numberOfPurchases: number;
    moneySpent: number;
  } | null>(null);

  useEffect(() => {
    financeService.getFinance()
      .then(setFinance)
      .catch(() => setFinance(null));
  }, []);

  if (!finance) {
    return <p>Could not load financial data</p>;
  }

  return (
    <div>
      <h2>Financial situation</h2>

      <p>Money left: {finance.moneyLeft}</p>
      <p>Number of purchases: {finance.numberOfPurchases}</p>
      <p>Total spending: {finance.moneySpent}</p>
    </div>
  );
}