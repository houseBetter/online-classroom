// 图片轮播
// 第一个参数-要动的jquery对象，第二个参数位移
function animate(obj, target) {
  // 首先清除掉定时器
  clearInterval(obj.timer);
  // 用来判断 是+ 还是 -  即说明向左走还是向右走
  var speed = -15;
  obj.timer = setInterval(function () {
    var result = target - obj.offset().left;//它们的差值不会超过speed
    var c = -obj.offset().left + speed;
    obj.css({ left: c + 'px' });
    // 有可能有小数的存在，所以在这里要做个判断             
    if (Math.abs(result) <= Math.abs(speed)) {
      clearInterval(obj.timer);
      obj.css({ left: target + 'px' });
    }
  }, 10);
  // var speed = -15;
  // var timer = setInterval(function () {
  //   obj.css({ left: speed + 'px' });
  //   speed = speed - 15;
  //   if(Math.abs(speed) > Math.abs(target)) clearInterval(timer);
  // }, 10);
}

function carousel() {
  // 图片显示第几张，小圆点就要显示第几个，且小圆点样式改变
  // 鼠标滑到图片上，图片自动滚动停止；鼠标滑出图片，自动滚动
  // 小圆点列表
  var link = $('.pic-carousel .link-list');
  // 图片列表
  var pics = $('.pic-carousel .pic-list');
  // 1. 删除子节点
  // 保证重新动态生成的子节点个数不混乱
  link.empty();
  // 2. 动态生成小圆点
  // 根据图片个数，生成相同个数的小圆点，加上默认样式；并加入到圆点列表中
  $('.pic-carousel .pic-list').children().each(function () {
    link.append($('<div></div>').addClass('link'));
  });
  // 3. 自动轮播
  // 设置定时器, 图片显示第几张，小圆点就要显示第几个，且小圆点样式改变
  // 图片序号
  var index = 0;
  var key = 0;
  var circle = 0;
  var imgWidth = -1200;
  var timer = setInterval(function () {
    //   // 滚动到最后一张，图片从第一张开始
    //   if (index > pics.children().length - 1) {
    //     index = 0;
    //   }
    //   animate(pics, (index++) * imgWidth);
    /*自动轮播时,要对播放的张数key进行一个判断,如果播放的张数超过ulLis.length-1,
              就要重头开始播放.  因为我们克隆了第一张并将其放在最后面,所以我们要从第二张图片开始播放*/
    key++; // 先++
    if (key > pics.children().length - 1) {// 后判断

      pics.css({left: 0}); // 迅速调回
      key = 1; // 因为第6张是第一张，所以播放的时候是从第2张开始播放
    }
    // 动画部分
    animate(pics, key * (-1200));
    // 小圆点circle   当显示第几张图片是，对应的小圆点的颜色也发生变化 

    /*同理,对小圆点也要有一个判断*/
    circle++;
    if (circle > link.children().length - 1) {
      circle = 0;
    }
    // 小圆点颜色发生变化
    for (var i = 0; i < link.children().length; i++) {
      // 先清除掉所用的小圆点类名
      link.children().eq(i).css({className: 'link'});
    }
    // 给当前的小圆点 添加一个类名
    link.children().eq(i).css({className: 'current'});

  }, 1000)



}
$(function () {
  // carousel();
  $(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    if(scrollTop >= 440){
      $('#tab').addClass('fixed');
    } else {
      $('#tab').removeClass('fixed');
    }
  })
  $('[tab-name]').click(function(){
    // tab标签切换
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    // tab内容切换
    var tabName = $(this).attr('tab-name');
    $('[tab-content]').hide();
    $('[tab-content]').filter(function(){
      return $(this).attr('tab-content') == tabName;
    }).show();
  })
})