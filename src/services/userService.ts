import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface registerUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerUser) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return { data: generateJWT({firstName, lastName, email}), statusCode: 200 };
};

interface loginUser {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginUser) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "email or password is incorrect", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return { data: generateJWT({email, firstName: findUser.firstName, lastName: findUser.lastName}), statusCode: 200 };
  }
  return { data: "email or password is incorrect", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "sEBcYeRFyZoYFtqLBxEaRjWBPx8PndkO");
};
