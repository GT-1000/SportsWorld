import type { Athlete } from "../interfaces/athlete";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/athletes`;

export const athleteService = {
  async getAllAthletes(): Promise<Athlete[]> {
    const response = await fetch(API_URL);
    return await response.json();
  },

  async searchAthletes(name: string): Promise<Athlete[]> {
    const response = await fetch(`${API_URL}/search?name=${encodeURIComponent(name)}`);
    return await response.json();
  },

  async deleteAthlete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },

  async updateAthlete(athlete: Athlete): Promise<void> {
    await fetch(`${API_URL}/${athlete.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(athlete),
    });
  },
};