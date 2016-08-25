'use strict';
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Kafka = require('no-kafka');

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

var startupOpts = {
    useContentSize: true,
    width: 1600,
    height: 1200,
    center: true,
    resizable: true,
    alwaysOnTop: false,
    fullscreen: false,
    skipTaskbar: true,
    kiosk: false,
    title: '',
    icon: null,
    show: false,
    frame: true,
    disableAutoHideCursor: false,
    autoHideMenuBar: false,
    titleBarStyle: 'default'
};

app.on('ready', function() {
    mainWindow = new BrowserWindow(startupOpts);

    if (process.env.NODE_ENV === 'dev') {
        mainWindow.webContents.on('did-start-loading', function() {
            mainWindow.webContents.executeJavaScript('var script = document.createElement(\'script\');script.type = \'text/javascript\';script.src=\'http://localhost:35729/livereload.js\';document.body.appendChild(script);');
        });
    }
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.show();

    ipcMain.on('send-kafka', function(event, params){
      if(typeof params === 'undefined'){
        event.sender.send('kafka-result', {success: false, error: 'params not defined'})
      }
      var producer = new Kafka.Producer({connectionString: params['connectionString'], clientId: params['clientId']});

      producer.init().then(function(){
        return producer.send({
            topic: params['topic'],
            partition: params['partition'],
            message: {
                value: params['message']
            }
        });
      })
      .then(function (result) {
        /*
        [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
        */
        event.sender.send('kafka-result', {success: true, result: result})
      });
    });
});
