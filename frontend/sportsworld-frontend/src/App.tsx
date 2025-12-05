import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminAthletesPage from "./pages/AdminAthletesPage";
import RegisterAthletePage from "./pages/RegisterAthletePage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminAthletesPage />} />
        <Route path="/register" element={<RegisterAthletePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;