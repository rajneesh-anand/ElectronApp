// const { remote, ipcRenderer, BrowserWindow } = require("electron");
const electron = require("electron");
const { ipcRenderer } = electron;
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;

let addWindow;

function createaddWindow() {
	const modalPath = path.join("file://", __dirname, "user.html");
	// const { height, width } = electron.screen.getAllDisplays.workAreaSize;
	// console.log(height + "--" + width);

	addWindow = new BrowserWindow({
		resizable: false,
		height: 800,
		width: 1000,
		frame: false,
		title: "Add User",
		parent: electron.remote.getCurrentWindow(),
		modal: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	// addWindow.webContents.openDevTools();

	addWindow.loadURL(modalPath);
	addWindow.show();

	addWindow.on("close", () => {
		addWindow = null;
	});
}

const button = document.getElementById("fetchData");
button.addEventListener("click", event => {
	createaddWindow();
});

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

// const webContents = remote.getCurrentWebContents();

// webContents.on("dom-ready", () => {
// 	document.getElementById("fetchUsers").onclick = () => {
// 		axios
// 			.get("http://localhost:3000/api/users")
// 			.then(response => {
// 				const messageJumbotron = document.getElementById("name");
// 				messageJumbotron.innerText = response.data.data.first_name;
// 				messageJumbotron.style.display = "block";
// 			})
// 			.catch(error => {
// 				if (error) throw new Error(error);
// 			});
// 	};
// });
