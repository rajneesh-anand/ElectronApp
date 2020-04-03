const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

function ValidateNumbers(e) {
	document.oncontextmenu = function() {
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

$(document).ready(function() {
	M.updateTextFields();
	$("select").formSelect();

	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", event => {
		const window = remote.getCurrentWindow();
		window.hide();
	});

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

	form.addEventListener("submit", function(event) {
		event.preventDefault();
		if (isvalid) {
			var data = new FormData(form);
			ipcRenderer.send("update:customer", {
				id: data.get("id"),
				first_name: data.get("first_name"),
				last_name: data.get("last_name"),
				address_line_one: data.get("address_line_one"),
				address_line_two: data.get("address_line_two"),
				city: data.get("city"),
				pincode: data.get("pincode"),
				state: data.get("state"),
				phone: data.get("phone"),
				mobile: data.get("mobile"),
				gstin: data.get("gstin"),
				email: data.get("email")
			});
		}
	});
});

ipcRenderer.on("sendCustomerData", (event, data) => {
	document.getElementById("id").value = data.id;
	document.getElementById("first_name").value = data.first_name;
	document.getElementById("last_name").value = data.last_name;
	document.getElementById("address_line_one").value = data.address_line_one;
	document.getElementById("address_line_two").value = data.address_line_two;
	document.getElementById("city").value = data.city;
	document.getElementById("pincode").value = data.pincode;
	document.getElementById("mobile").value = data.mobile;
	document.getElementById("phone").value = data.phone;
	document.getElementById("email").value = data.email;
	document.getElementById("gstin").value = data.gstin;
	const selectedCategory = document.querySelector("#state");
	const materializeSelectedCategory = M.FormSelect.init(selectedCategory);

	selectedCategory.value = data.state;
	if (typeof Event === "function") {
		var event = new Event("change");
	} else {
		var event = document.createEvent("Event");
		event.initEvent("change", true, true);
	}
	selectedCategory.dispatchEvent(event);
});

ipcRenderer.on("customer:updated", (event, args) => {
	alert(args);
});
