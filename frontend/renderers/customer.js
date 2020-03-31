const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

$(document).ready(function() {
	$("select").formSelect();

	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", event => {
		const window = remote.getCurrentWindow();
		window.close();
	});

	let form = document.querySelector("form");

	form.addEventListener("submit", function(event) {
		event.preventDefault();
		var data = new FormData(form);
		console.log(data.get("email"));
		// data.append("first_name", "first_name");
		// data.append("last_name", "last_name");
		// data.append("gender", "male");
		// data.append("mobile", "8989999");
		// data.append("password", "1234@qwerty");
		// data.append("email", "qwerty@test.com");

		ipcRenderer.send("add:customer", {
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

		// ipcRenderer.send("add:customer", data);
	});
});

ipcRenderer.on("customer:added", (event, args) => {
	alert(args);
});
