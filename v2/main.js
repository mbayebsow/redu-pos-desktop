const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron')
const path = require('path')
const MainMenuapp = require('./menu-config')
const RightMenuapp = require('./right-menu-config')
const PrintOptions = require('./right-menu-config')
const remoteMain = require('@electron/remote/main')
remoteMain.initialize();

let mainWindow
let mainMenu = Menu.buildFromTemplate(MainMenuapp)
let rightMenu = Menu.buildFromTemplate(RightMenuapp)


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 700,
    minWidth: 1180,
    minHeight: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    titleBarOverlay: {
      color: '#ffffff',
      symbolColor: '#000000',
      height: 40
    },
    trafficLightPosition: { x: 10, y: 15 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  remoteMain.enable(mainWindow.webContents);
  //Load Appliaction Main Menu
  Menu.setApplicationMenu(mainMenu) 
  //Load Right click menu
  mainWindow.webContents.on('context-menu', e => {
    rightMenu.popup(mainWindow)
  })

  //mainWindow.webContents.openDevTools()
  //CreatWindow execute loding remote content
  loadWebContent()
}

function loadWebContent() {
  //Loading spalsh screen
  mainWindow.loadFile(path.join(__dirname, 'public/loading.html'))

  //create webContants
  let wc = mainWindow.webContents

  //suessfull loding page afer dom created
  wc.once('did-finish-load'  ,  () => {
    mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  })

  // if not loading page redirect error page
  wc.on('did-fail-provisional-load', (error, code)=> {
    mainWindow.loadFile(path.join(__dirname, 'public/offline.html'))
  })
}

// Check website loading error (offline, page not found or etc.)
ipcMain.on('online-status-changed', (event, status) => {
  if(status == true) { loadWebContent() }
})

// Print page option
ipcMain.on('printPage', () => {

  var options = PrintOptions;

  let win = BrowserWindow.getFocusedWindow();

  win.webContents.print(options, (success, failureReason) => {
      if (!success) dialog.showMessageBox(mainWindow, {
        message: failureReason.charAt(0).toUpperCase() + failureReason.slice(1),
        type: "error",
        buttons: ["Cancel"],
        defaultId: 0,
        title: "Print Error",
    });
  });
})

//Load menuItem local pages (About, Home page, etc)
module.exports = (pageId) => {
  if(pageId === 'home') {
    loadWebContent()
  } else {
    mainWindow.loadFile(path.join(__dirname, `public/windows/${pageId}.html`))
  }
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
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
