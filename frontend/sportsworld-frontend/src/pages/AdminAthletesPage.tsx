import { useEffect, useState } from "react";
import type { Athlete } from "../interfaces/athlete";
import { athleteService } from "../services/athleteService";

export default function AdminAthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  // Load athletes on page load
  useEffect(() => {
    loadAthletes();
  }, []);

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    setAthletes(data);
  }

  // Delete function
  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this athlete?")) return;

    await athleteService.deleteAthlete(id);
    await loadAthletes(); // refresh list
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Administer Athletes</h1>

      {athletes.length === 0 ? (
        <p>No athletes found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Purchased</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.gender}</td>
                <td>{a.price}</td>
                <td>{a.purchaseStatus ? "Yes" : "No"}</td>
                <td>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(a.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}