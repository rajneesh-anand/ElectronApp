const path = require("path");
const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;

const { createAuthWindow } = require("./main/auth-process");
const createAppWindow = require("./main/app-process");
const authService = require("./services/auth-service");

const server = require("../backend/app");

let mainWindow;
const isWindows = process.platform === "win32";

function createWindow() {
  const display = electron.screen.getPrimaryDisplay();
  const maxiSize = display.workAreaSize;
  mainWindow = new BrowserWindow({
    resizable: false,
    height: maxiSize.height,
    width: maxiSize.width,
    frame: isWindows ? false : true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Menu.setApplicationMenu(mainMenu);

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

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

ipcMain.on(`display-app-menu`, function(e, args) {
  if (isWindows && mainWindow) {
    menu.popup({
      window: mainWindow,
      x: args.x,
      y: args.y
    });
  }
});
