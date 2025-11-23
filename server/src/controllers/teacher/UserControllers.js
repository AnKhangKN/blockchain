const UserServices = require("../../services/teacher/UserServices");

const getStudents = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const teacherId = req.user.id;

    const result = await UserServices.getStudents(teacherId, subjectId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
};
