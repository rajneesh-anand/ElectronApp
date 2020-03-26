const electron = require("electron");

const remote = electron.remote;

const clsBtn = document.getElementById("closeBtn");

clsBtn.addEventListener("click", event => {
	const window = remote.getCurrentWindow();
	console.log(window);

	window.close();
});
