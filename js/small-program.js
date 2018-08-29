$(function(){
  // 出现固定导航栏
  $('.top-nav').scroll(function(){
    debugger
    var fixed = 'top-nav-position-fixed';
    var absoluted = 'top-nav-position-absoluted';
    var top = $('#offical').offset.top;

    if(top <= 0) {
      $(this).removeClass(absoluted).addClass(fixed);
    } else {
      $(this).removeClass(fixed).addClass(absoluted);
    }
  })
})