const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createCustomer,
	login,
	getUserByUserId,
	getCustomers,
	updateUsers,
	deleteUser
} = require("../controllers/customers");
router.get("/customers", getCustomers);
router.post("/customer", createCustomer);
router.get("/customer:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
