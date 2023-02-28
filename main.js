// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')

const { ipcMain } = require('electron')

let mainWindow = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true, //设置开启nodejs环境
      contextIsolation: false,
      enableRemoteModule: true, 
    }
  })

  // and load the index.html of the app.
  

  // mainWindow.webContents.session.webRequest.onHeadersReceived({ urls: [ "*://*/*" ] },
  //   (d, c)=>{
  //     if(d.responseHeaders['X-Frame-Options']){
  //       delete d.responseHeaders['X-Frame-Options'];
  //     } else if(d.responseHeaders['x-frame-options']) {
  //       delete d.responseHeaders['x-frame-options'];
  //     }
 
  //     c({cancel: false, responseHeaders: d.responseHeaders});
  //   }
  // );
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(mainWindow.webContents)
    // mainWindow.webContents.openDevTools()

    // 使用windowsView 打开子窗口
    const searchView = new BrowserView()
    const view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({
        x:0,
        // y:80,
        y:400,
        width:1240,
        height:600,
    })
    view.webContents.loadURL('https://ops.ydctml.top/')

    mainWindow.addBrowserView(searchView)
    searchView.setBounds({
      x:0,
      y:0,
      width:1240,
      // height:80,
      height:400,
      webPreferences: {
        nodeIntegration: true, //设置开启nodejs环境
        contextIsolation: false,
        enableRemoteModule: true, 
      }
    })
    searchView.webContents.loadFile(path.join(__dirname, 'index.html'))
    searchView.webContents.openDevTools()

    mainWindow.on('will-resize', function () {
      const size = mainWindow.getSize()
      view.setBounds({
        x:0,
        y:80,
        width:size[0],
        height:size[1],
      })
      searchView.setBounds({
        x:0,
        y:0,
        width:size[0],
        height:80,
      })
   })
   ipcMain.on("onSearch", (event, data) => {
    //监听主进程发送过来的消息
    console.log(event, data)
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
