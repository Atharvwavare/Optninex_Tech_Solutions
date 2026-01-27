import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  mobile?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;                 // 🔥 important
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);   // 🔥 new

  // 🔁 Restore login state on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);

    setLoading(false);   // 🔥 finished restoring
  }, []);

  // ✅ LOGIN
  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  // ✅ UPDATE USER (profile, address, mobile etc.)
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
