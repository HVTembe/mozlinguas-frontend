import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const { user, token } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/update",
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Perfil atualizado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.response?.data);
      alert("Erro ao atualizar perfil!");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1>Perfil do Usuário</h1>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar Perfil"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
