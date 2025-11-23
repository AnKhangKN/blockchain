const Subject = require("../../models/Subject");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

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
    const user = await User.findById(userId)
      .select("-password")
      .populate("subjects", "_id name")
      .populate("classes", "_id className classCode");

    if (!user) {
      throw new Error("Người dùng không tồn tại!");
    }

    return { data: user };
  }

  async updateUserRole(userId, role, subjects) {
    const user = await User.findById(userId).orFail(() =>
      throwError("Người dùng không tồn tại!", 404)
    );

    // Reset quyền
    user.isAdmin = false;
    user.isTeacher = false;

    switch (role) {
      case "admin":
        user.isAdmin = true;
        delete user.walletAddress;
        break;

      case "teacher":
        user.isTeacher = true;
        break;

      case "student":
      default:
        delete user.walletAddress;
        break;
    }

    if (user.isTeacher && Array.isArray(subjects)) {
      // Chỉ lấy _id string nếu subjects là object
      const subjectIds = subjects.map((s) =>
        typeof s === "string" ? s : s._id.toString()
      );

      // Kết hợp danh sách cũ + mới, loại trùng
      const uniqueSubjects = Array.from(
        new Set([...user.subjects.map(String), ...subjectIds])
      );

      // Gán lại cho user
      user.subjects = uniqueSubjects;

      // Cập nhật subject.teachers
      for (const subjectId of uniqueSubjects) {
        const subject = await Subject.findById(subjectId);
        if (!subject) continue;

        if (
          !subject.teachers.some((id) => id.toString() === user._id.toString())
        ) {
          subject.teachers.push(user._id);
          await subject.save();
        }
      }
    } else {
      user.subjects = [];
    }

    await user.save();

    return {
      message: "Cập nhật quyền và môn dạy thành công",
      user,
    };
  }

  async updateStudent(userId, { fullName, email, classId, subjects, status }) {
    // 1. Tìm user theo ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User không tồn tại");
    }

    // 2. Cập nhật các trường nếu có
    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;

    // Chỉ gán classId nếu khác rỗng
    if (classId !== undefined && classId.length && classId[0] !== "") {
      user.classes = classId;
    }

    if (status !== undefined) user.status = status;

    // 3. Cập nhật subjects nếu có
    if (subjects !== undefined && subjects.length) {
      user.subjects = subjects;

      // Thêm userId vào subject.students
      for (const subjectId of subjects) {
        const subject = await Subject.findById(subjectId);
        if (!subject) continue; // bỏ qua nếu subject không tồn tại

        if (!subject.students.includes(user._id)) {
          subject.students.push(user._id);
          await subject.save();
        }
      }
    }

    // 4. Lưu user
    await user.save();

    return user;
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
