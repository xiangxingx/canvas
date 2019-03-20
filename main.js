var canvas = document.getElementById('canvas')
function autoSetCanvasSize(canvas){
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }//获取页面宽高
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }

}

var context = canvas.getContext('2d');
var using = false
var lastPoint = {x: undefined, y: undefined}
//三个事件
//按下鼠标
canvas.onmousedown = function(a){
  var x = a.clientX
  var y = a.clientY
  if(eraserEnabled){
    using = true
    context.clearRect(x-2,y-2,10,10)
  }else{
    using = true
    lastPoint = {
      "x": x,
      "y": y
    }
  }
}

//移动鼠标
canvas.onmousemove = function(a){
  var x = a.clientX
  var y = a.clientY
  if(eraserEnabled){
    if(using){
      context.clearRect(x-2,y-2,10,10)
    }
  }else{
    if(using){
      newPoint = {
        "x": x, 
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
}
//松开鼠标
canvas.onmouseup = function(a){
  using = false
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.fillStyle = 'black'//点的颜色
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();//开始
  context.strokeStyle = 'black'//线的颜色
  context.moveTo(x1,y1)//起点
  context.lineWidth = 3//线宽
  context.lineTo(x2,y2)//终点
  context.stroke()//画线
  context.closePath()//结束
}


var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = !eraserEnabled
}