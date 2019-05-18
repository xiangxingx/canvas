var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

pageResize()
window.onresize = function () { //onresize 调整大小
  pageResize()
}

var lastPoint = { x: undefined, y: undefined }
var using = false // 状态锁，用状态控制事件的发生
var eraserEnabled = false
btn.onclick = function () {
  eraserEnabled = !eraserEnabled
}
canvas.onmousedown = function (ev) {
  using = true
  var x = ev.clientX // x,y相对于视口的位置
  var y = ev.clientY
  console.log(eraserEnabled)
  if (eraserEnabled) {
    context.clearRect(x, y, 100, 100)
  } else {
    lastPoint = { x: x, y: y }
  }
}
canvas.onmousemove = function (ev) {
  var x = ev.clientX
  var y = ev.clientY
  if (using) { // 且状态与或状态
    if (eraserEnabled) {
      context.clearRect(x, y, 100, 100)
    } else {
      var newPoint = { x: x, y: y }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
}
canvas.onmouseup = function (ev) {
  using = false
}


function drawCircle(x, y, radius) { // x,y相对于画布的位置
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fillStyle = 'red'
  context.fill()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 4
  context.strokeStyle = 'red'
  context.lineTo(x2, y2)
  context.closePath()
  context.stroke()
}
function pageResize() {
  var pageWidth = document.documentElement.clientWidth // 获取页面宽高
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}
