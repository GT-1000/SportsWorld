import { useState } from "react";
import { financeService } from "../services/financeService";

export default function LoanSection({
    onLoanAdded,
}: {
    onLoanAdded: () => void;
}) {
    const [amount, setAmount] = useState(0);

    async function handleLoan() {
        if(amount <= 0) return;

        await financeService.addLoan(amount);
        setAmount(0);
        onLoanAdded();
    }

    return (
        <div>
            <h2>Get loan from bank</h2>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <button onClick = {handleLoan}>Get loan</button>
        </div>
    )
}