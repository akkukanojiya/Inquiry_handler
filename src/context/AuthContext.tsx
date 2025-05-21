import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserRole = "master" | "college" | "faculty" | "counselor" | null;

interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log(storedRole);
    
    const validRoles: UserRole[] = ["master", "college", "faculty", "counselor"];

    if (storedRole && validRoles.includes(storedRole as UserRole)) {
      setRole(storedRole as UserRole);
    }
  }, []);

  const login = (userRole: UserRole) => {
    setRole(userRole);
    if (userRole) {
      localStorage.setItem("role", userRole);
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
