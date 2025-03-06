import Image from "next/image";
import { FaCaretDown } from "react-icons/fa6";
import router from "next/router";
import { useState } from "react";

interface NavbarProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

export function Navbar({ setToken }: NavbarProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsProfileDropdownOpen(false);
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <Image src="/Bitmap.svg" alt="Logo" width={200} height={200} />
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Hi, Joshua</span>
        <div className="flex justify-center items-center w-8 h-8 text-white bg-gray-500 rounded-full">
          <span>J</span>
        </div>
        <FaCaretDown
          className="w-4 h-4 text-gray-500"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        />
        {isProfileDropdownOpen && (
          <div className="absolute right-4 top-16 z-10 p-2 bg-white rounded-md border border-gray-200 shadow-lg">
            <button
              onClick={handleLogout}
              className="px-4 py-2 w-full text-sm text-left text-red-500 rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
