import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const payload = isLogin
        ? {
            email,
            password,
          }
        : {
            name,
            email,
            password,
          };

      const response = await axios.post(`${API}${endpoint}`, payload);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Authentication Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">Smart Leads</h1>

        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-l-lg ${
              isLogin ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-r-lg ${
              !isLogin ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
