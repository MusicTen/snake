/**
 * Created by 17654 on 2018/4/24.
 */
function Food(options) {
  var options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 20;
  this.height = options.height || 20;
  this.bgc = options.bgc || 'green'
}
Food.prototype.render = function (target) {
  //创建食物
  var foodElement = document.createElement('div');

  this.foodElement = foodElement

  foodElement.style.position = 'absolute'
  foodElement.style.borderRadius = '50%'
  foodElement.style.width = this.width + 'px'
  foodElement.style.height = this.height + 'px'
  foodElement.style.backgroundColor = this.bgc
  //设置坐标
  this.x = parseInt(Math.random() * (target.offsetWidth / this.width));
  this.y = parseInt(Math.random() * (target.offsetHeight / this.height));
  foodElement.style.left = this.x * this.width + 'px';
  foodElement.style.top = this.y * this.height + 'px';
  target.appendChild(foodElement);
}