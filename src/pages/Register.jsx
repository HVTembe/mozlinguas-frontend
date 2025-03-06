import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Registrar o usuário
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        role,
      });

      // Fazer login automático após o registro
      await login(email, password);

      // Redirecionar para o dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao registrar. Verifique os dados e tente novamente.");
      console.error("Erro de registro:", err.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registrar</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required >
            <option>Selecione o Role</option>
            <option>user</option>
            <option>admin</option>
            <option>teacher</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
