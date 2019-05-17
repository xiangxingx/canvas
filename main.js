var div = document.getElementById('canvas')
div.onmousedown = function (ev) {
  var div1 = document.createElement('div')
  div.appendChild(div1)
  var x = ev.clientX
  var y = ev.clientY
  div1.style.left = x+3 + 'px'
  div1.style.top = y+3 + 'px'
  //console.log(div1)
}
div.onmousemove = function () {

}
div.onmouseup = function () {

}