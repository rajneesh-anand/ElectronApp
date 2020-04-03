const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createCustomer,
	login,
	getCustomerById,
	getCustomers,
	updateCustomer,
	deleteUser
} = require("../controllers/customers");
router.get("/customers", getCustomers);
router.post("/customer", createCustomer);
router.get("/customer/:id", getCustomerById);
router.post("/login", login);
router.put("/customer", updateCustomer);
router.delete("/", checkToken, deleteUser);

module.exports = router;
