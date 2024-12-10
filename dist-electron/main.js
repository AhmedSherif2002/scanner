"use strict";
const electron = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
if (typeof electron === "string") {
  throw new TypeError("Not running in an Electron environment!");
}
const { env } = process;
const isEnvSet = "ELECTRON_IS_DEV" in env;
const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
const __filename$1 = url.fileURLToPath(typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("main.js", document.baseURI).href);
const __dirname$1 = path.dirname(__filename$1);
let win;
function createWindow() {
  win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      // is default value after Electron v5
      contextIsolation: true,
      // protect against prototype pollution
      enableRemoteModule: false,
      // turn off remote
      preload: path.join(__dirname$1, "preload.js")
      // use a preload script
    }
  });
  win.loadURL(
    isDev ? "http://localhost:5173" : `file://${path.join(__dirname$1, "../dist/index.html")}`
  );
  if (isDev) {
    win.webContents.openDevTools();
  }
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.ipcMain.on("toMain", (event, args) => {
  fs.readFile(args, (error, data) => {
    win.webContents.send("fromMain", data.toString());
  });
});
