import mongoose, { Document, Schema } from "mongoose";
import { transpileModule } from "typescript";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const User = mongoose.model<IUser>("User", userSchema)
export default User;
