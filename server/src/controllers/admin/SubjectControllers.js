const SubjectServices = require("../../services/admin/SubjectServices");

const getSubjects = async (req, res, next) => {
  try {
    const result = await SubjectServices.getSubjects();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addNewSubject = async (req, res, next) => {
  try {
    const { name, code } = req.body;

    const result = await SubjectServices.addNewSubject(name, code);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const result = await SubjectServices.deleteSubject(subjectId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubjects,
  addNewSubject,
  deleteSubject,
};
