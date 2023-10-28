var userid;
var username;
var score0=0;
var score1=0;
var score2=0;
var score3=0;

document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("container");

  for (var i = 0; i < 100; i++) {
      var randomX = Math.random() * (container.clientWidth-20); // 考虑文本宽度
      var randomY = Math.random() * (container.clientHeight-20); // 考虑文本高度

      var text = document.createElement("div");
      if(i==0){
          text.textContent = "😫";
      }
      else{
          text.textContent = "🙂";
      }
      
      text.addEventListener("click", function(event) {
          if (event.target.textContent === "😫") {
              alert("你点击了😫，“哼，看来还没老糊涂嘛”");
          } else {
              alert("你点击了🙂，“杂鱼杂鱼，果然还是看不出我的伪装呢”");
              score0=10;
              window.location.href = "next.html";
          }
      });

      text.style.position = "absolute";
      text.style.top = randomY + "px";
      text.style.left = randomX + "px";

      container.appendChild(text);
  }
});

// script.js
function adjustContainerSize() {
  var container = document.getElementById("container");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // 设置容器的宽度和高度
  container.style.width = (windowWidth * 0.8) + "px"; // 80% 的窗口宽度
  container.style.height = (windowHeight * 0.8) + "px"; // 80% 的窗口高度
}

// 页面加载时和窗口大小变化时调整容器大小
window.addEventListener("load", adjustContainerSize);
window.addEventListener("resize", adjustContainerSize);

