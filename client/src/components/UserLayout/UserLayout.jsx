import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
const UserLayout = () => {
   const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "student") {
      navigate("/login");
    }
  }, [role, navigate]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <UserHeader />
      </div>
      {/* Main Content (Outlet) */}
      <div style={{ flex: 1, paddingTop: "75px" }}>
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
export default UserLayout;
