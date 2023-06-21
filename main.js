'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron');
const Ap = require('./ApInterface');
const Pager = require('./Pager');
const path = require('path')
const url = require('url')

const {
  CATCH_ON_MAIN,
  CATCH_ON_RENDER,
  RENDER_DELETE_PAGER,
  RENDER_PAGE,
  MAIN_PAGERS_DATA
} = require('./utils/constants');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024, height: 768, show: false
  });

  // and load the index.html of the app.
  let indexPath;
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:4000',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  let ap = new Ap.connect()
  let pagerdb = {
    input: [],
    paged: [],
    deleted: [],
    deletedfin: [],
    pagedfin: [],
    render: () => {

      pagerdb.deletedfin = []
      pagerdb.pagedfin = []

      pagerdb.deleted.forEach(element => {
        pagerdb.deletedfin.push([element, 'off'])
      })

      pagerdb.paged.forEach(element => {
        pagerdb.pagedfin.push([element, 'on'])
      })

      let sendData = [...pagerdb.input, ...pagerdb.pagedfin, ...pagerdb.deletedfin]
      return sendData
    }
  }

  ap.on("pagersdata", (data) => {

    console.log("before", data);
    //push pagerdb inputs
    pagerdb.input = [];
    data.forEach(element => {

      let Id = element[0] * 1
      let Ip = element[1]

      if (pagerdb.deleted.includes(Id)) {
        let indexToDelete = pagerdb.deleted.indexOf(Id);
        pagerdb.deleted.splice(indexToDelete, 1);
      }
      if (pagerdb.paged.includes(Id)) {
        let indexToDelete = pagerdb.paged.indexOf(Id);
        pagerdb.paged.splice(indexToDelete, 1);
      }

      pagerdb.input.push([Id, 'waiting', Ip])
    });

    let sendData = pagerdb.render()
    mainWindow.send(MAIN_PAGERS_DATA, sendData);
    console.log("after", sendData);
  })

  ap.join()

  //page handle
  ipcMain.on(RENDER_PAGE, (event, arg) => {
    console.log("page command", arg);
    ap.deletePager(arg.Id)
    ap.pagePager(arg.Ip)

    if (!pagerdb.paged.includes(arg.Id)) {
      pagerdb.paged.push(arg.Id)

      pagerdb.input.forEach((element, index) => {
        if (element[0] == arg.Id) {
          pagerdb.input.splice(index, 1);
        }
      })

      //mainWindow.send(MAIN_PAGERS_DATA, pagerdb.render());
    }

  })

  //delete handle
  ipcMain.on(RENDER_DELETE_PAGER, (event, arg) => {
    if (!pagerdb.deleted.includes(arg.Id)) {
      pagerdb.deleted.push(arg.Id * 1)

      ap.deletePager(arg.Id)

      let indexToDelete = pagerdb.paged.indexOf(arg.Id);
      pagerdb.paged.splice(indexToDelete, 1);

      mainWindow.send(MAIN_PAGERS_DATA, pagerdb.render());
    }
  })

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
