import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ path, element, allowedRoles }) {
  const { user, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
    // Redirect to a different route if the user is not authenticated or doesn't have the required role
    return <Navigate to="/auth/login" />;
  }

  return element;
}
