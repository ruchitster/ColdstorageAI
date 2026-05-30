import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import ChatBot from "../components/ChatBot";

export default function Dashboard() {
  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <Outlet />
      </div>

      {/* CHATBOT */}
      <ChatBot />

    </div>
  );
}