const Subject = require("../../models/Subject");

class SubjectServices {
  async getSubjects() {
    const subjects = await Subject.find();
    return { data: subjects };
  }

  async addNewSubject(name, code) {
    // 1. Kiểm tra dữ liệu đầu vào
    if (!name || !code) {
      throwError("Tên và mã môn học là bắt buộc!", 400);
    }

    // 2. Kiểm tra trùng code (kể cả inactive)
    const exist = await Subject.findOne({ code });
    if (exist) {
      throwError("Mã môn học đã tồn tại!", 409); // Conflict
    }

    // 3. Tạo mới subject
    const newSubject = await Subject.create({
      name,
      code,
    });

    return {
      message: "Tạo môn học thành công!",
      subject: newSubject,
    };
  }

  async deleteSubject(subjectId) {
    // Tìm subject
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      throwError("Môn học không tồn tại!", 404);
    }

    // Nếu đã inactive
    if (subject.status === "inactive") {
      return {
        message: "Môn học đã bị vô hiệu hóa trước đó.",
        subject,
      };
    }

    // Cập nhật trạng thái
    subject.status = "inactive";
    await subject.save();

    return {
      message: "Xóa môn học thành công!",
      subject,
    };
  }
}

module.exports = new SubjectServices();
