import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpa mensagens anteriores

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 422) {
        console.error("Validation Errors:", error.response.data.errors);
        setErrorMessage("Erro de validação. Verifique os campos.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Credenciais inválidas.");
      } else {
        console.error("Erro ao fazer login:", error);
        setErrorMessage("Erro ao tentar fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;


