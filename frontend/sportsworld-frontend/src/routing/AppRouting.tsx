import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminAthletesPage from "../pages/AdminAthletesPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";
import DashboardPage from "../pages/DashboardPage";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminAthletesPage />} />
        <Route path="/register" element={<RegisterAthletePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;