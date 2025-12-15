import { useEffect, useState } from "react";
import { athleteService } from "../services/athleteService";
import type { Athlete } from "../interfaces/athlete";

export default function PurchaseAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  async function loadAthletes() {
    const response = await fetch(
      "http://localhost:5050/api/athletes/notpurchased"
    );
    const data = await response.json();
    setAthletes(data);
  }

  async function handlePurchase(id: number) {
    await athleteService.purchaseAthlete(id);
    await loadAthletes();
  }

  useEffect(() => {
    loadAthletes();
  }, []);

  return (
    <div>
      <h2>Purchase Athlete</h2>

      {athletes.length === 0 ? (
        <p>No athletes available for purchase.</p>
      ) : (
        <ul>
          {athletes.map((a) => (
            <li key={a.id}>
              {a.name} – {a.price}
              <button onClick={() => handlePurchase(a.id)}>
                Purchase
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}