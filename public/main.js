const path = require('path');
const Ap = require('./ApInterface');
const Pager = require('./Pager');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  let ap = new Ap.connect()
  let pagerdb = {
    input:[],
    paged:[],
    deleted:[],
    deletedfin:[],
    pagedfin:[],
  }
  ap.on("pagersdata", (data) => {

    //push pagerdb inputs
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
      pagerdb.input.push( [Id, 'waiting', Ip] )
    });

    pagerdb.deleted.forEach(element =>{
      pagerdb.deletedfin.push([element, 'off'])
    })

    pagerdb.paged.forEach(element =>{
      pagerdb.pagedfin.push([element, 'on'])
    })

    let sendData = [...pagerdb.input, ...pagerdb.pagedfin, ...pagerdb.deletedfin]
    win.webContents.send('pagersdata', sendData)
    
    console.log(data);
  })

  ap.join()

  win.webContents.on("page", (event, data) => {
    Pager.page(data)
    Ap.deletePager(data)
    
  })

  win.webContents.on("delete", (event, data) => {
    Pager.page(data)
    Ap.deletePager(data)
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});