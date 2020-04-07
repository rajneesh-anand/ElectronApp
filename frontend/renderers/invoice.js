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
	val7 =
		document.getElementById("comm").value === ""
			? 0
			: document.getElementById("comm").value;
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
	val15 =
		document.getElementById("cgst").value === ""
			? 0
			: document.getElementById("cgst").value;
	val16 =
		document.getElementById("igst").value === ""
			? 0
			: document.getElementById("igst").value;
	val17 =
		document.getElementById("sgst").value === ""
			? 0
			: document.getElementById("sgst").value;
	val18 =
		document.getElementById("roe").value === ""
			? 0
			: document.getElementById("roe").value;

	total_passenger = parseInt(val1) + parseInt(val2) + parseInt(val3);

	var amount_one = parseInt(val1) * parseFloat(val4);
	var amount_two = parseInt(val2) * parseFloat(val5);
	var amount_three = parseInt(val3) * parseFloat(val6);

	total =
		parseFloat(amount_one) + parseFloat(amount_two) + parseFloat(amount_three);

	comm_amount = (total * parseFloat(val7)) / 100;

	base_amount = parseFloat(total) - parseFloat(comm_amount);

	ncf_amount = parseInt(total_passenger) * parseFloat(val8);
	tax_amount = parseInt(total_passenger) * parseFloat(val9);
	gratuity_amount = parseInt(total_passenger) * parseFloat(val10);
	hs_amount = parseInt(total_passenger) * parseFloat(val11);
	misc_amount = parseFloat(val12);
	tds_amount = (comm_amount * parseFloat(val13)) / 100;
	token_amount = parseFloat(val14);

	net_amount =
		parseFloat(base_amount) +
		parseFloat(ncf_amount) +
		parseFloat(tax_amount) +
		parseFloat(gratuity_amount) +
		parseFloat(hs_amount) +
		parseFloat(misc_amount) +
		parseFloat(tds_amount);

	cgst_amount = (net_amount * parseFloat(val15)) / 100;
	igst_amount = (net_amount * parseFloat(val16)) / 100;
	sgst_amount = (net_amount * parseFloat(val17)) / 100;
	total_gst =
		parseFloat(cgst_amount) + parseFloat(igst_amount) + parseFloat(sgst_amount);

	if ($("#gst-switch").is(":checked")) {
		gross_amount = parseFloat(net_amount) - parseFloat(total_gst);
		document.getElementById("total").innerHTML = parseFloat(
			gross_amount
		).toFixed(2);
	} else {
		gross_amount = parseFloat(net_amount) + parseFloat(total_gst);
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
		gross_amount_inr = parseFloat(gross_amount);
	} else {
		gross_amount_inr = parseFloat(gross_amount) * parseFloat(val18);
	}

	console.log(gross_amount_inr);
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

	var passname =
		document.getElementById("name").value === ""
			? ""
			: document.getElementById("name").value;
	var cabin =
		document.getElementById("cabin").value === ""
			? ""
			: document.getElementById("cabin").value;
	var suite =
		document.getElementById("cat_bkg").value === ""
			? ""
			: document.getElementById("cat_bkg").value;
	var ship =
		document.getElementById("ship_name").value === ""
			? ""
			: document.getElementById("ship_name").value;
	var saledate =
		document.getElementById("departure_date").value === ""
			? ""
			: document.getElementById("departure_date").value;
	var totalpass = total_passenger;
	var gstin = agentDetails.gstin;
	var base_fare = total.toFixed(2);
	var com = comm_amount.toFixed(2);
	var com_rate = val7;
	var tds = tds_amount.toFixed(2);
	var tds_rate =
		document.getElementById("tds").value === ""
			? ""
			: document.getElementById("tds").value;
	var ncf = ncf_amount.toFixed(2);
	var tax = tax_amount.toFixed(2);
	var hs = hs_amount.toFixed(2);
	var gratuity = gratuity_amount.toFixed(2);
	var misc = misc_amount.toFixed(2);
	var gst = parseFloat(val15) + parseFloat(val16) + parseFloat(val17);
	var cgst = document.getElementById("cgst").value === "" ? "" : "CGST";
	var sgst = document.getElementById("sgst").value === "" ? "" : "SGST";
	var cgst_rate =
		document.getElementById("cgst").value === ""
			? ""
			: document.getElementById("cgst").value;
	var sgst_rate =
		document.getElementById("sgst").value === ""
			? ""
			: document.getElementById("sgst").value;
	var cgst_amt = cgst_amount === 0 ? "" : cgst_amount.toFixed(2);
	var sgst_amt = sgst_amount === 0 ? "" : sgst_amount.toFixed(2);
	var totalgst = total_gst.toFixed(2);
	var token = token_amount;
	var roe =
		document.getElementById("roe").value === ""
			? ""
			: document.getElementById("roe").value;
	var total_pay = gross_amount.toFixed(2);
	var total_pay_inr = gross_amount_inr.toFixed(2);
	console.log(total_pay_inr);

	var imgData =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAAApCAYAAADZNK4tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDA5Nzk4NTcxRkUwMTFFQThFOUE4QTlFMzFEMzA2ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDA5Nzk4NTgxRkUwMTFFQThFOUE4QTlFMzFEMzA2ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMDk3OTg1NTFGRTAxMUVBOEU5QThBOUUzMUQzMDY4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMDk3OTg1NjFGRTAxMUVBOEU5QThBOUUzMUQzMDY4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqPdonoAAB9sSURBVHja7F0JkB1X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";

	var abct = "CARROT CRUISE SHIPPING PVT.LTD.";
	var textlength = doc.getTextWidth(abct);

	doc.addImage(imgData, "png", 10, 10, 60, 20);
	doc.setFontSize(12);
	doc.text(abct, width - textlength, 15);

	doc.text(10, 30, "");
	doc.setFontSize(10);
	doc.text(10, 40, "357, 3rd Floor , Vardhman City Center 2", {
		align: "right",
	});
	doc.text(10, 50, "Shakti Nagar Under Bridge , Delhi 110007");

	doc.setFontType("bold");
	doc.setFontSize(18);
	doc.setTextColor("#52575A");

	doc.autoTable({ html: "#invoice" });

	doc.autoTable({
		theme: "striped",
		styles: { font: "helvetica", fontSize: 12 },
		columnStyles: { 0: { halign: "left" }, 1: { halign: "left" } }, // Cells in first column centered and green
		margin: { top: 10 },
		head: [["", "", "Country"]],
		body: [
			["Cruise Base Fare ", "", base_fare],
			["N C F", "", ncf],
			["TAX ", "", tax],
			["Gratuity", "", gratuity],
			["Holiday Surcharge ", "", hs],
			["Misc.. Expense", "", misc],
			[`Commission at Base Fare @ ${com_rate}`, com_rate, com],
			["TDS applicable", tds_rate, tds],
			[`GST applicable @ ${gst} %`, "", totalgst],
			["", `${cgst} @ ${cgst_rate} %  ${cgst_amt}`, ""],
			["", `${sgst} @ ${sgst_rate} %  ${sgst_amt}`, ""],
			["Token/Advance", "", token_amount],
			["Rate of Exachange", "", roe],
			["Amount Payable", "", total_pay],
			["Amount Payable in INR", "", total_pay_inr],
		],
	});

	doc.save(`${InvoiceNumber}.pdf`);
}

document.getElementById("download").addEventListener("click", () => {
	generateInvoice();
});
