import { useState } from "react";
import { financeService } from "../services/financeService";

export default function LoanSection({
  onLoanAdded,
}: {
  onLoanAdded: () => void;
}) {
  const [amount, setAmount] = useState(0);

  async function handleLoan() {
    if (amount <= 0) return;

    await financeService.addLoan(amount);
    setAmount(0);
    onLoanAdded();
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-6">
        Get loan from bank
      </h2>

      <div className="flex justify-center items-center gap-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-32 text-center"
        />

        <button
          onClick={handleLoan}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Get loan
        </button>
      </div>
    </div>
  );
}