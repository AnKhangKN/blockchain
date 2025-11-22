const UserServices = require("../../services/admin/UserServices");

const getUsers = async (req, res, next) => {
  try {
    const result = await UserServices.getUsers();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserDetail = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserDetail(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { userId, isTeacher } = req.body;
    await UserServices.updateUserRole(userId, isTeacher);
    return res
      .status(200)
      .json({ message: "Cập nhật vai trò người dùng thành công!" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserServices.deleteUser(id);
    return res.status(200).json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserDetail,
  updateUserRole,
  deleteUser,
};
