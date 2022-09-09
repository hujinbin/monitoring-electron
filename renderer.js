// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var input = null
var ifm = null
window.addEventListener('DOMContentLoaded', () => {
    input = document.getElementById("search-input");
    ifm = document.getElementById("iframe");
    input.addEventListener("keydown", function(evt){
      if(evt.key==="Enter"){    //当按下回车键时
        updateURL(ifm,input.value)
      }
    })
  })
  
function updateURL(ifm, url){
    if(url === ''){
        return false;
    }
    if (url.slice(0, 8).toLowerCase() != 'https://' 
      && url.slice(0, 7).toLowerCase() != 'http://')
      url = 'https://'+ url;
    ifm.src = url   //更新ifm的地址
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
    updateURL(ifm,input.value)
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
   console.log(arr)
}
