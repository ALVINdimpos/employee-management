import { BsGrid } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

export function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center py-6 h-full">
        <div className="mb-8"></div>
        <div className="flex flex-col items-center space-y-6">
          <button className="p-2 text-white bg-green-500 rounded-md">
            <BsGrid className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
            <FiUsers className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
