import { useEffect, useState } from "react";
import type { Athlete } from "../interfaces/athlete";
import { athleteService } from "../services/athleteService";

export default function AdminAthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Athlete | null>(null);

  useEffect(() => {
    loadAthletes();
  }, []);

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    setAthletes(data);
  }

  async function handleSearch(query: string) {
    if (query.trim() === "") {
      loadAthletes();
      return;
    }
    const results = await athleteService.searchAthletes(query);
    setAthletes(results);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this athlete?")) return;
    await athleteService.deleteAthlete(id);
    await loadAthletes();
  }

  function startEdit(a: Athlete) {
    setEditingId(a.id);
    setEditData({ ...a });
  }

  function handleEditChange(
    field: keyof Athlete,
    value: string | number | boolean
  ) {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  }

  async function saveEdit() {
    if (!editData) return;
    await athleteService.updateAthlete(editData);
    setEditingId(null);
    setEditData(null);
    loadAthletes();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData(null);
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Administer Athletes</h1>

      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />

      {athletes.length === 0 ? (
        <p>No athletes found.</p>
      ) : (
        <table className="athlete-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Purchased</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {athletes.map((a) => {
              const isEditing = editingId === a.id;

              return (
                <tr key={a.id}>
                  {/* Image */}
                  <td>
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>

                  {/* Name */}
                  <td>
                    {isEditing ? (
                      <input
                        value={editData?.name || ""}
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                        className="edit-input"
                      />
                    ) : (
                      a.name
                    )}
                  </td>

                  {/* Gender */}
                  <td>
                    {isEditing ? (
                      <select
                        value={editData?.gender || ""}
                        onChange={(e) =>
                          handleEditChange("gender", e.target.value)
                        }
                        className="edit-select"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      a.gender
                    )}
                  </td>

                  {/* Price */}
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData?.price || ""}
                        onChange={(e) =>
                          handleEditChange("price", Number(e.target.value))
                        }
                        className="edit-input"
                      />
                    ) : (
                      a.price
                    )}
                  </td>

                  {/* Purchased */}
                  <td>
                    {isEditing ? (
                      <select
                        value={editData?.purchaseStatus ? "true" : "false"}
                        onChange={(e) =>
                          handleEditChange(
                            "purchaseStatus",
                            e.target.value === "true"
                          )
                        }
                        className="edit-select"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    ) : a.purchaseStatus ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    {!isEditing ? (
                      <>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => startEdit(a)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(a.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="action-btn save-btn"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="action-btn cancel-btn"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}