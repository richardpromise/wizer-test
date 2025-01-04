import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
