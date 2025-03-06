import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data); // Atualiza o usuário autenticado
        })
        .catch(error => {
          console.error("Erro ao obter usuário:", error);
          logout(); // Faz logout apenas se for um erro de autenticação
        });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login Response:", response.data);
      
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user); // Atualiza o usuário no estado

    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
