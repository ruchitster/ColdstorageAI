import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import InwardReport from "../pages/InwardReport";
import OutwardReport from "../pages/OutwardReport";
import DashboardHome from "../pages/DashboardHome";
import ProductStock from "../pages/ProductStock";
import PrivateRoute from "./PrivateRoute";
import InwardStockMovementReport from "../pages/InwardStockMovementReport";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>

        <Route path="/dashboard/*" element={<Dashboard />}>

          <Route index element={<DashboardHome />} />

          <Route path="inward" element={<InwardReport />} />
          <Route path="outward" element={<OutwardReport />} />

          <Route
            path="inward-stock-movement"
            element={<InwardStockMovementReport />}
          />

          <Route path="stock" element={<ProductStock />} />

        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;