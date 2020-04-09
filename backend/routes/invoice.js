const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createInvoice,
	getInvoiceNumber,
	getInvoices,
} = require("../controllers/invoices");
// router.get("/invoices", getInvoices);
router.post("/invoice", createInvoice);
router.get("/getinvoice", getInvoiceNumber);
router.get("/getinvoices", getInvoices);

// router.get("/invoice/:id", getInvoiceById);
// router.put("/invoice", updateInvoice);

module.exports = router;
