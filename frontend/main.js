const path = require("path");
const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, screen } = electron;
const shell = require("electron").shell;
const url = require("url");

const server = require("../backend/app");
const axios = require("axios");
require("electron-reload")(__dirname);

let mainWindow;
let customerWindow;
global.sharedObject = {
	someProperty: "",
};

const isWindows = process.platform === "win32";

async function getWeatherData() {
	await axios
		.get(
			`http://api.openweathermap.org/data/2.5/weather?q=delhi,IN&APPID=1e2e7f5d7c3e08e9dc1b2504463f9d59`
		)
		.then((response) => {
			console.log(response.data.main);

			global.sharedObject.someProperty = `${response.data.main.temp}`;
		});
}

function createWindow() {
	const display = electron.screen.getPrimaryDisplay();
	const maxiSize = display.workAreaSize;

	mainWindow = new BrowserWindow({
		resizable: false,
		height: maxiSize.height,
		width: maxiSize.width,
		// frame: isWindows ? false : true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "renderers/index.html"),
			protocol: "file:",
			slashes: true,
		})
	);
	// Open DevTools - Remove for PRODUCTION!
	mainWindow.webContents.openDevTools();
	// Listen for window being closed
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
	getWeatherData();
}
// Fetching Users records --
const userData = async () => {
	return await axios
		.get(`http://localhost:3000/api/users`)
		.then((Response) => {
			// console.log(Response.data.data);
			return Response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

userData().then((data) => {
	mainWindow.webContents.on("did-finish-load", (event) => {
		mainWindow.webContents.send("fetchUsers", data);
	});
});

// Fetching Customers records --

const customerData = async () => {
	return await axios
		.get(`http://localhost:3000/api/customers`)
		.then((Response) => {
			return Response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

customerData().then((data) => {
	mainWindow.webContents.on("did-finish-load", (event) => {
		console.log(data);
		mainWindow.webContents.send("fetchCustomers", data);
	});
});

// Fetch Invoice Number

const getInvoiceNumber = async () => {
	return await axios
		.get(`http://localhost:3000/api/getinvoice`)
		.then((Response) => {
			return Response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

// Custom Menu - Menu Items
var menu = Menu.buildFromTemplate([
	{
		label: "Menu",
		submenu: [
			{
				label: "Home",
				click() {
					mainWindow.loadURL(
						url.format({
							pathname: path.join(__dirname, "renderers/index.html"),
							protocol: "file:",
							slashes: true,
						})
					);
				},
			},

			{
				label: "Adjust Notification Value",
				click() {
					mainWindow.loadURL("https://electron.atom.io");
				},
			},
			{
				label: "CoinMarketCap",
				click() {
					shell.openExternal("http://coinmarketcap.com");
				},
				accelerator: "CmdOrCtrl+Shift+C",
			},
			{ type: "separator" },
			{
				label: "Exit",
				click() {
					app.quit();
				},
			},
		],
	},
	{
		label: "Info",
	},
]);
Menu.setApplicationMenu(menu);

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
	if (mainWindow === null) createWindow();
});

ipcMain.on("add:user", async function (event, args) {
	await axios
		.post(
			`http://localhost:3000/api/signup`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("user:added", Response.data.message);
		})
		.catch((error) => {
			console.log(error);
		});
});

ipcMain.on("add:customer", async function (event, args) {
	console.log(args);
	await axios
		.post(
			`http://localhost:3000/api/customer`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("customer:added", Response.data.message);
		})
		.catch((error) => {
			event.reply("customer:added", error.response.data.message);
		});
});

ipcMain.on("update:customer", async function (event, args) {
	console.log(args);
	await axios
		.put(
			`http://localhost:3000/api/customer`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("customer:updated", Response.data.message);
		})
		.catch((error) => {
			event.reply("customer:updated", error.response.data.message);
		});
});

ipcMain.on("customer:data", function (event, args) {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const modalPath = path.join(
		`file://${__dirname}/renderers/customer_edit.html`
	);

	// const modalPath = path.join("file://", __dirname, "customer.html");

	customerWindow = new BrowserWindow({
		resizable: false,
		height: height,
		width: width * 0.9,
		frame: false,
		title: "Edit Customer",
		parent: mainWindow,
		show: false,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// customerWindow.webContents.openDevTools();

	customerWindow.loadURL(modalPath);

	const rowIndex = args.index;
	const data = args.customerData[rowIndex];

	customerWindow.once("ready-to-show", () => {
		customerWindow.show();
	});

	customerWindow.webContents.once("dom-ready", () => {
		customerWindow.webContents.send("sendCustomerData", data);
	});

	customerWindow.on("closed", () => {
		customerWindow = null;
	});

	// customerWindow.webContents.send("sendCustomerData", args);

	// event.reply("sendCustomerData", args);
});

// ipcMain.on("close:window", (event, args) => {
// 	args.close();

// 	args.on("closed", () => {
// 		customerWindow = null;
// 	});
// });

ipcMain.on("create:customerwindow", (event, fileName) => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	console.log(width - 66);
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let win = new BrowserWindow({
		resizable: false,
		height: height,
		width: width - 66,
		frame: false,
		title: "Add Customer",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.webContents.openDevTools();

	win.loadURL(modalPath);
});

ipcMain.on("create:invoiceWindow", (event, fileName) => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	console.log(width - 66);
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let win = new BrowserWindow({
		resizable: false,
		height: height,
		width: width - 66,
		frame: false,
		title: "Add Invoice",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.webContents.openDevTools();

	win.loadURL(modalPath);

	win.webContents.on("did-finish-load", (event) => {
		customerData().then((data) => {
			win.webContents.send("fetchCustomers", data);
		});
		getInvoiceNumber().then((inv) => {
			win.webContents.send("sendInvoiceNumber", inv);
		});
	});
});

//------- Invoice Section ---------

ipcMain.on("add:invoice", async function (event, args) {
	await axios
		.post(
			`http://localhost:3000/api/invoice`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("invoice:added", Response.data.message);
		})
		.catch((error) => {
			event.reply("invoice:added", error.response.data.message);
		});
});

// function getPDF(formdata) {
// 	return axios.get(`http://localhost:3000/api/generatepdf`, {
// 		data: formdata,
// 		responseType: "arraybuffer",
// 		headers: {
// 			Accept: "application/pdf",
// 		},
// 	});
// }
//------- Invoice Section Ends -----
// ipcMain.on("getInvoice", (event, args) => {
// 	console.log(args);
// 	getPDF(args)
// 		.then((response) => {
// 			console.log(response.data);
// 			const blob = new Blob([response.data], { type: "application/pdf" });
// 			const link = document.createElement("a");
// 			link.href = window.URL.createObjectURL(blob);
// 			link.download = `your-file-name.pdf`;
// 			link.click();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });
