import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

interface ExtendedNextApiRequest extends NextApiRequest {
  user?: {
    userId: string;
    email: string;
  };
}

type ApiHandler = (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export const verifyToken =
  (handler: ApiHandler) =>
  async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as {
        userId: string;
        email: string;
      };
      req.user = decoded;
      return handler(req, res);
    } catch {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }
  };
