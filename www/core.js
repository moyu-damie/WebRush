var userid;
var username;
var userpassword;
var score0=0;
var score1=0;
var score2=0;
var score3=0;

function sendData() {
    var types = 'login';
    username = document.getElementById('username').value;
    userid = document.getElementById('userid').value;
    userpassword = document.getElementById('password').value;

    // 设置Cookie
    document.cookie = "username=" + encodeURIComponent(username) + ";" + "path=/";
    document.cookie = "userid=" + encodeURIComponent(userid) + ";" + "path=/";
    document.cookie = "userpassword=" + encodeURIComponent(userpassword) + ";" + "path=/";

    const url = 'http://127.0.0.1:5000/login';
    const data = {'type': types, 'name': username, 'id': userid,'password': userpassword};
    console.log(JSON.stringify(data));
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // 跳转到 main.html 页面
        if(result.message === 'Login successful'){
            window.location.href = "ready.html";
        }
        else{
            alert("id或密码错误")
        }
    })
    .catch(error => console.error(error));
}

function createuser(){
    var types = 'create';
    username = document.getElementById('username').value;
    userid = document.getElementById('userid').value;
    userpassword = document.getElementById('password').value;

    // 设置Cookie
    document.cookie = "username=" + encodeURIComponent(username) + ";" + "path=/";
    document.cookie = "userid=" + encodeURIComponent(userid) + ";" + "path=/";
    document.cookie = "userpassword=" + encodeURIComponent(userpassword) + ";" + "path=/";


    const url = 'http://127.0.0.1:5000/login';
    const data = {'type': types, 'name': username, 'id': userid,'password': userpassword};
    console.log(JSON.stringify(data));
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // 跳转到 main.html 页面
        if(result.message === 'signup & Login successful'){
            window.location.href = "ready.html";
        }
        else{
            alert("出错了")
        }
    })
    .catch(error => console.error(error));
}


function turntogame(){
    window.location.href ="main.html";
}
function turntolist() {
    window.location.href = "list.html";
}
function getdata(){
    const url = 'http://127.0.0.1:5000/getlist';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // 获取表格元素
        var table = document.getElementById('thelist');
        
        // 清空表格内容
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        // 获取表格元素
        var table = document.getElementById('thelist');
        // 遍历对象中的属性，并创建表格行
        for (var prop in data) {
          if (data.hasOwnProperty(prop)) {
            // 创建新的表格行
            var row = table.insertRow(-1);
  
            // 创建单元格并添加数据
            var cell1 = row.insertCell(0);
            cell1.innerHTML = parseInt(prop) + 1;
  
            var cell2 = row.insertCell(1);
            cell2.innerHTML = data[prop][0];
            
            var cell3 = row.insertCell(2);
            cell3.innerHTML = data[prop][1];

            var cell4 = row.insertCell(3);
            cell4.innerHTML = data[prop][2];
            
            var cell5 = row.insertCell(4);
            cell5.innerHTML = data[prop][3];
            
            var cell6 = row.insertCell(5);
            cell6.innerHTML = data[prop][4];
            
            var cell7 = row.insertCell(6);
            cell7.innerHTML = data[prop][5];
            
            var cell8 = row.insertCell(7);
            cell8.innerHTML = data[prop][6];
            
            var cell9 = row.insertCell(8);
            cell9.innerHTML = "delete";
          }
        }
        var rows = table.getElementsByTagName("tr");
        var userid = getCookie("userid");
        // 遍历每一行，跳过表头行（第一行）
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.getElementsByTagName("td");
            var userIdCell = cells[2];
            if (userIdCell.textContent.trim() === userid) {
                row.style.backgroundColor = "red";
                console.log("Found a row with userid 'root':", row);
            }
        }

        var deleteList = document.querySelectorAll("#thelist td:nth-child(9)");
        // 为选中的列添加一个CSS类
        for (var i = 0; i < deleteList.length; i++) {
            deleteList[i].setAttribute("onclick", "delete_score(this)");
            deleteList[i].style.userSelect = "none";
            deleteList[i].style.backgroundColor = "#4CAF50"; // 设置背景色
            deleteList[i].style.borderRadius = "5px"; // 设置圆角
            deleteList[i].style.color = "#FFFFFF"; // 设置文字颜色
            deleteList[i].style.padding = "0px 0px"; // 设置内边距
            deleteList[i].style.textAlign = "center"; // 设置文本居中
            deleteList[i].style.textDecoration = "none"; // 取消下划线
            deleteList[i].style.marginLeft = "2px"; // 设置左margin
        }
      })
      .catch(err => console.error(err));
}

function delete_score(button){
    var types = 'delete';
    var userid= getCookie("userid");
    var row = button.parentNode; // 获取按钮的父节点的父节点，即所在行
    var cells = row.getElementsByTagName("td"); // 获取行中的所有单元格
    var usernametodelete = cells[1].textContent;
    var useridtodelete = cells[2].textContent; // 获取第三列单元格的文本内容
    console.log(useridtodelete); // 这里可以根据需要进行后续处理
    if(userid==='root'){
        const url = 'http://127.0.0.1:5000/login';
        const data = {'type': types, 'name': usernametodelete, 'id': useridtodelete};
        console.log(JSON.stringify(data));
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if(result.message==="Delete successful"){
                alert("已删除");
                getdata();
            }

        })
        .catch(error => console.error(error));
    }
    else{
        alert(usernametodelete + "，" + useridtodelete + "，你没有管理员权限");
    }
}


function set_score(){
    var types = 'updata';
    var userid= getCookie("userid");
    var username= getCookie("username");
    var usernametoupdata = document.getElementById('username').value;
    var useridtoupdata = document.getElementById('userid').value;
    var level0toupdata = document.getElementById('level0').value;
    var level1toupdata = document.getElementById('level1').value;
    var level2toupdata = document.getElementById('level2').value;
    var level3toupdata = document.getElementById('level3').value;
    var sumscore = parseInt(level0toupdata) + parseInt(level1toupdata) + parseInt(level2toupdata) + parseInt(level3toupdata);
    
    if(userid==='root'){
        const url = 'http://127.0.0.1:5000/login';
        const data = {'type': types, 'name': usernametoupdata, 'id': useridtoupdata,'score0': level0toupdata,'score1' : level1toupdata,'score2' : level2toupdata,'score3' : level3toupdata,'sumscore':sumscore};
        console.log(JSON.stringify(data));
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if(result.message==="Updata successful"){
                alert("已更新");
                getdata();
            }
        })
        .catch(error => console.error(error));
    }
    else{
        alert(username + "，" + userid + "，你没有管理员权限");
    }
}

//-------------第一关---------------

function startgame1() {
    var container = document.getElementById("gameplace");
    
    var seconds = 0;
    var timeoutTriggered = false; 
  
    function handleClick(event) {
        if (event.target.textContent === "😫") {
            alert("你点击了😫，“哼，看来还没老糊涂嘛”");
            score0=0;
            document.cookie = "score0=" + 10 + ";" + "path=/";
            window.location.href = "game2.html";
        } else {
            alert("你点击了🙂，“杂鱼杂鱼，果然还是看不出我的伪装呢”,快快去下一关吧");
            score0 = 10;
            document.cookie = "score0=" + 0 + ";" + "path=/";
            window.location.href = "game2.html";
        }
    }
  
    function timer() {
        seconds++;
        document.getElementById('timer').innerHTML = seconds + "秒";
        if (seconds >= 10 && !timeoutTriggered) { // 判断标记变量
            timeoutTriggered = true; // 设置标记变量为true
            score3 = 0;
            document.cookie = "score0=" + 0 + ";" + "path=/";
            alert("笨笨，这么长时间都找不到，快快去下一关吧");
            window.location.href = "game2.html";
        }
    }
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var num= width*height/20000;
    for (var i = 0; i < num; i++) {
        var randomX = Math.random() * (container.clientWidth - 20);
        var randomY = Math.random() * (container.clientHeight - 20);
    
        var text = document.createElement("div");
        text.textContent = (i === 0) ? "😫" : "🙂";
        text.addEventListener("click", handleClick);
    
        text.style.position = "absolute";
        text.style.top = randomY + "px";
        text.style.left = randomX + "px";
        text.style.userSelect = "none";
  
    container.appendChild(text);
    }

    window.addEventListener("load", adjustContainerSize);
    window.addEventListener("resize", adjustContainerSize);

    setInterval(timer, 1000);
}

//-----------第二关-----------------
  
function startgame2() {
    var container = document.getElementById("gameplace2");
    
    var seconds = 0;
    var timeoutTriggered = false; 

    function handleClick(event) {
        if (event.target.textContent === "😅") {
            alert("你点击了😅，“哼，看来还没老糊涂嘛”");
            score1 = 10;
            document.cookie = "score1=" + 10 + ";" + "path=/";
            window.location.href = "game3.html";
        } else {
            alert("你点击了😂，“杂鱼杂鱼，果然还是看不出我的伪装呢”");
            score1 = 0;
            document.cookie = "score1=" + 0 + ";" + "path=/";
            window.location.href = "game3.html";
        }
    }
  
    function timer() {
        seconds++;
        document.getElementById('timer2').innerHTML = seconds + "秒";
        if (seconds >= 10 && !timeoutTriggered) { // 判断标记变量
            timeoutTriggered = true; // 设置标记变量为true
            score3 = 0;
            document.cookie = "score1=" + 0 + ";" + "path=/";
            alert("笨笨，这么长时间都找不到，快快去下一关吧");
            window.location.href = "game3.html";
        }
    }
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var num= width*height/20000;
    for (var i = 0; i < num; i++) {
        var randomX = Math.random() * (container.clientWidth - 20);
        var randomY = Math.random() * (container.clientHeight - 20);
        
        var text = document.createElement("div");
        text.textContent = (i === 0) ? "😅" : "😂";
        text.addEventListener("click", handleClick);
        
        text.style.position = "absolute";
        text.style.top = randomY + "px";
        text.style.left = randomX + "px";
        text.style.userSelect = "none";
        
        
  
        container.appendChild(text);
    }

    window.addEventListener("load", adjustContainerSize);
    window.addEventListener("resize", adjustContainerSize);

    setInterval(timer, 1000);
}

//-----------------第三关---------------------------

function startgame3() {
    var container = document.getElementById("gameplace3");
    
    var seconds = 0;
    var timeoutTriggered = false; 

    function handleClick(event) {
        if (event.target.textContent === "😀") {
            alert("你点击了😀，“哼，看来还没老糊涂嘛”");
            score2 = 10;
            document.cookie = "score2=" + 10 + ";" + "path=/";
            window.location.href = "game4.html";
        } else {
            alert("你点击了😄，“杂鱼杂鱼，果然还是看不出我的伪装呢”");
            score2 = 0;
            document.cookie = "score2=" + 0 + ";" + "path=/";
            window.location.href = "game4.html";
        }
    }
  
    function timer() {
        seconds++;
        document.getElementById('timer3').innerHTML = seconds + "秒";
        if (seconds >= 10 && !timeoutTriggered) { // 判断标记变量
            timeoutTriggered = true; // 设置标记变量为true
            score3 = 0;
            document.cookie = "score2=" + 0 + ";" + "path=/";
            alert("笨笨，这么长时间都找不到，快快去下一关吧");
            window.location.href = "game4.html";
        }
    }
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var num= width*height/20000;
    for (var i = 0; i < num; i++) {
        var randomX = Math.random() * (container.clientWidth - 20);
        var randomY = Math.random() * (container.clientHeight - 20);
        
        var text = document.createElement("div");
        text.textContent = (i === 0) ? "😀" : "😄";
        text.addEventListener("click", handleClick);
        
        text.style.position = "absolute";
        text.style.top = randomY + "px";
        text.style.left = randomX + "px";
        text.style.userSelect = "none";
        
        
  
        container.appendChild(text);
    }

    window.addEventListener("load", adjustContainerSize);
    window.addEventListener("resize", adjustContainerSize);

    setInterval(timer, 1000);
}

//-----------------第四关---------------------------

function startgame4() {
    var container = document.getElementById("gameplace4");
    
    var seconds = 0;
    var timeoutTriggered = false; 

    function handleClick(event) {
        if (event.target.textContent === "😲") {
            alert("你点击了😲，“哼，看来还没老糊涂嘛”");
            score3 = 10;
            document.cookie = "score3=" + 10 + ";" + "path=/";
            window.location.href = "submit.html";
        } else {
            alert("你点击了😮，“杂鱼杂鱼，果然还是看不出我的伪装呢”");
            score3 = 0;
            document.cookie = "score3=" + 0 + ";" + "path=/";
            window.location.href = "submit.html";
        }
    }
  
    function timer() {
        seconds++;
        document.getElementById('timer4').innerHTML = seconds + "秒";
        if (seconds >= 10 && !timeoutTriggered) { // 判断标记变量
            timeoutTriggered = true; // 设置标记变量为true
            score3 = 0;
            document.cookie = "score3=" + 0 + ";" + "path=/";
            alert("笨笨，这么长时间都找不到，快快去下一关吧");
            window.location.href = "submit.html";
        }
    }
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var num= width*height/20000;
    for (var i = 0; i < num; i++) {
        var randomX = Math.random() * (container.clientWidth - 20);
        var randomY = Math.random() * (container.clientHeight - 20);
        
        var text = document.createElement("div");
        text.textContent = (i === 0) ? "😲" : "😮";
        text.addEventListener("click", handleClick);
        
        text.style.position = "absolute";
        text.style.top = randomY + "px";
        text.style.left = randomX + "px";
        text.style.userSelect = "none";
        
        
  
        container.appendChild(text);
    }

    window.addEventListener("load", adjustContainerSize);
    window.addEventListener("resize", adjustContainerSize);

    setInterval(timer, 1000);
}

function readCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      if (parts[0] === name) {
        return decodeURIComponent(parts[1]);
      }
    }
    return null;
  }

function submit() {
    var types = 'submit';
    var usernames = getCookie('username');
    var userids = getCookie('userid');
    var userpasswords = getCookie('userpassword');
    var score0s = getCookie('score0');
    var score1s = getCookie('score1');
    var score2s = getCookie('score2');
    var score3s = getCookie('score3');
    var sumscore = parseInt(score0s) + parseInt(score1s) + parseInt(score2s) + parseInt(score3s);


    const url = 'http://127.0.0.1:5000/login';
    const data = {'type': types, 'name': usernames, 'id': userids,'password': userpasswords,'score0': score0s,'score1' : score1s,'score2' : score2s,'score3' : score3s,'sumscore':sumscore};
    console.log(JSON.stringify(data));
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.message === 'Submit successful') {
            window.location.href = "list.html";
        } else {
            alert("提交失败");
        }
    })
    .catch(error => console.error(error));
}

function getCookie(name) {
    var cookieArr = document.cookie.split("; ");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (cookiePair[0] === name) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}


function adjustContainerSize() {
  var container = document.getElementById("container");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // 设置容器的宽度和高度
  container.style.width = (windowWidth * 0.8) + "px"; // 80% 的窗口宽度
  container.style.height = (windowHeight * 0.8) + "px"; // 80% 的窗口高度
}

