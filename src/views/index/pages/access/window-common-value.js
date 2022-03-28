// 引入electron并创建一个Browserwindow
const remote = window.require('@electron/remote');
const BrowserWindow = remote.BrowserWindow;
const path = require('path')
const url = require('url')

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let newWindow

function createWindow () {
  if(newWindow) {
    newWindow.show();
  } else {
    //创建浏览器窗口,宽高自定义具体大小你开心就好
    newWindow = new BrowserWindow({
      width: 600, 
      height: 400,
      minWidth: 600,
      minHeight: 400,
      titleBarStyle: 'hidden',
      fullscreenable: false,
      backgroundColor: '#FBFBFB',
      resizable: false,
      frame: (remote.process.platform === "win32")?false:true,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
      }
    })

    remote.require('@electron/remote/main').enable(newWindow.webContents);

    // 加载应用----适用于 react 项目
    // unitConvertWindow.loadURL('http://localhost:5000/unit-convert.html');
    let startUrl = "";
    if(remote.process.env.ELECTRON_START_URL) {
      startUrl = remote.process.env.ELECTRON_START_URL + "/common-value.html";
    } else {
      startUrl = url.format({
        pathname: path.join(remote.process.env.REACT_APP_ROOT_DIR, './build/common-value.html'),
        protocol: 'file:',
        slashes: true
      });
    }
    newWindow.loadURL(startUrl);

    window.require('@electron/remote/main').enable(newWindow.webContents);

    // 打开开发者工具，默认不打开
    // newWindow.webContents.openDevTools()

    // 关闭window时触发下列事件.
    newWindow.on('closed', function () {
      newWindow = null
    })
  }
}


export default createWindow;