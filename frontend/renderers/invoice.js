const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

var val1,
	val2,
	val3,
	val4,
	val5,
	val6,
	val7,
	val8,
	val9,
	val10,
	val11,
	val12,
	val13,
	val14,
	val15,
	val16,
	val17,
	val18,
	total,
	comm_amount,
	total_passenger,
	base_amount,
	ncf_amount,
	tax_amount,
	hs_amount,
	gratuity_amount,
	misc_amount,
	token_amount,
	tds_amount,
	cgst_amount,
	sgst_amount,
	igst_amount,
	gst,
	total_gst,
	gross_amount,
	gross_amount_inr;

var customers = [];

function ValidateNumbers(e) {
	document.oncontextmenu = function () {
		return false;
	};
	var key = document.all ? e.keyCode : e.which;
	if (key == 8) return true;
	patron = /\d/;
	te = String.fromCharCode(key);
	return patron.test(te);
}

function isNumberKey(evt, obj) {
	var charCode = evt.which ? evt.which : event.keyCode;
	var value = obj.value;
	var dotcontains = value.indexOf(".") != -1;
	if (dotcontains) if (charCode == 46) return false;
	if (charCode == 46) return true;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

function thFormat(num) {
	var num_parts = num.toString().split(".");
	num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return num_parts.join(".");
}

function GetTotal(obj) {
	val1 =
		document.getElementById("adults").value === ""
			? 0
			: document.getElementById("adults").value;
	val2 =
		document.getElementById("children").value === ""
			? 0
			: document.getElementById("children").value;
	val3 =
		document.getElementById("infants").value === ""
			? 0
			: document.getElementById("infants").value;
	val4 =
		document.getElementById("price_adults").value === ""
			? 0
			: document.getElementById("price_adults").value;
	val5 =
		document.getElementById("price_children").value === ""
			? 0
			: document.getElementById("price_children").value;
	val6 =
		document.getElementById("price_infants").value === ""
			? 0
			: document.getElementById("price_infants").value;
	val7 = document.getElementById("comm").value
		? document.getElementById("comm").value
		: 0;
	val8 =
		document.getElementById("ncf").value === ""
			? 0
			: document.getElementById("ncf").value;
	val9 =
		document.getElementById("tax").value === ""
			? 0
			: document.getElementById("tax").value;
	val10 =
		document.getElementById("gratuity").value === ""
			? 0
			: document.getElementById("gratuity").value;
	val11 =
		document.getElementById("holiday").value === ""
			? 0
			: document.getElementById("holiday").value;
	val12 =
		document.getElementById("misc").value === ""
			? 0
			: document.getElementById("misc").value;
	val13 =
		document.getElementById("tds").value === ""
			? 0
			: document.getElementById("tds").value;
	val14 =
		document.getElementById("token").value === ""
			? 0
			: document.getElementById("token").value;
	val15 = document.getElementById("cgst").value
		? document.getElementById("cgst").value
		: 0;
	val16 = document.getElementById("igst").value
		? document.getElementById("igst").value
		: 0;
	val17 = document.getElementById("sgst").value
		? document.getElementById("sgst").value
		: 0;
	val18 = document.getElementById("roe").value
		? document.getElementById("roe").value
		: 0;

	total_passenger = parseInt(val1) + parseInt(val2) + parseInt(val3);

	var amount_one = parseInt(val1) * parseFloat(val4);
	var amount_two = parseInt(val2) * parseFloat(val5);
	var amount_three = parseInt(val3) * parseFloat(val6);

	total = (
		parseFloat(amount_one) +
		parseFloat(amount_two) +
		parseFloat(amount_three)
	).toFixed(2);

	comm_amount = ((total * parseFloat(val7)) / 100).toFixed(2);

	base_amount = parseFloat(total) - parseFloat(comm_amount);

	ncf_amount = (parseInt(total_passenger) * parseFloat(val8)).toFixed(2);
	tax_amount = (parseInt(total_passenger) * parseFloat(val9)).toFixed(2);
	gratuity_amount = (parseInt(total_passenger) * parseFloat(val10)).toFixed(2);
	hs_amount = (parseInt(total_passenger) * parseFloat(val11)).toFixed(2);
	misc_amount = parseFloat(val12).toFixed(2);
	tds_amount = ((comm_amount * parseFloat(val13)) / 100).toFixed(2);
	token_amount = parseFloat(val14).toFixed(2);

	net_amount = (
		parseFloat(base_amount) +
		parseFloat(ncf_amount) +
		parseFloat(tax_amount) +
		parseFloat(gratuity_amount) +
		parseFloat(hs_amount) +
		parseFloat(misc_amount) +
		parseFloat(tds_amount)
	).toFixed(2);

	// GST Calculation
	gst = parseFloat(val15) + parseFloat(val16) + parseFloat(val17);

	cgst_amount = ((net_amount * parseFloat(val15)) / 100).toFixed(2);
	igst_amount = ((net_amount * parseFloat(val16)) / 100).toFixed(2);
	sgst_amount = ((net_amount * parseFloat(val17)) / 100).toFixed(2);
	total_gst = (
		parseFloat(cgst_amount) +
		parseFloat(igst_amount) +
		parseFloat(sgst_amount)
	).toFixed(2);

	//--------------------------------

	if ($("#gst-switch").is(":checked")) {
		gross_amount = (parseFloat(net_amount) - parseFloat(total_gst)).toFixed(2);
		document.getElementById("total").innerHTML = parseFloat(
			gross_amount
		).toFixed(2);
	} else {
		gross_amount = (parseFloat(net_amount) + parseFloat(total_gst)).toFixed(2);
		document.getElementById("total").innerHTML = parseFloat(
			gross_amount
		).toFixed(2);
	}

	document.getElementById("base_amt").innerHTML = parseFloat(total).toFixed(2);

	document.getElementById("comm_amt").innerHTML = parseFloat(
		comm_amount
	).toFixed(2);

	document.getElementById("ncf_amt").innerHTML = parseFloat(ncf_amount).toFixed(
		2
	);
	document.getElementById("tax_amt").innerHTML = parseFloat(tax_amount).toFixed(
		2
	);

	document.getElementById("hs_amt").innerHTML = parseFloat(hs_amount).toFixed(
		2
	);
	document.getElementById("gt_amt").innerHTML = parseFloat(
		gratuity_amount
	).toFixed(2);
	document.getElementById("tds_amt").innerHTML = parseFloat(tds_amount).toFixed(
		2
	);
	document.getElementById("gst_amt").innerHTML = parseFloat(total_gst).toFixed(
		2
	);

	if (val18 === 0 || val18 == "") {
		gross_amount_inr = parseFloat(gross_amount).toFixed(2);
	} else {
		gross_amount_inr = (parseFloat(gross_amount) * parseFloat(val18)).toFixed(
			2
		);
	}
}

$(document).ready(function () {
	//-- closing form

	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", (event) => {
		const window = remote.getCurrentWindow();
		window.close();
	});

	$(".datepicker").datepicker({
		defaultDate: new Date(),
		autoClose: true,
		format: "dd mmm yyyy",
		setDefaultDate: true,
	});

	//convert date format for database
	function formattedDate(dateValue) {
		const event = new Date(dateValue);
		const year = event.getFullYear();
		const month = event.getMonth() + 1;
		const getdate = event.getDate();
		return `${year}-${month}-${getdate}`;
	}
	//

	// Send Form Data to Server

	const isvalid = () => {
		let name = document.getElementById("name").value;
		let adults = document.getElementById("adults").value;
		let price_adults = document.getElementById("price_adults").value;
		let ship = document.getElementById("ship_name").value;
		let cruise = document.getElementById("cruise").value;
		let agent = document.querySelector(".agentName").value;

		if (
			name === "" ||
			adults === "" ||
			price_adults === "" ||
			ship === "" ||
			cruise === "" ||
			agent === ""
		) {
			return false;
		} else {
			return true;
		}
	};

	var form = document.querySelector("form");

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		if (isvalid()) {
			var data = new FormData(form);
			ipcRenderer.send("add:invoice", {
				Invoice_Number: data.get("invoice_no"),
				Invoice_Date: formattedDate(data.get("invoice_date")),
				Departure_Date: formattedDate(data.get("departure_date")),
				Agent_Name: data.get("agent"),
				Cruise_Ship: data.get("ship_name"),
				Cruise: data.get("cruise"),
				Currency: data.get("currency"),
				Booking: data.get("bookings"),
				Cabin: data.get("cabin"),
				Cat_Bkg: data.get("cat_bkg"),
				Pass_Name: data.get("name"),
				Nationality: data.get("nationality"),
				Adults: val1,
				Children: val2,
				Infants: val3,
				Adults_Rate: val4,
				Children_Rate: val5,
				Infants_Rate: val6,
				Comm_Rate: val7,
				Comm_Amt: comm_amount.toFixed(2),
				NCF: val8,
				NCF_Amt: ncf_amount.toFixed(2),
				TAX: val9,
				TAX_Amt: tax_amount.toFixed(2),
				HS: val10,
				HS_Amt: hs_amount.toFixed(2),
				Misc: misc_amount,
				TDS: val13,
				TDS_Amt: tds_amount.toFixed(2),
				Token_Amt: token_amount.toFixed(2),
				CGST: val15,
				IGST: val16,
				SGST: val17,
				GST_Amt: total_gst.toFixed(2),
				ROE: val18,
				Base_Amt: total,
				Total_Payable_Amt: gross_amount.toFixed(2),
				Total_Payable_Amt_INR: gross_amount_inr.toFixed(2),
				Token: switchStatus,
				GST: gstSwitchStatus,
				PAX: total_passenger,
				EntryDate: formattedDate(data.get("invoice_date")),
				Credit_Account: "CARROT CRUISE",
				Credit_Amount: gross_amount_inr.toFixed(2),
				Debit_Account: data.get("agent"),
				Debit_Amount: gross_amount_inr.toFixed(2),
				EntryType: "Invoice-Entry",
				InvoiceNumber: data.get("invoice_no"),
			});
		}
	});
});

ipcRenderer.on("fetchCustomers", (event, data) => {
	customers = [...data];
	console.log(customers);
	var Options = "";
	data.map(function (element, i) {
		Options =
			Options + `<option value='${element.id}'>${element.first_name}</option>`;
	});

	$(".agentName").append(Options);
	$(".agentName").formSelect();
});

ipcRenderer.on("sendInvoiceNumber", (event, args) => {
	let extractInvoice = args[0];
	//console.log(extractInvoice["@Invoice_Number"]);
	document.getElementById("invoice_no").value =
		extractInvoice["@Invoice_Number"];
});

// function generateInvoice(invoiceNumber) {
// 	var generatedInvoice;
// 	var x = invoiceNumber.slice(-5);
// 	var s = Number(x) + 1;
// 	var zerofilled = ("00000" + s).slice(-5);
// 	 = `CC${new Date().getFullYear()}${new Date().getMonth()}-${zerofilled}`;
// 	console.log(generatedInvoice);
// 	document.getElementById("invoice_no").value = generatedInvoice;
// }

var switchStatus = false;
$("#my-switch").on("change", function () {
	if ($(this).is(":checked")) {
		switchStatus = $(this).is(":checked");
		// alert(switchStatus); // To verify
		$("#token").prop("disabled", false);
	} else {
		switchStatus = $(this).is(":checked");
		//alert(switchStatus); // To verify
		$("#token").prop("disabled", true);
	}
});
var gstSwitchStatus = false;
$("#gst-switch").on("change", function () {
	if ($(this).is(":checked")) {
		gstSwitchStatus = $(this).is(":checked");
		gross_amount = parseFloat(net_amount) - parseFloat(total_gst);
		document.getElementById("total").innerHTML = parseFloat(
			gross_amount
		).toFixed(2);
	} else {
		gstSwitchStatus = $(this).is(":checked");
		gross_amount = parseFloat(net_amount) + parseFloat(total_gst);
		document.getElementById("total").innerHTML = parseFloat(
			gross_amount
		).toFixed(2);
	}
});

ipcRenderer.on("invoice:added", (event, args) => {
	alert(args);
});

//--- Invoice PDF Generation ---

// document.getElementById("download").addEventListener("click", () => {
// 	generate();
// });

function generate() {
	let doc = new jsPDF("portrait", "pt", "a4", true);

	var res = doc.autoTableHtmlToJson(document.getElementById("invoice"));
	doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

	var header = function (data) {
		doc.setFontSize(18);
		doc.setTextColor(40);
		doc.setFontStyle("normal");
		//doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
		doc.text("Testing Report", data.settings.margin.center, 50);
	};

	var options = {
		beforePageContent: header,
		margin: {
			top: 80,
		},
		startY: doc.autoTableEndPosY() + 20,
	};

	doc.autoTable(res.columns, res.data, options);

	doc.save("table.pdf");
}

var comapnyJSON = {
	CompanyName: "CARROT CRUISE SHIPPING PVT.LTD",
	CompanyGSTIN: "37B76C238B7E1Z5",
	CompanyState: "KERALA (09)",
	CompanyPAN: "B76C238B7E",
	CompanyAddressLine1: "357, 3rd Floor , Vardhman City Center 2",
	CompanyAddressLine2: "Shakti Nagar Under Bridge – Delhi 110007",
	CompanyAddressLine3: "COCHIN",
	PIN: "683584",
	companyEmail: "xyz@gmail.com",
	companyPhno: "+918189457845 / 98978789787",
	companyWebsite: "http://www.cruisecarrot.com",
};

var customer_BillingInfoJSON = {
	CustomerName: "Jino Shaji",
	CustomerGSTIN: "37B76C238B7E1Z5",
	CustomerState: "KERALA (09)",
	CustomerPAN: "B76C238B7E",
	CustomerAddressLine1: "ABCDEFGD HOUSE,IX/642-D",
	CustomerAddressLine2: "ABCDEFGD P.O., NEDUMBASSERY",
	CustomerAddressLine3: "COCHIN",
	PIN: "683584",
	CustomerEmail: "abcd@gmail.com",
	CustomerPhno: "+918189457845",
};

var customer_ShippingInfoJSON = {
	CustomerName: "Jino Shaji",
	CustomerGSTIN: "37B76C238B7E1Z5",
	CustomerState: "KERALA (09)",
	CustomerPAN: "B76C238B7E",
	CustomerAddressLine1: "ABCDEFGD HOUSE,IX/642-D",
	CustomerAddressLine2: "ABCDEFGD P.O., NEDUMBASSERY",
	CustomerAddressLine3: "COCHIN",
	PIN: "683584",
	CustomerEmail: "abcd@gmail.com",
	CustomerPhno: "+918189457845",
};

var invoiceJSON = {
	totalgst: parseFloat(val15) + parseFloat(val16) + parseFloat(val17),
	cgstRate: val15,
	sgstRate: val17,
	cgstAmt: cgst_amount,
	sgstAmt: sgst_amount,
	totalgstAmt: val18,
	InvoiceNo: "INV-120152",
	InvoiceDate: "03-12-2017",
	RefNo: "REF-78445",
	TotalAmnt: "Rs.1,24,200",
	SubTotalAmnt: "Rs.1,04,200",
	TotalGST: "Rs.2,0000",
	TotalCGST: "Rs.1,0000",
	TotalSGST: "Rs.1,0000",
	TotalIGST: "Rs.0",
	TotalCESS: "Rs.0",
};

var company_logo = {
	src1:
		"data:image/png;base64,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",

	w: 80,
	h: 50,
};

var fontSizes = {
	HeadTitleFontSize: 18,
	Head2TitleFontSize: 16,
	TitleFontSize: 14,
	SubTitleFontSize: 12,
	NormalFontSize: 10,
	SmallFontSize: 8,
};

var lineSpacing = {
	NormalSpacing: 12,
};

function generateInvoice() {
	let doc = new jsPDF("portrait", "pt", "a4", true, { marginRight: 10 });
	let width = doc.internal.pageSize.getWidth();

	const agentDetails =
		customers[document.querySelector(".agentName").value - 1];
	var InvoiceNumber = $("#invoice_no").val();
	var date = document.getElementById("invoice_date").value;
	var agent = agentDetails.first_name;
	var address = agentDetails.address_line_one;
	var city = agentDetails.city;
	var state = agentDetails.state_name;
	var pin = agentDetails.pincode;
	var gstin = agentDetails.gstin;

	var passname = document.getElementById("name").value;
	var cabin = document.getElementById("cabin").value;
	var suite = document.getElementById("cat_bkg").value;
	var shipname = document.getElementById("ship_name").value;
	var currency = document.getElementById("currency").value;

	var rightStartCol1 = 400;
	var rightStartCol2 = 480;

	var InitialstartX = 40;
	var startX = 40;
	var InitialstartY = 50;
	var startY = 0;

	var lineHeights = 12;

	doc.setFontSize(fontSizes.SubTitleFontSize);
	doc.setFont("times");
	doc.setFontType("bold");

	//pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
	// doc.addImage(
	// 	company_logo.src,
	// 	"PNG",
	// 	startX,
	// 	(startY += 50),
	// 	company_logo.w,
	// 	company_logo.h
	// );
	// -------------- Company Info Start -----------------
	doc.textAlign(
		comapnyJSON.CompanyName,
		{ align: "left" },
		startX,
		(startY += 15 + company_logo.h)
	);
	doc.setFontSize(fontSizes.NormalFontSize);
	doc.setFontType("bold");

	doc.textAlign(
		comapnyJSON.CompanyAddressLine1,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		comapnyJSON.CompanyAddressLine2,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		"GSTIN : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.CompanyGSTIN, { align: "left" }, 80, startY);

	doc.textAlign(
		"Contact : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.companyPhno, { align: "left" }, 80, startY);

	doc.textAlign(
		"Website :",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.companyWebsite, { align: "left" }, 80, startY);

	// ------------Company Info End ------//

	var tempY = InitialstartY;

	doc.textAlign(
		"INVOICE NO: ",
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${InvoiceNumber}`, { align: "left" }, rightStartCol2, tempY);

	doc.textAlign(
		"INVOICE DATE : ",
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${date}`, { align: "left" }, rightStartCol2, tempY);

	doc.textAlign(
		`TOTAL PAYABLE AMOUNT { ${currency} }`,
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		`${thFormat(gross_amount)}`,
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.setLineWidth(1);
	doc.line(
		20,
		startY + lineSpacing.NormalSpacing,
		220,
		startY + lineSpacing.NormalSpacing
	);
	doc.line(
		380,
		startY + lineSpacing.NormalSpacing,
		580,
		startY + lineSpacing.NormalSpacing
	);

	doc.setFontSize(fontSizes.Head2TitleFontSize);

	doc.textAlign(
		"INVOICE",
		{ align: "center" },
		startX,
		(startY += lineSpacing.NormalSpacing + 2)
	);

	doc.setFontSize(fontSizes.NormalFontSize);

	//-------Agent Info Billing---------------------
	var startBilling = startY + 20;

	doc.textAlign(
		"AGENT : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(`${agent}`, { align: "left" }, 80, startY);

	doc.textAlign(
		`${address}`,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${city} `,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${state} - ${pin} `,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		"GSTIN  : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${gstin}`, { align: "left" }, 80, startY);

	// ------- Passenger details -----------

	var rightcol1 = 330;
	var rightcol2 = 410;
	startY = startBilling + 30;

	doc.textAlign(
		"Passenger Name - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${passname}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"Ship Name - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(`${shipname}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"Cabin / Suite - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${cabin} / ${suite}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"P A X - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${total_passenger}`, { align: "left" }, rightcol2, startY);

	// doc.line(
	// 	20,
	// 	(startY += lineSpacing.NormalSpacing),
	// 	560,
	// 	(startY += lineSpacing.NormalSpacing)
	// );

	var options = {
		margin: {
			top: 15,
		},
		showHead: "never",
		styles: {
			overflow: "linebreak",
			font: "helvetica",
			minCellHeight: "auto",
			cellWidth: "wrap",
			fontStyle: "normal",
			textColor: [0, 26, 51],
		},
		columnStyles: {
			0: { cellWidth: "auto", fontSize: 8 },
			1: { cellWidth: "auto", halign: "right", fontSize: 10 },
		},

		startY: (startY += 50),
	};

	var columns = [
		{ title: "", dataKey: "text" },
		{ title: "", dataKey: "Total" },
	];
	var rows = [
		{
			text: "CRUISE BASE FARE",
			Total: thFormat(total),
		},
		{
			text: "N C F ",
			Total: thFormat(ncf_amount),
		},
		{
			text: "TAX ",
			Total: thFormat(tax_amount),
		},
		{
			text: "GRATUITY ",
			Total: thFormat(gratuity_amount),
		},
		{
			text: "HOLIDAY SURCHARGE",
			Total: thFormat(hs_amount),
		},
		{
			text: "EXTRA CHARGES",
			Total: thFormat(misc_amount),
		},
		{
			text: `COMMISSION `,
			Total: thFormat(comm_amount),
		},
		{
			text: `T D S `,
			Total: thFormat(tds_amount),
		},
		{
			text: `ADVANCE / TOKEN  `,
			Total: thFormat(token_amount),
		},
		{
			text: `SUB TOTAL `,
			Total: thFormat(net_amount),
		},
	];

	doc.autoTable(columns, rows, options);

	doc.line(
		20,
		doc.previousAutoTable.finalY + 15,

		560,
		doc.previousAutoTable.finalY + 15
	);

	//-------Invoice Footer---------------------
	var rightcol1 = 240;
	var rightcol2 = 340;
	var rightcol3 = 440;

	startY = doc.previousAutoTable.finalY + 30;
	doc.setFontSize(fontSizes.NormalFontSize);

	doc.setFontType("bold");
	doc.textAlign(
		"Sub Total Amount - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${thFormat(net_amount)}`,
		{ align: "left" },
		rightcol3,
		startY
	);
	doc.setFontSize(fontSizes.NormalFontSize);
	doc.setFontType("bold");

	if (gst !== 0) {
		doc.textAlign(
			`GST Amount @ ${gst} %  `,
			{ align: "left" },
			rightcol1,
			(startY += lineSpacing.NormalSpacing)
		);
		doc.setFontType("normal");
		// var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
		doc.textAlign(
			`${thFormat(total_gst)}`,
			{ align: "left" },
			rightcol3,
			startY
		);
	}
	console.log(val15);
	if (val15 !== 0) {
		doc.textAlign(
			`CGST @ ${val15} %  `,
			{ align: "left" },
			rightcol1,
			(startY += lineSpacing.NormalSpacing)
		);

		doc.textAlign(`${cgst_amount}`, { align: "left" }, rightcol2, startY);
	}
	console.log(val17);
	if (val17 !== 0) {
		doc.textAlign(
			`SGST @ ${val17} %  `,
			{ align: "left" },
			rightcol1,
			(startY += lineSpacing.NormalSpacing)
		);

		doc.textAlign(`${sgst_amount}`, { align: "left" }, rightcol2, startY);
	}

	doc.setFontType("bold");
	doc.textAlign(
		`Total Amaount Payable in ${document.getElementById("currency").value} - `,
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		`${thFormat(gross_amount)}`,
		{ align: "right" },
		rightcol3,
		startY
	);

	if (val18 !== 0) {
		doc.textAlign(
			`Total Amaount Payable in INR - `,
			{ align: "left" },
			rightcol1,
			(startY += lineSpacing.NormalSpacing)
		);
		doc.textAlign(
			`${thFormat(gross_amount_inr)}`,
			{ align: "right" },
			rightcol3,
			startY
		);
	}

	doc.textAlign(
		"terms and conditions apply*",
		{ align: "center" },
		20,
		(startY += lineSpacing.NormalSpacing + 50)
	);
	doc.textAlign(
		"Payment in Indian Rupees at the prevalent rate of exchange via Cheque/Demand Draft/RTGS, should be payable to Carrot Cruises Shipping Pvt Ltd.",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 16)
	);
	doc.textAlign(
		"HDFC BANK (Carrot Cruise Shipping Pvt. Ltd )  A/C No - 50200024394736   IFSC/RTGS/NEFT Code : HDFC0001441",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 16)
	);
	doc.textAlign(
		"YES BANK (Carrot Cruise Shipping Pvt. Ltd)      A/C No. 059861900002113   IFSC Code : YESB0000598",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 16)
	);

	doc.save(`${InvoiceNumber}.pdf`);
}

document.getElementById("download").addEventListener("click", () => {
	generateInvoice();
});
