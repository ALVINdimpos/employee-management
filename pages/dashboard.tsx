import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { EmployeeList } from "../components/EmployeeList";
import { EmployeeForm } from "../components/EmployeeForm";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status?: boolean;
}

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      fetchEmployees(storedToken);
    }
  }, []);

  const fetchEmployees = async (authToken: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const handleAddEmployee = async (newEmployee: Employee) => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/employees/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newEmployee),
        }
      );
      if (response.ok) {
        await fetchEmployees(token);
        setIsModalOpen(false);
      } else if (response.status === 400) {
        setError("Employee already exists");
      } else {
        console.error("Error adding employee:", await response.json());
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        Please log in to view the dashboard
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar token={token} setToken={setToken} />
        <div className="flex justify-between items-center p-6 mb-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900">
              Josh Bakery Ventures
            </h2>
            <p className="text-sm text-gray-500">
              62, Bode Thomas, Surulere, Lagos
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-white bg-green-500 rounded-md"
          >
            Add New
          </button>
        </div>
        <EmployeeList
          employees={employees}
          setEmployees={setEmployees}
          token={token}
        />
        <EmployeeForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddEmployee}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
