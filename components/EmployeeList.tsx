import { useState, useEffect } from "react";
import { MdAutoDelete } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status?: boolean;
}

interface EmployeeListProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  token: string;
}

export function EmployeeList({
  employees,
  setEmployees,
  token,
}: EmployeeListProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayEmployees, setDisplayEmployees] =
    useState<Employee[]>(employees);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>("Change role");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(displayEmployees.length / 5));
  }, [displayEmployees]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      const employeesArray = Array.isArray(data) ? data : [];
      setEmployees(employeesArray);
      setDisplayEmployees(employeesArray);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
      setDisplayEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleChangeRole = async () => {
    if (selectedRole === "Change role") return;
    try {
      const updatePromises = selectedEmployees.map((id) =>
        fetch(`/api/employees/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: selectedRole }),
        })
      );
      await Promise.all(updatePromises);
      await fetchEmployees();
      setSelectedEmployees([]);
      setSelectedRole("Change role");
    } catch (error) {
      console.error("Error updating roles:", error);
    }
  };

  // Search and Pagination Logic (same as original)
  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayEmployees(filtered);
    } else {
      setDisplayEmployees(employees);
    }
  }, [searchTerm, employees]);

  const employeesPerPage = 5;
  const paginatedEmployees = displayEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex-1 p-6">
      {/* Controls */}
      <div className="flex items-center mb-6 space-x-4">
        <div className="flex items-center space-x-2">
          <select
            className="p-2 text-sm text-gray-700 rounded-md border border-gray-300"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>Change role</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>
          <button
            onClick={handleChangeRole}
            className="px-4 py-2 text-sm text-white bg-green-500 rounded-md"
          >
            Change
          </button>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter staff name here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-8 w-full text-sm rounded-md border border-gray-300"
          />
          <BiSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>
            {currentPage} of {totalPages}
          </span>
          <button onClick={handlePrevPage}>
            <FaArrowLeft />
          </button>
          <button onClick={handleNextPage}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white rounded-md border border-gray-200 shadow-sm">
        {isLoading ? (
          <div className="p-4 text-center">Loading employees...</div>
        ) : paginatedEmployees.length === 0 ? (
          <div className="p-4 text-center">No employees found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-sm text-left text-gray-700 bg-gray-50 border-b border-gray-200">
                <th className="p-3 pl-4">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedEmployees(
                        e.target.checked
                          ? displayEmployees.map((emp) => emp._id)
                          : []
                      )
                    }
                  />
                </th>
                <th className="p-3">FIRST NAME</th>
                <th className="p-3">LAST NAME</th>
                <th className="p-3">EMAIL</th>
                <th className="p-3">PHONE</th>
                <th className="p-3">ROLE</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee._id} className="border-t border-gray-100">
                  <td className="p-3 pl-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee._id)}
                      onChange={() =>
                        setSelectedEmployees(
                          selectedEmployees.includes(employee._id)
                            ? selectedEmployees.filter(
                                (id) => id !== employee._id
                              )
                            : [...selectedEmployees, employee._id]
                        )
                      }
                    />
                  </td>
                  <td className="p-3">{employee.firstName}</td>
                  <td className="p-3">{employee.lastName}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.phone}</td>
                  <td className="p-3">{employee.role}</td>
                  <td className="p-3">
                    <button onClick={() => handleDeleteEmployee(employee._id)}>
                      <MdAutoDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
