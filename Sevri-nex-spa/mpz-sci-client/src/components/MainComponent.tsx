'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MainComponent() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error iniciando sesión");
        return;
      }

      router.push("/menu-Evaluations");
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="from-dark_primary-500 to-dark_primary-600 bg-gradient-to-b min-h-screen place-content-center">
      <div className="flex place-content-center">
        <div className="bg-white h-auto p-8 rounded-lg shadow-lg text-center md:w-96 border-b-8 border-primary-800">
          <h2 className="text-2xl font-bold mb-6">
            Control de Riesgo - MPZ
          </h2>

          <input
            type="text"
            placeholder="Usuario"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />

          {error && (
            <p className="text-red-500 mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full h-14 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>

      <footer className="text-white text-center mt-10">
        <Image
          className="mx-auto"
          src="/mpz-logo.png"
          alt="Municipalidad de Pérez Zeledón"
          width={200}
          height={200}
        />
        <h3>&copy; Municipalidad de Pérez Zeledón</h3>
      </footer>
    </div>
  );
}

export default MainComponent;