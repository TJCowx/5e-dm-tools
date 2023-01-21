import { app, ipcMain, nativeTheme, shell } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0097a7',
      symbolColor: 'rgba(0, 0, 0, 0.87)',
      height: 28,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#282c34' : '#FFFFFF',
  });

  if (isProd) {
    await mainWindow.loadURL('app://./connect.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/connect`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);

    return { action: 'deny' };
  });

  ipcMain.on('toggle-maximize-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
})();

app.on('window-all-closed', () => {
  app.quit();
});
