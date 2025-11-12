import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-8xl font-bold text-violet-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        {error?.statusText ||
          error?.message ||
          "The page you’re looking for doesn’t exist."}
      </p>

      <Link
        to="/"
        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
