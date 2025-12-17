import { useEffect, useState } from "react";
import { athleteService } from "../services/athleteService";
import type { Athlete } from "../interfaces/athlete";

export default function AdminAthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [editing, setEditing] = useState<Athlete | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  async function loadAthletes() {
    const data = await athleteService.getAllAthletes();
    setAthletes(data);
  }

  async function uploadImage(): Promise<string | null> {
    if (!newImage) return null;

    const formData = new FormData();
    formData.append("file", newImage);

    const response = await fetch("http://localhost:5050/api/imageupload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.imageUrl;
  }

  async function handleSave() {
    if (!editing) return;

    const imageUrl = await uploadImage();

    await athleteService.updateAthlete({
      ...editing,
      image: imageUrl ?? editing.image,
    });

    setEditing(null);
    setNewImage(null);
    loadAthletes();
  }

  useEffect(() => {
    loadAthletes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Administer athletes</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="border-b text-gray-600">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {athletes.map((a) => (
              <tr key={a.id} className="border-b">
                <td>
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded" />
                  )}
                </td>
                <td>{a.name}</td>
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
                    onClick={() =>
                      athleteService.deleteAthlete(a.id).then(loadAthletes)
                    }
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
          <h2 className="text-xl font-semibold mb-4">Edit athlete</h2>

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

          <div className="space-y-2 mb-4">
            <input
              id="editImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && setNewImage(e.target.files[0])
              }
            />

            <label
              htmlFor="editImageUpload"
              className="inline-block cursor-pointer bg-gray-200 px-1 py-2 rounded hover:bg-gray-300"
            >
              Change image
            </label>

            {newImage && (
              <p className="text-sm text-gray-600">
                Selected: {newImage.name}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setEditing(null);
                setNewImage(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}