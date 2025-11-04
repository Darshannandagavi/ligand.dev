import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import UserFooter from "../UserLayout/UserFooter";

const AdminLayout = () => {
   const navigate = useNavigate();
    const role = localStorage.getItem("role");
  
    useEffect(() => {
      if (role !== "admin") {
        navigate("/login");
      }
    }, [role, navigate]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <AdminNavbar />
      </div>
      {/* Main Content (Outlet) */}
      <div style={{ flex: 1, paddingTop: "75px",minHeight:"100vh"}}>
        <Outlet />
      </div>
      {/* Fixed Footer */}
      <div
        style={{
          position: "float",
          bottom: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <UserFooter />
      </div>
    </div>
  );
};
export default AdminLayout;
