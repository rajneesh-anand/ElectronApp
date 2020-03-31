const electron = require("electron");
const { ipcRenderer } = electron;
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;

let addWindow;

function createaddWindow() {
	const modalPath = path.join("file://", __dirname, "user.html");

	addWindow = new BrowserWindow({
		resizable: false,
		height: 600,
		width: 800,
		frame: false,
		title: "Add User",
		parent: electron.remote.getCurrentWindow(),
		modal: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	addWindow.webContents.openDevTools();

	addWindow.loadURL(modalPath);
	addWindow.show();

	addWindow.on("close", () => {
		addWindow = null;
	});
}

const button = document.getElementById("newUser");
button.addEventListener("click", event => {
	createaddWindow();
});

//addWindow.webContents.openDevTools();

//const server = require("../../backend/app");
// const authService = remote.require("./services/auth-service");
// const authProcess = remote.require("./main/auth-process");

// axios.get(`http://localhost:3000/api/users`).then(response => {
// 	console.log(response.data.data);
// });

// const userData = async () => {
// 	return await axios
// 		.get(`http://localhost:3000/api/users`)
// 		.then(Response => {
// 			console.log(Response.data.data);
// 			return Response.data.data;
// 		})
// 		.catch(error => {
// 			if (error) throw new Error(error);
// 		});
// };

// userData().then(data => {
// 	const list = document.querySelector(".my-list");

// 	data.map((element, index) => {
// 		let li = document.createElement("li");
// 		list.appendChild(li);
// 		li.innerHTML += element;
// 	});
// });
// console.log(users);

ipcRenderer.on("fetchUsers", (event, data) => {
	document.getElementById("search").addEventListener("click", event => {
		const list = document.querySelector(".my-list");

		data.map((element, index) => {
			tbody = document.createElement("tbody");
			document.getElementById("table0").appendChild(tbody);
			tr = document.createElement("tr");
			tbody.appendChild(tr);
			var td = document.createElement("td");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");

			td.appendChild(document.createTextNode(element.first_name));
			td1.appendChild(document.createTextNode(element.last_name));
			td2.appendChild(document.createTextNode(element.email));
			tr.appendChild(td);
			tr.appendChild(td1);
			tr.appendChild(td2);

			// let li = document.createElement("li");
			// list.appendChild(li);
			// li.innerHTML += element.first_name;
		});
	});
});

ipcRenderer.on("weather:data", (event, data) => {
	console.log(data);

	const temp = document.getElementById("live-temp");
	const Mintemp = document.getElementById("temp-min");
	const Maxtemp = document.getElementById("temp-max");
	temp.innerHTML = data.temp;
	Mintemp.innerHTML = data.temp_min;
	Maxtemp.innerHTML = data.temp_max;
});

// ipcRenderer.on("flight:data", (event, data) => {
// 	data.map((element, index) => {
// 		console.log(element.offerItems);
// 	});
// 	let output = document.getElementById("flight");
// 	let template = `<div class="col s12 m6">
// 	<div class="card blue-grey darken-1">
// 		<div class="card-content white-text">
// 			<span class="card-title">Today's Weather</span>
// 			<div id="current-time"></div>
// 			<h1 id="live-temp"></h1>
// 			<h1 id="temp-min"></h1>
// 			<h1 id="temp-max"></h1>
// 		</div>
// 		<div class="card-action">
// 			<a href="#">This is a link</a>
// 			<a href="#">This is a link</a>
// 		</div>
// 	</div>
// </div>`;
// 	output.innerHTML = template;
// });
