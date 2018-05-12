function Snake(options) {
  options = options || {};
  this.nodeWidth = options.nodeWidth || 20;
  this.nodeHeight = options.nodeHeight || 20;
  this.headColor = options.headColor || 'red';
  this.bodyColor = options.bodyColor || 'blue';
  this.direction = options.direction || 'right'
  this.body = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
  ]
}
Snake.prototype.render = function (target) {
  for (var i = 0; i < this.body.length; i++) {
    var span = document.createElement('span')
    if (i === 0) {
      span.style.backgroundColor = this.headColor
    } else {
      span.style.backgroundColor = this.bodyColor
    }
    span.style.position = 'absolute';
    span.style.width = this.nodeWidth + 'px';
    span.style.height = this.nodeHeight + 'px';
    span.style.borderRadius = '50%';
    span.style.left = this.body[i].x * this.nodeWidth + 'px';
    span.style.top = this.body[i].y * this.nodeHeight + 'px';

    target.appendChild(span)
  }
}
// 让蛇移动, 两种方式:
//  1 分别移动蛇的每一节, 如果是往右走了一步, 相当于让每一节的x + 1
//  2 先在第一节之前添加一个新的节, 然后, 将最后一项删除
//    以 往右走 为例: 应该创建一个新的 { x: 第一节的x+1, y }
Snake.prototype.move = function (target, food) {
  var newNode = {
    x: this.body[0].x,
    y: this.body[0].y
  }

  // 蛇吃到自己,游戏结束
  for (var i = 4; i < this.body.length; i++) {
    if (newNode.x === this.body[i].x && newNode.y === this.body[i].y) {
      alert('Game over 吃到自己了~')
      clearInterval(timer)
      return
    }
  }

  switch (this.direction) {
    case 'up':
      newNode.y--
      break;
    case 'down':
      newNode.y++
      break;
    case 'left':
      newNode.x--
      break;
    case 'right':
      newNode.x++
      break;
  }

  // 蛇吃食物的逻辑 --> 应该放到蛇对象的move方法中来实现
  if (newNode.x === food.x && newNode.y === food.y) {
    // 1 吃掉食物, 蛇节增加一节, 这样就不用删除原来需要pop的那一节了
    // 2 将被吃掉的食物的DOM对象从页面中删除
    // 注意:先删除原来的食物DOM对象, 再新建食物DOM对象
    target.removeChild(food.foodElement)
    food.render(target)
  } else {
    this.body.pop();
  }
  this.body.unshift(newNode);

  var spans = document.getElementsByTagName('span')
  // 倒序遍历, 解决动态性的问题
  for (var i = spans.length - 1; i >= 0; i--) {
    map.removeChild(spans[i])
  }
  this.render(target)
}
