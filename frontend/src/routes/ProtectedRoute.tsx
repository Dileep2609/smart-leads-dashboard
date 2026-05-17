import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
