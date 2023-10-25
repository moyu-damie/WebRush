// 生成随机的两个整数
function generateNumbers() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return [num1, num2];
}

var username;
var id;

// 更新问题
function updateQuestion(correctAnswer) {
  const [num1, num2] = generateNumbers();
  const questionElement = document.getElementById("question");
  questionElement.textContent = `${num1} + ${num2} = `;
  return num1 + num2; // 返回正确答案
}

// 处理提交事件
function handleSubmit(event, correctAnswer) {
  event.preventDefault(); // 防止表单默认提交行为
  const userAnswer = parseInt(document.getElementById("answer").value);
  const resultElement = document.getElementById("result");
  if (userAnswer === correctAnswer) {
    resultElement.textContent = "回答正确！";
    window.alert("回答正确");
    window.location.href="./load.html"
  } else {
    resultElement.textContent = `回答错误，正确答案是 ${correctAnswer}。`;
  }
  const newCorrectAnswer = updateQuestion(correctAnswer); // 更新问题，同时返回正确答案
  document.getElementById("answer").value = ""; // 清空输入框
  return newCorrectAnswer;
}

// 初始化游戏         
function initGame() {
  let correctAnswer = updateQuestion(); // 初始化问题，同时获取正确答案
  const formElement = document.querySelector("form");
  formElement.addEventListener("submit", function(event) {
    correctAnswer = handleSubmit(event, correctAnswer); // 处理提交事件，同时更新正确答案
  });
}

initGame(); // 启动游戏
