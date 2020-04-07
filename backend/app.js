const express = require("express");
const bodyParser = require("body-parser");
const expValidator = require("express-validator");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(expValidator());

const customerRouter = require("./routes/customer");
const userRouter = require("./routes/users");
const invoiceRouter = require("./routes/invoice");
const pdfRouter = require("./routes/getpdf");

app.use("/api", customerRouter);
app.use("/api", userRouter);
app.use("/api", invoiceRouter);
app.use("/api", pdfRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(` Server is running on port ${port}`));
module.exports = app;
