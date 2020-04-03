const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

$(document).ready(function() {
	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", event => {
		const window = remote.getCurrentWindow();
		window.close();
	});

	$(".datepicker").datepicker();
});
