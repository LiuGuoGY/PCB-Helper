const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const http = require('http');

let ymlUrl = "";

if(process.platform == 'darwin'){
    ymlUrl = "https://github.com/LiuGuoGY/PCB-Helper/releases/latest/download/latest-mac.yml";
} else if(process.platform == 'win32'){
    ymlUrl = "https://github.com/LiuGuoGY/PCB-Helper/releases/latest/download/latest.yml";
} else if(process.platform == 'linux'){
    
}

let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
};

// see  https://www.electron.build/auto-update#events
autoUpdater.on('error', function (error) {
    console.log(error)
    console.log(message.error)
});
autoUpdater.on('checking-for-update', function () {
    console.log(message.checking)
});
autoUpdater.on('update-available', function (info) {
    console.log(message.updateAva)
});
autoUpdater.on('update-not-available', function (info) {
    console.log(message.updateNotAva)
});

autoUpdater.on('update-downloaded', info => {
  if (true) { //process.env.NODE_ENV === 'production'
    // 这里先拉取更新信息，在对话框中显示版本的更新内容
    console.log("update_on!!!");
    const req = http.request(ymlUrl, req => {
      let detail = ''
      req.setEncoding('utf-8')
      req.on('data', chunk => {
        detail += chunk.toString()
      })
      req.on('end', () => {
          console.log(detail);
        dialog.showMessageBox(
          {
            icon: __static + '/favicon.png',
            type: 'info',
            title: '软件更新',
            message: `已更新到最新版本（${info.version}）请重启应用。`,
            detail: detail,
            buttons: ['确定']
          },
          idx => {
            // 点击确定的时候执行更新
            if (idx === 0) {
              autoUpdater.quitAndInstall()
            }
          }
        )
      })
    })
    req.end()
  }
})
module.exports = autoUpdater;