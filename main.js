const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

// Update එකක් තිබුණොත් background එකෙන් auto-download වීමට සැලැස්වීම
autoUpdater.autoDownload = true;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // ඔබේ අඩවියේ ප්‍රධාන HTML file එක
  mainWindow.loadFile('admin.html');
}

app.whenReady().then(() => {
  createWindow();

  // App එක Open වන විටම අලුත් Update එකක් තියෙනවාදැයි පරීක්ෂා කිරීම
  autoUpdater.checkForUpdatesAndNotify();
});

// Update එක download වී අවසන් වූ පසු App එක Restart වී අලුත් version එක Install වීම
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});