import { useEffect, useState } from "react";
import { athleteService } from "../services/athleteService";
import type { Athlete } from "../interfaces/athlete";

export default function PurchaseAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [error, setError] = useState("");

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    const available = data.filter(a => !a.purchaseStatus);
    setAthletes(available);
  }

  async function handlePurchase(id: number) {
    try {
      await athleteService.purchaseAthlete(id);
      loadAthletes();
    } catch {
      setError("Purchase failed");
    }
  }

  useEffect(() => {
    loadAthletes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Purchase athlete
      </h2>

      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      {athletes.length === 0 ? (
        <p className="text-gray-500">
          No athletes available for purchase.
        </p>
      ) : (
        <ul className="space-y-3">
          {athletes.map((a) => (
            <li
              key={a.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>
                {a.name} – {a.price}
              </span>

              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => handlePurchase(a.id)}
              >
                Purchase
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}