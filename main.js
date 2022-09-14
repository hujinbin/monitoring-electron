// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1240,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true, //设置开启nodejs环境
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
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
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()

    // 使用windowsView 打开子窗口
    const view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({
        x:0,
        y:80,
        width:1240,
        height:600,
    })
    view.webContents.loadURL('https://ops.ydctml.top/')

    mainWindow.on('will-resize', function () {
      const size = mainWindow.getSize()
      view.setBounds({
        x:0,
        y:80,
        width:size[0],
        height:size[1],
      })
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
