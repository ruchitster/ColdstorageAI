import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    sessionStorage.clear();

    // 🔥 Force full app reload so auth state resets correctly
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <h2 className="logo" data-testid="sidebar-logo">
        ❄ Cold Storage
      </h2>

      <nav>
        <NavLink to="/dashboard" end>
          <span data-testid="nav-dashboard">Dashboard</span>
        </NavLink>

        <div className="sidebar-section">
          <p className="section-title">Reports Section</p>

          <NavLink to="/dashboard/inward">
            <span data-testid="nav-inward-report">Inward Report</span>
          </NavLink>

          <NavLink to="/dashboard/outward">
            <span data-testid="nav-outward-report">Outward Report</span>
          </NavLink>

          <NavLink to="/dashboard/inward-stock-movement">
            <span data-testid="nav-stock-movement">Stock Movement</span>
          </NavLink>
        </div>

        <NavLink to="/dashboard/stock">
          <span data-testid="nav-product-stock">Product Stock</span>
        </NavLink>

        <button
          className="logout-btn"
          data-testid="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}