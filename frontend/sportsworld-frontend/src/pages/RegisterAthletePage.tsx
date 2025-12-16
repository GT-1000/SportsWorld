import { useState } from "react";
import { athleteService } from "../services/athleteService";

export default function RegisterAthletePage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadImage(): Promise<string> {
    if (!selectedFile) return "";

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("http://localhost:5050/api/imageupload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.imageUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setUploading(true);

    const imageUrl = await uploadImage();

    await athleteService.createAthlete({
      id: 0,
      name,
      gender,
      price,
      image: imageUrl,
      purchaseStatus: false,
    });

    setName("");
    setGender("");
    setPrice(0);
    setSelectedFile(null);
    setUploading(false);
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
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        {/* 👇 FILE UPLOAD FRA FINDER */}
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Register athlete"}
        </button>
      </form>
    </div>
  );
}
