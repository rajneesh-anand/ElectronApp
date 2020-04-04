const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

$(document).ready(function() {
	generateInvoice();
	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", event => {
		const window = remote.getCurrentWindow();
		window.close();
	});

	$(".datepicker").datepicker({
		defaultDate: new Date(),
		autoClose: true,
		format: "dd mmm yyyy",
		setDefaultDate: true
	});
});

ipcRenderer.on("fetchCustomers", (event, data) => {
	console.log(data);
	var Options = "";
	data.map(function(element, i) {
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
