const ClassServices = require("../../services/admin/ClassServices");

const addNewClass = async (req, res, next) => {
  try {
    const { className, classCode } = req.body;

    const result = await ClassServices.addNewClass(className, classCode);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getClasses = async (req, res, next) => {
  try {
    const result = await ClassServices.getClasses();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewClass,
  getClasses,
};
