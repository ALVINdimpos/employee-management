import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Employee from "../../../models/Employee";
import { verifyToken } from "../../../lib/is_loggedin";

export default verifyToken(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { firstName, lastName, email, phone, role } = req.body;
    // validate the data
    if (!firstName || !lastName || !email || !phone || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if the employee already exists
    const employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    // create the employee
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      phone,
      role,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Error creating employee", error });
  }
});
