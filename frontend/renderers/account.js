const { ipcRenderer, remote } = require("electron");
const axios = require("axios");

let accountData = {};

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

$(document).ready(function () {
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

	const isvalid = () => {
		let accountName = document.getElementById("account").value;

		if (accountName === "") {
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
			accountData = {
				date: formattedDate(data.get("payment_date")),
				account_name: data.get("account"),
				remarks: data.get("comment"),
				opening_balance: data.get("amount"),
			};

			axios
				.post(`http://localhost:3000/api/account`, accountData, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					alert(response.data.message);
				})
				.catch((error) => {
					alert(error.response.data.message);
				});
		}
	});
});

function formattedDate(dateValue) {
	const event = new Date(dateValue);
	const year = event.getFullYear();
	const month = event.getMonth() + 1;
	const getdate = event.getDate();
	return `${year}-${month}-${getdate}`;
}
