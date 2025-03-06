import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Employee from "../../../models/Employee";
import { verifyToken } from "../../../lib/is_loggedin";

export default verifyToken(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await dbConnect();

  try {
    switch (req.method) {
      case "GET": // Fetch a single employee
        const employee = await Employee.findById(id);
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json(employee);

      case "PATCH": // Update an employee
        const { role } = req.body;

        // Validate the data
        if (!role) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { role },
          { new: true }
        );

        if (!updatedEmployee) {
          return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json(updatedEmployee);

      case "DELETE": // Delete an employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          return res.status(404).json({ message: "Employee not found" });
        }
        return res
          .status(200)
          .json({ message: "Employee deleted successfully" });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});
