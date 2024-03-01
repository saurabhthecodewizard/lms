import userModel from "../models/user.model"

export const getUserByEmail = (email: string) => userModel.findOne({ email });

export const getUserByEmailWithPass = (email: string) => userModel.findOne({ email }).select("+password");

// get user by id
export const getUserById = async (id: string) => {
    const user = await userModel.findById(id);
    return user;
}