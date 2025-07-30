import { Route, Routes } from "react-router-dom";

import MemePetLeagueLanding from "@/pages/index";
import LeaderboardPage from "@/pages/leaderboard";
import MemePetDashboard from "./pages/dashboard";
import DAOPage from "@/pages/daoPage";
import BattlePage from "@/pages/battlePager";

function App() {
  return (
    <Routes>
      <Route element={<MemePetLeagueLanding />} path="/" />
      <Route element={<LeaderboardPage />} path="/leaderboard" />
      <Route element={<MemePetDashboard />} path="/dashboard" />
      <Route element={<DAOPage />} path="/dao" />
      <Route element={<BattlePage />} path="/battle" />
    </Routes>
  );
}

export default App;
