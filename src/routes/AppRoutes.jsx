import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Troll from "../components/customs/troll";
import Commission from "../pages/Commission";
import TestUpload from "../pages/TestUpload";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/troll" element={<Troll />} />
        <Route path="/commission" element={<Commission />} />

        <Route path="/test-upload" element={<TestUpload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
