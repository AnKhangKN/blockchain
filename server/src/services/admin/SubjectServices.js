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

  async addTeacherSubject(teacherId, subjectId) {
    // Lấy subject
    const subject = await Subject.findById(subjectId);
    if (!subject) throw new Error("Môn học không tồn tại");

    // Lấy teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || !teacher.isTeacher)
      throw new Error("Giảng viên không tồn tại");

    // Thêm teacher vào danh sách giảng viên của môn học nếu chưa có
    if (!subject.teachers.includes(teacher._id)) {
      subject.teachers.push(teacher._id);
      await subject.save();
    }

    // Thêm môn học vào danh sách subjects của teacher nếu chưa có
    if (!teacher.subjects.includes(subject._id)) {
      teacher.subjects.push(subject._id);
      await teacher.save();
    }

    return { message: "Thêm giảng viên vào môn học thành công" };
  }

  async addStudentSubject(studentId, subjectId) {
    const subject = await Subject.findById(subjectId);
    if (!subject) throw new Error("Môn học không tồn tại");

    const student = await User.findById(studentId);
    if (!student || !student.isStudent)
      throw new Error("Sinh viên không tồn tại");

    // Thêm student vào danh sách sinh viên của môn học nếu chưa có
    if (!subject.students.includes(student._id)) {
      subject.students.push(student._id);
      await subject.save();
    }

    // Thêm môn học vào danh sách subjects của student nếu chưa có
    if (!student.subjects.includes(subject._id)) {
      student.subjects.push(subject._id);
      await student.save();
    }

    return { message: "Thêm sinh viên vào môn học thành công" };
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
