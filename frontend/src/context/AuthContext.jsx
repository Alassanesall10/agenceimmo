import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const stocke = localStorage.getItem("user");
    if (stocke) setUser(JSON.parse(stocke));
    setChargement(false);
  }, []);

  const login = async (email, motDePasse) => {
    const { data } = await api.post("/auth/login", { email, motDePasse });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (nom, email, telephone, motDePasse) => {
    const { data } = await api.post("/auth/register", { nom, email, telephone, motDePasse });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, chargement }}>
      {!chargement && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
