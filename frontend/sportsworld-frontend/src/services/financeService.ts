export interface Finance {
  id: number;
  moneyLeft: number;
  numberOfPurchases: number;
  moneySpent: number;
}

const API_URL = "http://localhost:5050/api/Finance";

export const financeService = {
  async getFinance(): Promise<Finance> {
    const response = await fetch(API_URL);
    return await response.json();
  }
};