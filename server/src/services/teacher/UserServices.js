const Subject = require("../../models/Subject");
const User = require("../../models/User");

class UserServices {
  async getStudents(teacherId, subjectId) {
    // 1. Kiểm tra môn học có thuộc giảng viên này không
    const subject = await Subject.findOne({
      _id: subjectId,
      teachers: teacherId,
    });

    if (!subject) {
      return []; // môn học không tồn tại hoặc không thuộc giảng viên
    }

    // 2. Lấy tất cả học sinh học môn này
    const students = await User.find({
      subjects: subjectId,
      isTeacher: false,
      isAdmin: false,
    });

    return {
      data: students || [],
    };
  }
}

module.exports = new UserServices();
