import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element, allowedRoles }) {
  const { user, role, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  console.log("Roles allowed: ", allowedRoles);
  console.log("User Role: ", role);
  useEffect(() => {
    if (!user || !role) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user, role]);

  if (isLoading) {
    return <div>Wait</div>;
  }
  if (!user || (allowedRoles && !allowedRoles.includes(role))) {
    if (user) logout();
    return <Navigate to="/auth/login" />;
  }

  return element;
}
