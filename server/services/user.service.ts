import userModel, { User } from "../models/user.model"

export const getUserByEmail = (email: string) => userModel.findOne({ email });

export const getUserByEmailWithPass = (email: string) => userModel.findOne({ email }).select("+password");

export const getUserById = async (id: string) => await userModel.findById(id);

export const saveUser = (user: User | null) => user?.save();