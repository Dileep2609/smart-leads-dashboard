import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

function AuthPage() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeUser = {
      name: name || "Demo User",
      email,
      role: "admin",
    };

    const fakeToken = "demo-token";

    login(fakeUser, fakeToken);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">
        <h1 className="text-4xl font-bold text-center mb-2">Smart Leads</h1>

        <p className="text-center text-slate-500 mb-8">
          MERN Internship Project
        </p>

        {/* TOGGLE */}
        <div className="flex mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-l-xl ${
              isLogin ? "bg-black text-white" : "bg-slate-200"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-r-xl ${
              !isLogin ? "bg-black text-white" : "bg-slate-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
