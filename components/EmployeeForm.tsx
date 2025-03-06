import { useState } from "react";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
  isLoading: boolean;
  error: string | null;
}

export function EmployeeForm({
  isOpen,
  onClose,
  onAdd,
  isLoading,
  error,
}: EmployeeFormProps) {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Staff",
  });

  const handleSubmit = () => {
    onAdd(newEmployee);
    setNewEmployee({
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Staff",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/40">
      <div className="p-6 w-96 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Add New Employee
        </h2>
        {error && (
          <div className="p-3 mb-4 bg-red-50 rounded-md border border-red-200">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 w-5 h-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          </div>
        )}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={newEmployee.firstName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
            className="p-2 w-full text-sm rounded-md border border-gray-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newEmployee.lastName}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
            className="p-2 w-full text-sm rounded-md border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="p-2 w-full text-sm rounded-md border border-gray-300"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="p-2 w-full text-sm rounded-md border border-gray-300"
          />
          <select
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="p-2 w-full text-sm rounded-md border border-gray-300"
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 rounded-md border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm text-white bg-green-500 rounded-md"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
