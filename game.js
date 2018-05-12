/**
 * Created by 17654 on 2018/4/25.
 */

// 1 创建构造函数
function Game(map) {
  this.food = new Food()
  this.snake = new Snake()
  this.map = map
}
// 2 给原型对象中添加 开始游戏 的方法
Game.prototype.start = function () {
  var that = this
  this.food.render(this.map)
  this.snake.render(this.map)

  // 2.1 给 document 绑定按键的事件, 来监听 上下左右 方向键按下的事件
  document.addEventListener('keyup',function (e) {
    switch(e.keyCode){
      case 38:
        if(that.snake.direction ==='down'){
          return
        }
        that.snake.direction = 'up'
        break
      case 40:
        if(that.snake.direction ==='up'){
          return
        }
        that.snake.direction = 'down'
        break
      case 37:
        if(that.snake.direction ==='right'){
          return
        }
        that.snake.direction = 'left'
        break
      case 39:
        if(that.snake.direction ==='left'){
          return
        }
        that.snake.direction = 'right'
        break
    }
  })
  // 3 设置定时器让蛇移动
  timer = setInterval(function () {
    that.snake.move(that.map,that.food)
    var head = that.snake.body[0]

    // 5 蛇撞墙后 游戏结束 的逻辑
    if(head.x < 0 || head.y < 0 || head.x > ((that.map.offsetWidth / that.snake.nodeWidth)-1) || head.y > ((that.map.offsetHeight / that.snake.nodeHeight)-1) ) {
      alert('Game Over，撞墙啦~')
      // 清理定时器
      clearInterval(timer)
    }
  },200)
}

  // 4 蛇吃食物的逻辑 --> 应该放到蛇对象的move方法中来实现
  // ...

