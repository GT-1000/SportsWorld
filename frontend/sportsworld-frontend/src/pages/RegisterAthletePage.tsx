import { useState } from "react";
import { athleteService } from "../services/athleteService";

export default function RegisterAthletePage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await athleteService.createAthlete({
      id: 0,
      name,
      gender,
      price,
      image,
      purchaseStatus: false,
    });

    setName("");
    setGender("");
    setPrice(0);
    setImage("");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Register athlete</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-md space-y-4"
      >
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />

        <input
          className="w-full border rounded px-3 py-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register athlete
        </button>
      </form>
    </div>
  );
}