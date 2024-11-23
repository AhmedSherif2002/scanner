import {
    app,
    BrowserWindow,
    ipcMain
  }  from "electron";
  import path from 'path'
import isDev from 'electron-is-dev'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;
function createWindow() {
    // const win = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         contextIsolation: false,
    //     }
    // })

    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, 'preload.js') // use a preload script
        }
    });

    win.loadURL(isDev?'http://localhost:5173':`file://${path.join(__dirname, '../dist/index.html')}`)
    if (isDev) {
        win.webContents.openDevTools()
    }   
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on("toMain", (event, args) => {
    fs.readFile(args, (error, data) => {
      // Do something with file contents
        console.log(args)
        console.log(data.toString());
      // Send result back to renderer process
      win.webContents.send("fromMain", data.toString());
    });
});