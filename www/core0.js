function sendData() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // 显示加载界面
    document.getElementById('loading').style.display = 'flex';
  
    // 模拟发送数据到后端的过程
    setTimeout(function() {
      // 这里可以使用 AJAX 或其他方式将数据发送到后端
      console.log('用户名：', username);
      console.log('密码：', password);
  
      // 隐藏加载界面
      document.getElementById('loading').style.display = 'none';
    }, 2000); // 模拟2秒的加载过程
  }
  