import { useEffect, useState } from "react";
import { athleteService } from "../services/athleteService";
import type { Athlete } from "../interfaces/athlete";

export default function PurchaseAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [error, setError] = useState("");

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    setAthletes(data.filter(a => !a.purchaseStatus));
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Purchase athlete
      </h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {athletes.length === 0 ? (
        <p className="text-gray-600">
          No athletes available for purchase.
        </p>
      ) : (
        <ul className="space-y-4">
          {athletes.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 border-b pb-3"
            >
              <div className="flex items-center gap-4">
                {a.image && (
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm text-gray-600">{a.price}</p>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(a.id)}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
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