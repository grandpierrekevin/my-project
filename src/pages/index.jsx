import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/auth"; 
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // récupère le login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset l'erreur avant tentative
    try {
      const data = await loginUser({ user, password });
      login(data); // enregistre dans le contexte
      navigate("/home"); // 🔥 Redirige vers /home
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Identifiant"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
