const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;
const btnClose = document.getElementById("btnClose");

btnClose.addEventListener("click", event => {
	const window = remote.getCurrentWindow();
	window.close();
});

let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
	event.preventDefault();
	var data = new FormData(form);
	data.append("first_name", "first_name");
	data.append("last_name", "last_name");
	data.append("gender", "male");
	data.append("mobile", "8989999");
	data.append("password", "1234@qwerty");
	data.append("email", "qwerty@test.com");

	ipcRenderer.send("add:user", {
		first_name: "first_name",
		last_name: "last_name",
		gender: "male",
		mobile: "8989999",
		password: "1234@qwerty",
		email: "qwerty@test.com"
	});
});

ipcRenderer.on("user:added", (event, args) => {
	alert(args);
});
