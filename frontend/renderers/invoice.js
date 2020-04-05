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
	total_gst,
	gross_amount,
	gross_amount_inr;

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

	var cgst_amount = (net_amount * parseFloat(val15)) / 100;
	var igst_amount = (net_amount * parseFloat(val16)) / 100;
	var sgst_amount = (net_amount * parseFloat(val17)) / 100;
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
	console.log(total);
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

	if (val18 === 0) {
		gross_amount_inr = parseFloat(gross_amount);
	} else {
		gross_amount_inr = parseFloat(gross_amount) * parseFloat(val18);
	}
}

$(document).ready(function () {
	generateInvoice();

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

	// Send Form Data to Server

	const isvalid = () => {
		let name = document.getElementById("name").value;
		let adults = document.getElementById("adults").value;
		let price_adults = document.getElementById("price_adults").value;
		let ship = document.getElementById("ship_name").value;
		let cruise = document.getElementById("cruise").value;

		if (
			name === "" ||
			adults === "" ||
			price_adults === "" ||
			ship === "" ||
			cruise === ""
		) {
			return false;
		} else {
			return true;
		}
	};

	let form = document.querySelector("form");

	form.addEventListener("submit", function (event) {
		console.log("object");
		event.preventDefault();
		if (isvalid) {
			var data = new FormData(form);
			ipcRenderer.send("add:invoice", {
				Invoice_Number: data.get("invoice_no"),
				Invoice_Date: new Date(data.get("invoice_date"))
					.toISOString()
					.slice(0, 10)
					.replace("T", " "),
				Departure_Date: new Date(data.get("departure_date"))
					.toISOString()
					.slice(0, 10)
					.replace("T", " "),
				Agent_Name: data.get("agent"),
				Cruise_Ship: data.get("ship_name"),
				Cruise: data.get("cruise"),
				Currency: data.get("currency"),
				Booking: data.get("bookings"),
				Cabin: data.get("cabin"),
				Cat_Bkg: data.get("cat_bkg"),
				Pass_Name: data.get("name"),
				Nationality: data.get("nationality"),
				Adults: data.get("adults"),
				Children: data.get("children"),
				Infants: data.get("infants"),
				Adults_Rate: data.get("price_adults"),
				Children_Rate: data.get("price_children"),
				Infants_Rate: data.get("price_infants"),
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
				EntryDate: new Date(data.get("invoice_date"))
					.toISOString()
					.slice(0, 10)
					.replace("T", " "),
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
	console.log(data);
	var Options = "";
	data.map(function (element, i) {
		Options =
			Options + `<option value='${element.id}'>${element.first_name}</option>`;
	});

	$(".agentName").append(Options);
	$(".agentName").formSelect();
});

function generateInvoice() {
	var abc = "00123";
	var s = Number(abc) + 1;
	var zerofilled = ("00000" + s).slice(-5);
	var inv = `CC${new Date().getFullYear()}${new Date().getMonth()}-${zerofilled}`;
	console.log(inv);
	document.getElementById("invoice_no").value = inv;
}

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
