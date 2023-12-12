const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
    appWindowShow: (callback) => { 
        ipcRenderer.on('appWindowShow',callback)
    }
});
