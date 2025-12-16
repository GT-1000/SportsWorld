import { useEffect, useState } from "react";
import { athleteService } from "../services/athleteService";
import type { Athlete } from "../interfaces/athlete";

export default function AdminAthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [editing, setEditing] = useState<Athlete | null>(null);

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    setAthletes(data);
  }

  async function handleDelete(id: number) {
    await athleteService.deleteAthlete(id);
    loadAthletes();
  }

  async function handleSave() {
    if (!editing) return;

    await athleteService.updateAthlete(editing);
    setEditing(null);
    loadAthletes();
  }

  useEffect(() => {
    loadAthletes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">
        Administer athletes
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {athletes.map((a) => (
              <tr key={a.id} className="border-b last:border-none">
                <td className="py-3">{a.name}</td>
                <td>{a.gender}</td>
                <td>{a.price}</td>
                <td>
                  {a.purchaseStatus ? (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                      Purchased
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      Available
                    </span>
                  )}
                </td>
                <td className="text-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setEditing(a)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow max-w-lg">
          <h2 className="text-xl font-semibold mb-4">
            Edit athlete
          </h2>

          <input
            className="w-full border rounded px-3 py-2 mb-3"
            value={editing.name}
            onChange={(e) =>
              setEditing({ ...editing, name: e.target.value })
            }
          />

          <input
            className="w-full border rounded px-3 py-2 mb-3"
            value={editing.gender}
            onChange={(e) =>
              setEditing({ ...editing, gender: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full border rounded px-3 py-2 mb-4"
            value={editing.price}
            onChange={(e) =>
              setEditing({
                ...editing,
                price: Number(e.target.value),
              })
            }
          />

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}