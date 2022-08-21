// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("input");
  const ifm = document.getElementById("iframe");
  input.addEventListener("keydown", function(evt){
    if(evt.key==="Enter"){    //当按下回车键时
      updateURL(ifm,input.value)
      console.log(ifm)
    }
  })
})

function updateURL(ifm, url){
  if (url.slice(0, 8).toLowerCase() != 'https://' 
    && url.slice(0, 7).toLowerCase() != 'http://')
    url = 'https://'+ url;
  ifm.src = url   //更新ifm的地址
}