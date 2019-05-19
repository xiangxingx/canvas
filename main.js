var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');
var eraserEnabled = false

autoSetCanvasSize(canvas)
listenToUser(canvas)
setPenColor()

pen.onclick = function () {
  usePen()
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
clear.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}
download.onclick = function () {
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'My Paint'
  a.click()
}

var lastPoint = { x: undefined, y: undefined }
function listenToUser(canvas) {
  var using = false
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (ev) {
      using = true
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
      clearOrPoint(x, y)
    }
    canvas.ontouchmove = function (ev) {
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
      clearOrDraw(x, y, using)
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    canvas.onmousedown = function (ev) {
      using = true
      var x = ev.clientX // x,y相对于视口的位置
      var y = ev.clientY
      clearOrPoint(x, y)
    }
    canvas.onmousemove = function (ev) {
      var x = ev.clientX
      var y = ev.clientY
      clearOrDraw(x, y, using)
    }
    canvas.onmouseup = function () {
      using = false
    }
  }
}

// 画线
function drawLine(x1, y1, x2, y2) { // x,y相对于画布的位置
  context.beginPath()
  context.lineWidth = 4
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.closePath()
  context.stroke()
}
// 设置canvas宽高
function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () { //onresize 调整大小
    setCanvasSize()
  }
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth // 获取页面宽高
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
//绘制或清除坐标点
function clearOrPoint(x, y) {
  if (eraserEnabled) {
    context.clearRect(x, y, 100, 100)
  } else {
    lastPoint = { x: x, y: y }
  }
}
//绘制或清除线
function clearOrDraw(x, y, using) {
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
// 设置画笔颜色
function setPenColor() {
  black.onclick = function () {
    context.strokeStyle = 'black'
    chooseColor(black, red, green, blue)
  }
  red.onclick = function () {
    context.strokeStyle = 'red'
    chooseColor(red, black, green, blue)
  }
  green.onclick = function () {
    context.strokeStyle = 'green'
    chooseColor(green, black, red, blue)
  }
  blue.onclick = function () {
    context.strokeStyle = 'blue'
    chooseColor(blue, black, red, green)
  }
  function chooseColor(addClass, rmClass1, rmClass2, rmClass3) {
    addClass.classList.add('active')
    rmClass1.classList.remove('active')
    rmClass2.classList.remove('active')
    rmClass3.classList.remove('active')
    usePen()
  }
}
//使用画笔
function usePen() {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}