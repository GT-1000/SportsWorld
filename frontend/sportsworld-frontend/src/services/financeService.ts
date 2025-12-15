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
  },
  
  async addLoan(amount: number): Promise<void> {
    await fetch (`${API_URL}/loan`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(amount),
    })
  }
};

