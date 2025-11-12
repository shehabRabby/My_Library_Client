import React, { use, useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-50 bg-opacity-80 z-50">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/sign-up"></Navigate>;
};

export default PrivateRoute;
