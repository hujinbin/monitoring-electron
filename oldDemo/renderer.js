const { ipcRenderer } = require('@electron/remote');
const ipc = ipcRenderer;


var input = null
console.log(window)
window.addEventListener('DOMContentLoaded', () => {
  console.log(1111111111111)
    input = document.getElementById("search-input");
    input.addEventListener("keydown", function(evt){
      if(evt.key==="Enter"){    //当按下回车键时
        updateURL(input.value)
      }
    })
  })
  
function updateURL(url){
    if(url === ''){
        return false;
    }
    if (url.slice(0, 8).toLowerCase() != 'https://' 
      && url.slice(0, 7).toLowerCase() != 'http://')
      url = 'https://'+ url;
    return url  //返回url
}


// 改变 iframe的 高度
function changeFrameHeight(){
    ifm.height=document.documentElement.clientHeight-52;
}

window.addEventListener('resize', function(){
    changeFrameHeight();
})

// 搜索方法
function onSearch(){
    input = document.getElementById("search-input");
    const url = updateURL(input.value)
    console.log(url)
    console.log(2222222)
    ipc.send('onSearch',url)
}

var boxState = false;
var findBox = null; // 查找弹窗
function showFind(){
   findBox = document.getElementsByClassName('find-tool-box')[0]
   findBox.style.display = !boxState? "block":"none";
   boxState = !boxState;
}

// 查找节点
function onFind(){
   var nodeInput = document.getElementById("node-input");
   var jsonInput = document.getElementById("json-input");
   var nodeList = []
   console.log(nodeInput.value)
   console.log(jsonInput.value)
   if(nodeInput.value){
     nodeList =nodeInput.value.split('->')
     locateNode(nodeList)
   }else if(jsonInput.value){
     try{
        var jsonData = JSON.parse(jsonInput.value)
        nodeList = jsonData.selector.split('->')
        locateNode(nodeList)
     }catch(e){

     }
   }
}

// 定位节点
function locateNode(arr){
   let dom = ifm.contentWindow.document || ifm.document
   arr.forEach(element => {
      console.log(dom)
      dom = dom.querySelector(element)
      console.log(dom)
   });
}
