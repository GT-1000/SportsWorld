import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Athlete } from "../interfaces/athlete";

interface AthleteContextType {
  athletes: Athlete[];
  setAthletes: (a: Athlete[]) => void;
}

const AthleteContext = createContext<AthleteContextType | undefined>(undefined);

export function AthleteProvider({ children }: { children: ReactNode }) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  return (
    <AthleteContext.Provider value={{ athletes, setAthletes }}>
      {children}
    </AthleteContext.Provider>
  );
}

export function useAthletes() {
  const context = useContext(AthleteContext);
  if (!context) throw new Error("useAthletes must be used inside AthleteProvider");
  return context;
}