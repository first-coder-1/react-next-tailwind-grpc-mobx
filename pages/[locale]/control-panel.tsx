import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

const ControlPanel: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Rendering area
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h1 className="text-2xl font-bold mb-4">Painel de Controle</h1>
        <p className="mb-4">Bem-vindo ao seu painel de controle!</p>
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
