import { useState } from "react";
import { athleteService } from "../services/athleteService";

export default function RegisterAthletePage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [price, setPrice] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  
  async function uploadImage() : Promise<string> {
    if (!selectedFile) return "";

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("http://localhost:5050/api/ImageUpload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.imageUrl;
  }

  // Når man trykker "Register Athlete"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    try {
      const imageUrl = await uploadImage();

      const newAthlete = {
        id: 0,
        name,
        gender,
        price,
        image: imageUrl,
        purchaseStatus: false
      };

      await athleteService.createAthlete(newAthlete);

      setMessage("Athlete successfully registered!");
      setName("");
      setPrice(0);
      setGender("Male");
      setSelectedFile(null);

    } catch (err) {
      console.error("Error registering athlete:", err);
      setMessage("Something went wrong.");
    }

    setUploading(false);
  }

  return (
    <div>
      <h1>Register Athlete</h1>

      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Gender:</label>
        <select 
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Price:</label>
        <input 
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Register Athlete"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}