// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer, remote, clipboard } = require('electron')
const PDFWindow = require('electron-pdf-window')
// console.log('render:',ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log('render:',arg) // prints "pong"

  /*const BrowserWindow = remote.BrowserWindow;
  var win = new BrowserWindow({ width: 800, height: 600 });*/
  // win.loadURL('https://baidu.com');
  // BrowserWindow.loadURL('https://github.com');
  // win.loadFile('app.html')

  /*navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    document.getElementById('camera').srcObject = stream;
  }).catch(function() {
    alert('could not connect stream');
  });*/
  const BrowserWindow = remote.BrowserWindow;
	const win = new BrowserWindow({ width: 800, height: 600 })
	PDFWindow.addSupport(win)
	win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
})

const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup();
let tab = tabGroup.addTab({
    title: "Electron",
    src: "https://github.com",
    visible: true
});



const dialog = remote.dialog;
// console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));
// dialog.showErrorBox('title', 'content')


const request = remote.net.request('https://github.com')
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
  response.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`)
  })
  response.on('end', () => {
    console.log('No more data in response.')
  })
})
request.end()




const { Menu, MenuItem } = remote

const menu = new Menu();
const menu2 = new Menu();
menu.append(new MenuItem({label:'撤销', role: 'undo' }));
menu.append(new MenuItem({label:'重做', role: 'redo' }));
// menu.append(new MenuItem({ role: 'separator' }));
menu.append(new MenuItem({label:'剪切', role: 'cut' }));
menu.append(new MenuItem({label:'复制', role: 'copy' }));
menu.append(new MenuItem({label:'粘贴', role: 'paste' }));
// menu.append(new MenuItem({ role: 'pasteandmatchstyle' }));
menu.append(new MenuItem({label:'删除', role: 'delete' }));
menu.append(new MenuItem({ label:'全选', role: 'selectall' }));

menu2.append(new MenuItem({label:'复制', role: 'copy'}));
//点击dome
menu2.append(new MenuItem({label:'粘贴',  role: 'paste' }));


window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  console.log(e)
  if(isEleEditable(e.target)){
      menu.popup(remote.getCurrentWindow());
  }else{
      //判断有文本选中
      let selectText = window.getSelection().toString();
      if(!!selectText){
          menu2.popup(remote.getCurrentWindow());
      }
  }
}, false)


/**
 * 判断点击区域可编辑
 * @param {*} e 
 */
function isEleEditable(e){
    if(!e){
        return false;
    }
    //为input标签或者contenteditable属性为true
    if(e.tagName == 'INPUT' || e.contentEditable == 'true'){
        return true;
    }else{
        //递归查询父节点
        return isEleEditable(e.parentNode)
    }
}

















































