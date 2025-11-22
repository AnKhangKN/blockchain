const User = require("../../models/User");

class UserServices {
  // Add user service methods here
  async getUsers() {
    const users = await User.find().select("-password");

    return { data: users };
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
