'use strict';
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

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
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.show();
});
