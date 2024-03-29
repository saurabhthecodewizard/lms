import UserModel, { User } from "../models/user.model"
import { generateLastYearData } from "../utils/analytics.generator";

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserByEmailWithPass = (email: string) => UserModel.findOne({ email }).select("+password");

export const getUserById = async (id: string) => await UserModel.findById(id);

export const getUserByIdWithPass = async (id: string) => await UserModel.findById(id).select("+password");

export const getUserBySocialAuthId = (socialAuthId: string) => UserModel.findOne({ socialAuthId });

export const saveUser = (user: User | null) => user?.save();

export const getAllUsers = () => UserModel.find().sort({ createdAt: -1 });

export const modifyUserRole = (userId: string, role: string) => UserModel.findByIdAndUpdate(userId, { role }, { new: true });

export const deleteUserById = (user: User) => user.deleteOne({ id: user._id });

export const getUserAnalytics = () => generateLastYearData(UserModel);