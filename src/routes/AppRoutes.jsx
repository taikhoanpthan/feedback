import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Commission from "../components/customs/troll";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/troll" element={<Commission />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
