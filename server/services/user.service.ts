import UserModel, { User } from "../models/user.model"

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserByEmailWithPass = (email: string) => UserModel.findOne({ email }).select("+password");

export const getUserById = async (id: string) => await UserModel.findById(id);

export const getUserByIdWithPass = async (id: string) => await UserModel.findById(id).select("+password");

export const saveUser = (user: User | null) => user?.save();

export const getAllUsers = () => UserModel.find().sort({ createdAt: -1 });