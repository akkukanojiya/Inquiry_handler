import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  allowedRoles: string[];
  children: JSX.Element;
};

const RoleBasedRoute = ({ allowedRoles, children }: Props) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleBasedRoute;
