import type { Athlete } from "../interfaces/athlete";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/athletes`;

export const athleteService = {
  // Admin / Generelt
  async getAllAthletes(): Promise<Athlete[]> {
    const response = await fetch(API_URL);
    return await response.json();
  },

  async searchAthletes(name: string): Promise<Athlete[]> {
    const response = await fetch(
      `${API_URL}/search?name=${encodeURIComponent(name)}`
    );
    return await response.json();
  },

  async createAthlete(athlete: Athlete): Promise<Athlete> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(athlete),
    });

    return await response.json();
  },

  async updateAthlete(athlete: Athlete): Promise<void> {
    await fetch(`${API_URL}/${athlete.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(athlete),
    });
  },

  async deleteAthlete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },

  // SECTION 3 – Purchase
  async getNotPurchased(): Promise<Athlete[]> {
    const response = await fetch(`${API_URL}/notpurchased`);
    return await response.json();
  },

  async purchaseAthlete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/purchase/${id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Failed to purchase athlete");
    }
  },
};