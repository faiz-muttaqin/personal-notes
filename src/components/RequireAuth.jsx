// src/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/auth";

export default function RequireAuth({ children }) {
  const token = getCookie("accessToken");
  const location = useLocation();

  if (!token) {
    // Redirect to login, preserve the current location for after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}