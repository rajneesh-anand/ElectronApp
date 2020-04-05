// function ValidateNumbers(e) {
// 	document.oncontextmenu = function () {
// 		return false;
// 	};
// 	var key = document.all ? e.keyCode : e.which;
// 	if (key == 8) return true;
// 	patron = /\d/;
// 	te = String.fromCharCode(key);
// 	return patron.test(te);
// }

// function isNumberKey(evt, obj) {
// 	var charCode = evt.which ? evt.which : event.keyCode;
// 	var value = obj.value;
// 	var dotcontains = value.indexOf(".") != -1;
// 	if (dotcontains) if (charCode == 46) return false;
// 	if (charCode == 46) return true;
// 	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
// 	return true;
// }

// function GetTotal(obj) {
// 	var val1 =
// 		document.getElementById("adults").value === ""
// 			? 0
// 			: document.getElementById("adults").value;
// 	var val2 =
// 		document.getElementById("children").value === ""
// 			? 0
// 			: document.getElementById("children").value;
// 	var val3 =
// 		document.getElementById("infants").value === ""
// 			? 0
// 			: document.getElementById("infants").value;
// 	var val4 =
// 		document.getElementById("price_adults").value === ""
// 			? 0
// 			: document.getElementById("price_adults").value;
// 	var val5 =
// 		document.getElementById("price_children").value === ""
// 			? 0
// 			: document.getElementById("price_children").value;
// 	var val6 =
// 		document.getElementById("price_infants").value === ""
// 			? 0
// 			: document.getElementById("price_infants").value;
// 	var val7 =
// 		document.getElementById("comm").value === ""
// 			? 0
// 			: document.getElementById("comm").value;
// 	var val8 =
// 		document.getElementById("ncf").value === ""
// 			? 0
// 			: document.getElementById("ncf").value;
// 	var val9 =
// 		document.getElementById("tax").value === ""
// 			? 0
// 			: document.getElementById("tax").value;
// 	var val10 =
// 		document.getElementById("gratuity").value === ""
// 			? 0
// 			: document.getElementById("gratuity").value;
// 	var val11 =
// 		document.getElementById("holiday").value === ""
// 			? 0
// 			: document.getElementById("holiday").value;
// 	var val12 =
// 		document.getElementById("misc").value === ""
// 			? 0
// 			: document.getElementById("misc").value;
// 	var val13 =
// 		document.getElementById("tds").value === ""
// 			? 0
// 			: document.getElementById("tds").value;
// 	var val14 =
// 		document.getElementById("token").value === ""
// 			? 0
// 			: document.getElementById("token").value;
// 	var val15 =
// 		document.getElementById("cgst").value === ""
// 			? 0
// 			: document.getElementById("cgst").value;
// 	var val16 =
// 		document.getElementById("igst").value === ""
// 			? 0
// 			: document.getElementById("igst").value;
// 	var val17 =
// 		document.getElementById("sgst").value === ""
// 			? 0
// 			: document.getElementById("sgst").value;

// 	var total_passenger = parseInt(val1) + parseInt(val2) + parseInt(val3);

// 	var amount_one = parseInt(val1) * parseFloat(val4);
// 	var amount_two = parseInt(val2) * parseFloat(val5);
// 	var amount_three = parseInt(val3) * parseFloat(val6);

// 	var total =
// 		parseFloat(amount_one) + parseFloat(amount_two) + parseFloat(amount_three);

// 	var comm_amount = (total * parseFloat(val7)) / 100;

// 	var base_amount = parseFloat(total) - parseFloat(comm_amount);

// 	var ncf_amount = parseInt(total_passenger) * parseFloat(val8);
// 	var tax_amount = parseInt(total_passenger) * parseFloat(val9);
// 	var gratuity_amount = parseInt(total_passenger) * parseFloat(val10);
// 	var hs_amount = parseInt(total_passenger) * parseFloat(val11);
// 	var misc_amount = parseFloat(val12);
// 	var tds_amount = (comm_amount * parseFloat(val13)) / 100;
// 	var token_amount = parseFloat(val14);

// 	var net_amount =
// 		parseFloat(base_amount) +
// 		parseFloat(ncf_amount) +
// 		parseFloat(tax_amount) +
// 		parseFloat(gratuity_amount) +
// 		parseFloat(hs_amount) +
// 		parseFloat(misc_amount) +
// 		parseFloat(tds_amount);

// 	var cgst_amount = (net_amount * parseFloat(val15)) / 100;
// 	var igst_amount = (net_amount * parseFloat(val16)) / 100;
// 	var sgst_amount = (net_amount * parseFloat(val17)) / 100;
// 	var total_gst =
// 		parseFloat(cgst_amount) + parseFloat(igst_amount) + parseFloat(sgst_amount);
// 	var gross_amount;

// 	$("#gst-switch").on("change", function() {
// 		var gstSwitchStatus = false;
// 		if ($(this).is(":checked")) {
// 			gstSwitchStatus = $(this).is(":checked");
// 			gross_amount = parseFloat(net_amount) - parseFloat(total_gst);
// 			document.getElementById("total").innerHTML = parseFloat(
// 				gross_amount
// 			).toFixed(2);
// 		} else {
// 			gstSwitchStatus = $(this).is(":checked");
// 			gross_amount = parseFloat(net_amount) + parseFloat(total_gst);
// 			document.getElementById("total").innerHTML = parseFloat(
// 				gross_amount
// 			).toFixed(2);
// 		}
// 	});

// 	if ($("#gst-switch").is(":checked")) {
// 		gross_amount = parseFloat(net_amount) - parseFloat(total_gst);
// 		document.getElementById("total").innerHTML = parseFloat(
// 			gross_amount
// 		).toFixed(2);
// 	} else {
// 		gross_amount = parseFloat(net_amount) + parseFloat(total_gst);
// 		document.getElementById("total").innerHTML = parseFloat(
// 			gross_amount
// 		).toFixed(2);
// 	}

// 	document.getElementById("base_amt").innerHTML = parseFloat(total).toFixed(2);
// 	console.log(total);
// 	document.getElementById("comm_amt").innerHTML = parseFloat(
// 		comm_amount
// 	).toFixed(2);

// 	document.getElementById("ncf_amt").innerHTML = parseFloat(ncf_amount).toFixed(
// 		2
// 	);
// 	document.getElementById("tax_amt").innerHTML = parseFloat(tax_amount).toFixed(
// 		2
// 	);

// 	document.getElementById("hs_amt").innerHTML = parseFloat(hs_amount).toFixed(
// 		2
// 	);
// 	document.getElementById("gt_amt").innerHTML = parseFloat(
// 		gratuity_amount
// 	).toFixed(2);
// 	document.getElementById("tds_amt").innerHTML = parseFloat(tds_amount).toFixed(
// 		2
// 	);
// 	document.getElementById("gst_amt").innerHTML = parseFloat(total_gst).toFixed(
// 		2
// 	);
// }
