const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createInvoice,
	getInvoiceById,
	getInvoices,
	updateInvoice,
} = require("../controllers/invoices");
router.get("/invoices", getInvoices);
router.post("/invoice", createInvoice);
router.get("/invoice/:id", getInvoiceById);
router.put("/invoice", updateInvoice);

module.exports = router;
