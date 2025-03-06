import React from "react";
import Link from "next/link";

const Page404: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-gray-900">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 mt-6 bg-blue-500 rounded hover:bg-blue-600"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default Page404;
