const PDFWindow = require('electron-pdf-window')

const win = new PDFWindow({
  width: 800,
  height: 600
})

win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')