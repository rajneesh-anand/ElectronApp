const path = require("path");
const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;
const shell = require("electron").shell;
const url = require("url");

const server = require("../backend/app");
const axios = require("axios");
require("electron-reload")(__dirname);

let mainWindow;

const isWindows = process.platform === "win32";

function createWindow() {
	const display = electron.screen.getPrimaryDisplay();
	const maxiSize = display.workAreaSize;
	mainWindow = new BrowserWindow({
		resizable: false,
		height: maxiSize.height,
		width: maxiSize.width,
		// frame: isWindows ? false : true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	// // Custom Menu

	var menu = Menu.buildFromTemplate([
		{
			label: "Menu",
			submenu: [
				{ label: "Adjust Notification Value" },
				{
					label: "CoinMarketCap",
					click() {
						shell.openExternal("http://coinmarketcap.com");
					},
					accelerator: "CmdOrCtrl+Shift+C"
				},
				{ type: "separator" },
				{
					label: "Exit",
					click() {
						app.quit();
					}
				}
			]
		},
		{
			label: "Info"
		}
	]);
	Menu.setApplicationMenu(menu);

	// Load index.html into the new BrowserWindow
	// mainWindow.loadURL("http://localhost:3000");

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "renderers/home.html"),
			protocol: "file:",
			slashes: true
		})
	);
	// mainWindow.loadFile("./renderers/home.html");

	// Menu.setApplicationMenu(mainMenu);

	// Open DevTools - Remove for PRODUCTION!
	mainWindow.webContents.openDevTools();

	const userData = async () => {
		return await axios
			.get(`http://localhost:3000/api/users`)
			.then(Response => {
				// console.log(Response.data.data);
				return Response.data.data;
			})
			.catch(error => {
				if (error) throw new Error(error);
			});
	};

	userData().then(data => {
		console.log(data);
		mainWindow.webContents.on("did-finish-load", event => {
			mainWindow.webContents.send("fetchUsers", data);
		});
		//mainWindow.webContents.send("fetchUsers", data);
		// const list = document.querySelector(".my-list");

		// data.map((element, index) => {
		// 	let li = document.createElement("li");
		// 	list.appendChild(li);
		// 	li.innerHTML += element;
		// });
	});

	// mainWindow.webContents.on("did-finish-load", event => {
	// 	mainWindow.webContents.send("fetchUsers", "This is from main");
	// });

	// Listen for window being closed
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

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

// ipcMain.on(`display-app-menu`, function(e, args) {
// 	if (isWindows && mainWindow) {
// 		menu.popup({
// 			window: mainWindow,
// 			x: args.x,
// 			y: args.y
// 		});
// 	}
// });
