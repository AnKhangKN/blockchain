import User, { IUser } from "../../models/User";

export const linkWalletService = async (userId: string, walletAddress: string): Promise<IUser> => {
  // Cập nhật walletAddress cho user
  const user = await User.findByIdAndUpdate(
    userId,
    { walletAddress },
    { new: true }
  );

  if (!user) {
    throw new Error("User không tồn tại!");
  }

  return user;
};