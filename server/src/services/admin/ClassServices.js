const Class = require("../../models/Class");
const throwError = require("../../utils/throwError");

class ClassService {
  // Thêm lớp mới
  async addNewClass(className, classCode) {
    // Kiểm tra trùng classCode
    const existed = await Class.findOne({ classCode });
    if (existed) {
      throwError("Lớp đã tồn tại.", 401);
    }

    const newClass = await Class.create({
      className,
      classCode,
    });

    return {
      data: newClass,
    };
  }

  // Lấy danh sách tất cả lớp
  async getClasses() {
    const classes = await Class.find().sort({ createdAt: -1 });

    return {
      data: classes,
    };
  }
}

module.exports = new ClassService();
