const electron = require("electron");
const { ipcRenderer } = electron;
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;

let addWindow;
const texts = require("electron").remote.getGlobal("sharedObject").someProperty;

document.getElementById("abc").value = texts;

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

// function createCustomerWindow() {
// 	const modalPath = path.join("file://", __dirname, "customer.html");

// 	customerWindow = new BrowserWindow({
// 		resizable: false,
// 		height: 1000,
// 		width: 900,
// 		frame: false,
// 		title: "Add Customer",
// 		parent: electron.remote.getCurrentWindow(),
// 		modal: true,
// 		webPreferences: {
// 			nodeIntegration: true
// 		}
// 	});

// 	customerWindow.webContents.openDevTools();

// 	customerWindow.loadURL(modalPath);
// 	customerWindow.show();

// 	customerWindow.on("close", () => {
// 		customerWindow = null;
// 	});
// }

const button = document.getElementById("newUser");
button.addEventListener("click", event => {
	createaddWindow();
});

const custButton = document.getElementById("newCustomer");
custButton.addEventListener("click", event => {
	ipcRenderer.send("create:customerwindow", "customer");
});

const invButton = document.getElementById("newInvoice");
invButton.addEventListener("click", event => {
	ipcRenderer.send("create:invoiceWindow", "invoice");
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

// ipcRenderer.on("fetchUsers", (event, data) => {
// 	document.getElementById("search").addEventListener("click", event => {
// 		$("#table").empty();

// 		var codeBlock = `<table id="example" class="display responsive-table datatable-example">
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Position</th>
//                 <th>Office</th>
//                 <th>Extn.</th>
//                 <th>Start date</th>
//                 <th>Salary</th>
//             </tr>
//         </thead>

// 	</table>`;

// 		document.getElementById("table").innerHTML = codeBlock;

// 		data.map((element, index) => {
// 			tbody = document.createElement("tbody");
// 			document.getElementById("example").appendChild(tbody);
// 			tr = document.createElement("tr");
// 			tbody.appendChild(tr);
// 			var td = document.createElement("td");
// 			var td1 = document.createElement("td");
// 			var td2 = document.createElement("td");

// 			td.appendChild(document.createTextNode(element.first_name));
// 			td1.appendChild(document.createTextNode(element.last_name));
// 			td2.appendChild(document.createTextNode(element.email));
// 			tr.appendChild(td);
// 			tr.appendChild(td1);
// 			tr.appendChild(td2);
// 		});

// 		$("#example").DataTable({
// 			language: {
// 				searchPlaceholder: "Search records",
// 				sSearch: "",
// 				sLengthMenu: "Show _MENU_",
// 				sLength: "dataTables_length",
// 				oPaginate: {
// 					sFirst: '<i class="material-icons">chevron_left</i>',
// 					sPrevious: '<i class="material-icons">chevron_left</i>',
// 					sNext: '<i class="material-icons">chevron_right</i>',
// 					sLast: '<i class="material-icons">chevron_right</i>'
// 				}
// 			}
// 		});
// 		$(".dataTables_length select").addClass("browser-default");
// 	});
// });

document.getElementById("newWin").addEventListener("click", () => {
	ipcRenderer.send("create:window", "newWindow");
});

ipcRenderer.on("fetchCustomers", (event, data) => {
	document.getElementById("getCustomers").addEventListener("click", event => {
		let rowIndex;
		var codeBlock = ` <table id="example" class="display responsive-table datatable-example">
        <thead>
			<tr>
			<th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Extn.</th>
                <th>Start date</th>
               
            </tr>
        </thead>
     
	`;

		document.getElementById("table").innerHTML = codeBlock;

		$("#example").dataTable({
			paging: true,
			sort: true,
			searching: true,
			language: {
				searchPlaceholder: "Search records",
				sSearch: ""
			},
			pageLength: 100,
			data: data,
			columns: [
				{ data: "id" },
				{ data: "email" },
				{ data: "last_name" },
				{ data: "email" },
				{ data: "mobile" },
				{ data: "phone" }
			],
			dom: "Bfrtip",
			select: true,

			buttons: [
				{
					text: "Edit selected Customer",
					action: function(e, dt, node, config) {
						ipcRenderer.send("customer:data", {
							customerData: data,
							index: rowIndex
						});
					},

					enabled: false
				}
			]
		});

		$("#example tbody").on("click", "tr", function() {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			} else {
				$("#example")
					.dataTable()
					.$("tr.selected")
					.removeClass("selected");
				$(this).addClass("selected");
			}

			console.log(
				$(this)
					.children(":first")
					.text()
			);
		});

		$("#example tbody").on("click", "tr", function() {
			rowIndex = $("#example")
				.DataTable()
				.row(this)
				.index();
			console.log(rowIndex);
			var selectedRows = $("tr.selected").length;
			$("#example")
				.DataTable()
				.button(0)
				.enable(selectedRows === 1);
		});

		// data.map((element, index) => {
		// 	tbody = document.createElement("tbody");
		// 	document.getElementById("example").appendChild(tbody);
		// 	tr = document.createElement("tr");
		// 	tbody.appendChild(tr);
		// 	var td = document.createElement("td");
		// 	var td1 = document.createElement("td");
		// 	var td2 = document.createElement("td");
		// 	var td3 = document.createElement("td");
		// 	var td4 = document.createElement("td");
		// 	var td5 = document.createElement("td");

		// 	td.appendChild(document.createTextNode(element.first_name));
		// 	td1.appendChild(document.createTextNode(element.last_name));
		// 	td2.appendChild(document.createTextNode(element.email));
		// 	td3.appendChild(document.createTextNode(element.first_name));
		// 	td4.appendChild(document.createTextNode(element.last_name));
		// 	td5.appendChild(document.createTextNode(element.email));
		// 	tr.appendChild(td);
		// 	tr.appendChild(td1);
		// 	tr.appendChild(td2);
		// 	tr.appendChild(td3);
		// 	tr.appendChild(td4);
		// 	tr.appendChild(td5);
		// });

		// $("#example").DataTable({
		// 	language: {
		// 		searchPlaceholder: "Search records",
		// 		sSearch: "",
		// 		sLengthMenu: "Show _MENU_",
		// 		sLength: "dataTables_length",
		// 		oPaginate: {
		// 			sFirst: '<i class="material-icons">chevron_left</i>',
		// 			sPrevious: '<i class="material-icons">chevron_left</i>',
		// 			sNext: '<i class="material-icons">chevron_right</i>',
		// 			sLast: '<i class="material-icons">chevron_right</i>'
		// 		}
		// 	}
		// });
		// $(".dataTables_length select").addClass("browser-default");
	});
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

// ipcRenderer.on("sendCustomerData", (event, data) => {
// 	console.log("Hello");
// });
