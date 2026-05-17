import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

interface Props {
  children: JSX.Element;
}

function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
