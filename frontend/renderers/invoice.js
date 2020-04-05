const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

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

// Calculations

function GetTotal(obj) {
	var val1 =
		document.getElementById("adults").value === ""
			? 0
			: document.getElementById("adults").value;
	var val2 =
		document.getElementById("children").value === ""
			? 0
			: document.getElementById("children").value;
	var val3 =
		document.getElementById("infants").value === ""
			? 0
			: document.getElementById("infants").value;
	var val4 =
		document.getElementById("price_adults").value === ""
			? 0
			: document.getElementById("price_adults").value;
	var val5 =
		document.getElementById("price_children").value === ""
			? 0
			: document.getElementById("price_children").value;
	var val6 =
		document.getElementById("price_infants").value === ""
			? 0
			: document.getElementById("price_infants").value;
	var val7 =
		document.getElementById("comm").value === ""
			? 0
			: document.getElementById("comm").value;
	var val8 =
		document.getElementById("ncf").value === ""
			? 0
			: document.getElementById("ncf").value;
	var val9 =
		document.getElementById("tax").value === ""
			? 0
			: document.getElementById("tax").value;
	var val10 =
		document.getElementById("gratuity").value === ""
			? 0
			: document.getElementById("gratuity").value;
	var val11 =
		document.getElementById("holiday").value === ""
			? 0
			: document.getElementById("holiday").value;
	var val12 =
		document.getElementById("misc").value === ""
			? 0
			: document.getElementById("misc").value;
	var val13 =
		document.getElementById("tds").value === ""
			? 0
			: document.getElementById("tds").value;
	var val14 =
		document.getElementById("token").value === ""
			? 0
			: document.getElementById("token").value;
	var val15 =
		document.getElementById("cgst").value === ""
			? 0
			: document.getElementById("cgst").value;
	var val16 =
		document.getElementById("igst").value === ""
			? 0
			: document.getElementById("igst").value;
	var val17 =
		document.getElementById("sgst").value === ""
			? 0
			: document.getElementById("sgst").value;

	var total_passenger = parseInt(val1) + parseInt(val2) + parseInt(val3);

	var amount_one = parseInt(val1) * parseFloat(val4);
	var amount_two = parseInt(val2) * parseFloat(val5);
	var amount_three = parseInt(val3) * parseFloat(val6);

	var total =
		parseFloat(amount_one) + parseFloat(amount_two) + parseFloat(amount_three);

	var comm_amount = (total * parseFloat(val7)) / 100;

	var base_amount = parseFloat(total) - parseFloat(comm_amount);

	var ncf_amount = parseInt(total_passenger) * parseFloat(val8);
	var tax_amount = parseInt(total_passenger) * parseFloat(val9);
	var gratuity_amount = parseInt(total_passenger) * parseFloat(val10);
	var hs_amount = parseInt(total_passenger) * parseFloat(val11);
	var misc_amount = parseFloat(val12);
	var tds_amount = (comm_amount * parseFloat(val13)) / 100;
	var token_amount = parseFloat(val14);

	var net_amount =
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
	var total_gst =
		parseFloat(cgst_amount) + parseFloat(igst_amount) + parseFloat(sgst_amount);
	var gross_amount;

	$("#gst-switch").on("change", function () {
		var gstSwitchStatus = false;
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
}

// Send Form Data to Server

const isvalid = () => {
	let firstName = document.getElementById("first_name").value;
	let lastName = document.getElementById("last_name").value;
	let gstin = document.getElementById("gstin").value;
	let city = document.getElementById("city").value;
	let pincode = document.getElementById("pincode").value;

	if (
		firstName === "" ||
		lastName === "" ||
		gstin === "" ||
		city === "" ||
		pincode === ""
	) {
		return false;
	} else {
		return true;
	}
};

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	if (isvalid) {
		var data = new FormData(form);
		ipcRenderer.send("add:invoice", {
			Invoice_Number: data.get("invoice_no"),
			Invoice_Date: data.get("invoice_date"),
			Departure_Date: data.get("invoice_date"),
			Agent_Name: data.get("invoice_date"),
			Cruise_Ship: data.get("invoice_date"),
			Cruise: data.get("invoice_date"),
			Currency: data.get("invoice_date"),
			Booking: data.get("invoice_date"),
			Cabin: data.get("invoice_date"),
			Cat_Bkg: data.get("invoice_date"),
			Pass_Name: data.get("invoice_date"),
			Nationality: data.get("invoice_date"),
			Adults: data.get("invoice_date"),
			Children: data.get("invoice_date"),
			Infants: data.get("invoice_date"),
			Adults_Rate: data.get("invoice_date"),
			Children_Rate: data.get("invoice_date"),
			Infants_Amt: data.get("invoice_date"),
			Comm_Rate: data.get("invoice_date"),
			Comm_Amt: data.get("invoice_date"),
			NCF: data.get("invoice_date"),
			NCF_Amt: data.get("invoice_date"),
			TAX: data.get("invoice_date"),
			TAX_Amt: data.get("invoice_date"),
			HS: data.get("invoice_date"),
			HS_Amt: data.get("invoice_date"),
			Misc: data.get("invoice_date"),
			TDS: data.get("invoice_date"),
			TDS_Amt: data.get("invoice_date"),
			Token_Amt: data.get("invoice_date"),
			CGST: data.get("invoice_date"),
			IGST: data.get("invoice_date"),
			SGST: data.get("invoice_date"),
			GST_Amt: data.get("invoice_date"),
			ROE: data.get("invoice_date"),
			Base_Amt: data.get("invoice_date"),
			Total_Payable_Amt: data.get("invoice_date"),
			Total_Payable_Amt_INR: data.get("invoice_date"),
			Token: data.get("invoice_date"),
			GST: data.get("invoice_date"),
			PAX: data.get("invoice_date"),
		});
	}
});
