// 引入electron并创建一个Browserwindow
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const autoUpdater = require('./src/update');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow () {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 600,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hidden',
    frame: (process.platform == "win32")?false:true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  // 加载应用----适用于 react 项目
  // mainWindow.loadURL('http://localhost:3000/');
  let startUrl = "";
  if(process.env.ELECTRON_START_URL) {
    startUrl = process.env.ELECTRON_START_URL;
  } else {
    startUrl = url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    });
    process.env.REACT_APP_ROOT_DIR = __dirname;
  }
  mainWindow.loadURL(startUrl);
  
  // 打开开发者工具，默认不打开
  // mainWindow.webContents.openDevTools()

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', async () => {
  // 这里只在生产环境才执行版本检测。
  if (true) {  //process.env.NODE_ENV === 'production'
    autoUpdater.checkForUpdates();
  }
  createWindow();
})

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
   // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})

// 你可以在这个脚本中续写或者使用require引入独立的js文件.
