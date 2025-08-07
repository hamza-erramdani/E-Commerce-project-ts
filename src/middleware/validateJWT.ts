import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
interface ExtendRequest extends Request {
  user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("authorization header was not provided");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("bearer token not found");
    return;
  }
  jwt.verify(
    token,
    "sEBcYeRFyZoYFtqLBxEaRjWBPx8PndkO",
    async (err, payload) => {
      if (err) {
        res.status(403).send("invalid token");
        return;
      }
      if (!payload) {
        res.status(403).send("invalid token payload");
        return;
      }
      const userPayload = payload as {
        firstName: string;
        lastName: string;
        email: string;
      };

      //fetch user from database based on the payload
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
