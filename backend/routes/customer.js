const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("../controllers/customers");
router.get("/customers", checkToken, getUsers);
router.post("/customer", checkToken, createUser);
router.get("/customer:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
