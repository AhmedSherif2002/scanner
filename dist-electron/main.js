"use strict";
const electron = require("electron");
const path = require("path");
if (typeof electron === "string") {
  throw new TypeError("Not running in an Electron environment!");
}
const { env } = process;
const isEnvSet = "ELECTRON_IS_DEV" in env;
const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadURL(isDev ? "http://localhost:5173" : `file://${path.join(__dirname, "../dist/index.html")}`);
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
