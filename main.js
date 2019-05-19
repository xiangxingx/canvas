var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas)

listenToUser(canvas)

var eraserEnabled = false // 状态锁
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

black.onclick = function () {
  context.strokeStyle = 'black'
  strokeColor(black, red, green, blue)
}
red.onclick = function () {
  context.strokeStyle = 'red'
  strokeColor(red, black, green, blue)
}
green.onclick = function () {
  context.strokeStyle = 'green'
  strokeColor(green, black, red, blue)
}
blue.onclick = function () {
  context.strokeStyle = 'blue'
  strokeColor(blue, black, red, green)
}

function strokeColor(addClass, rmClass1, rmClass2, rmClass3) {
  addClass.classList.add('active')
  rmClass1.classList.remove('active')
  rmClass2.classList.remove('active')
  rmClass3.classList.remove('active')
}

function listenToUser(canvas) {
  var lastPoint = { x: undefined, y: undefined }
  var using = false // 状态锁，用状态控制事件的发生

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (ev) {
      using = true
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
      if (eraserEnabled) {
        context.clearRect(x, y, 100, 100)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function (ev) {
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
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
    canvas.ontouchend = function (ev) {
      using = false
    }

  } else {
    canvas.onmousedown = function (ev) {
      using = true
      var x = ev.clientX // x,y相对于视口的位置
      var y = ev.clientY
      //console.log(eraserEnabled)
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
