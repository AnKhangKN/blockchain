const User = require("../../models/User");

class UserServices {
  // Add user service methods here
  async getUsers() {
    const users = await User.aggregate([
      {
        $addFields: {
          sortOrder: {
            $cond: [
              { $eq: ["$isAdmin", true] },
              3, // admin
              {
                $cond: [
                  { $eq: ["$isTeacher", true] },
                  2, // teacher
                  1, // student
                ],
              },
            ],
          },
        },
      },
      { $sort: { sortOrder: 1 } },
      { $project: { password: 0, sortOrder: 0 } },
    ]);

    return { data: users };
  }

  async getUserDetail(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    return { data: user };
  }

  async updateUserRole(userId, isTeacher) {
    const user = await User.findById(userId).orFail(() =>
      throwError("Người dùng không tồn tại!", 404)
    );

    // isTeacher: true => giáo viên
    user.isTeacher = isTeacher;
    await user.save();
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { status: "inactive" },
      { new: true }
    ).orFail(() => throwError("Người dùng không tồn tại!", 404));

    return user;
  }
}

module.exports = new UserServices();
