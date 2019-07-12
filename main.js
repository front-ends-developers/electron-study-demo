// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain,
    netLog
} = require('electron')
    // require('electron-debug')();
if (require('electron-squirrel-startup')) return;

const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: () => {
        console.log('time to print stuff')
    }
}))

app.setUserTasks([{
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }])
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, webSecurity: false })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    /*globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
    })*/

    ipcMain.on('asynchronous-message', (event, arg) => {
      console.log('main:',arg) // prints "ping"
      console.log(event.reply)
      // event.reply('asynchronous-reply', 'pong')
      event.sender.send('asynchronous-reply', 'pong')
    })

    /*ipcMain.on('synchronous-message', (event, arg) => {
      console.log('main:',arg) // prints "ping"
      event.returnValue = 'pong'
    })*/

    // netLog.startLogging('/path/to/net-log')
    // After some network events
    /*netLog.stopLogging(path => {
    console.log('Net-logs written to', path)
    })*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
