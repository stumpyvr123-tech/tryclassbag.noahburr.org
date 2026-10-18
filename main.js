const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createWindows() {
    // 1. Create the borderless Loading Splash Screen
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        center: true
    });
    splashWindow.loadFile(path.join(__dirname, 'loading.html'));

    // 2. Create the Main Dashboard Window (Invisible at start!)
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // <-- Keeps it hidden from sight
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // 3. Swap the frames once the code is compiled
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            mainWindow.show(); // Reveal your main app!
        }, 1500);
    });
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
