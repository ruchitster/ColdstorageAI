import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Clear token/session storage
    localStorage.removeItem("token");

    // अगर sessionStorage use कर रहे हो
    sessionStorage.clear();

    // Optional: clear all localStorage
    // localStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="sidebar">

      <h2 className="logo" data-testid="sidebar-logo">❄ Cold Storage</h2>

      <nav>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span data-testid="nav-dashboard">Dashboard</span>
        </NavLink>

        {/* REPORTS SECTION */}
        <div className="sidebar-section">

          <p className="section-title">
            Reports Section
          </p>

          <NavLink
            to="/dashboard/inward"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span data-testid="nav-inward-report">Inward Report</span>
          </NavLink>

          <NavLink
            to="/dashboard/outward"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span data-testid="nav-outward-report">Outward Report</span>
          </NavLink>

          <NavLink
            to="/dashboard/inward-stock-movement"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span data-testid="nav-stock-movement">Stock Movement</span>
          </NavLink>

        </div>

        {/* STOCK */}
        <NavLink
          to="/dashboard/stock"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span data-testid="nav-product-stock">Product Stock</span>
        </NavLink>

        {/* LOGOUT */}
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