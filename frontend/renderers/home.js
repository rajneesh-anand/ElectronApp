const electron = require("electron");
const { ipcRenderer, remote } = electron;
const path = require("path");
const BrowserWindow = remote.BrowserWindow;
const axios = require("axios");

let addWindow;
let data = [];
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
			nodeIntegration: true,
		},
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

$(document).ready(function () {
	axios
		.get(`http://localhost:3000/api/getinvoices`)
		.then((response) => {
			console.log(response.data.data);
			const invData = response.data.data;
			return (data = [...invData]);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
});

const button = document.getElementById("newUser");
button.addEventListener("click", (event) => {
	createaddWindow();
});

const custButton = document.getElementById("newCustomer");
custButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:customerwindow", "customer");
});

const invButton = document.getElementById("newInvoice");
invButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:invoiceWindow", "invoice");
});

const payButton = document.getElementById("payment");
payButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:paymentWindow", "payment_account");
});

const accButton = document.getElementById("account");
accButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:accountWindow", "account");
});

const recButton = document.getElementById("receipt");
recButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:receiptWindow", "receive_account");
});

const invListButton = document.getElementById("invList");
invListButton.addEventListener("click", (event) => {
	generateInvoiceDataTable();
});

function generateInvoiceDataTable() {
	let rowIndex;
	var codeBlock = ` 
	<thead>
		<tr>
		<th>ID</th>
			<th>INVOICE NO.</th>
			<th>INVOICE DATE</th>
			<th>AGENT NAME</th>
			<th>BILL AMOUNT</th>	   
		</tr>
	</thead> 
`;
	document.getElementById("invTable").innerHTML = codeBlock;

	$("#invTable").dataTable({
		paging: true,
		sort: true,
		searching: true,
		language: {
			searchPlaceholder: "Search records",
			sSearch: "",
		},
		pageLength: 100,
		data: data,
		columnDefs: [
			{
				render: function (data, type, row) {
					return new Date(data).toLocaleDateString();
				},
				targets: 2,
			},
		],
		columns: [
			{ data: "Invoice_Id" },
			{ data: "Invoice_Number" },
			{ data: "Invoice_Date" },
			{ data: "Agent_Name" },
			{ data: "Total_Payable_Amt" },
		],
		dom: "Bfrtip",
		select: true,

		buttons: [
			{
				text: "Edit Selected Invoice",
				action: function (e, dt, node, config) {
					ipcRenderer.send("customer:data", {
						customerData: data,
						index: rowIndex,
					});
				},

				enabled: false,
			},
		],
	});

	//------------- Table row selection condition ------

	$("#invTable tbody").on("click", "tr", function () {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$("#invTable").dataTable().$("tr.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#invTable tbody").on("click", "tr", function () {
		rowIndex = $("#invTable").DataTable().row(this).index();
		console.log(rowIndex);
		var selectedRows = $("tr.selected").length;
		$("#invTable")
			.DataTable()
			.button(0)
			.enable(selectedRows === 1);
	});
}

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

// document.getElementById("newWin").addEventListener("click", () => {
// 	ipcRenderer.send("create:window", "newWindow");
// });

ipcRenderer.on("fetchCustomers", (event, data) => {
	document.getElementById("getCustomers").addEventListener("click", (event) => {
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
				sSearch: "",
			},
			pageLength: 100,
			data: data,
			columns: [
				{ data: "id" },
				{ data: "email" },
				{ data: "last_name" },
				{ data: "email" },
				{ data: "mobile" },
				{ data: "phone" },
			],
			dom: "Bfrtip",
			select: true,

			buttons: [
				{
					text: "Edit selected Customer",
					action: function (e, dt, node, config) {
						ipcRenderer.send("customer:data", {
							customerData: data,
							index: rowIndex,
						});
					},

					enabled: false,
				},
			],
		});

		$("#example tbody").on("click", "tr", function () {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			} else {
				$("#example").dataTable().$("tr.selected").removeClass("selected");
				$(this).addClass("selected");
			}

			console.log($(this).children(":first").text());
		});

		$("#example tbody").on("click", "tr", function () {
			rowIndex = $("#example").DataTable().row(this).index();
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
