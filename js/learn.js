$(function(){
  $(window).scroll(function(){
    var sTop = $(this).scrollTop();
    var cls = 'fixed';
    if(sTop > 80) {
      $('.task-header-fixed').addClass(cls).show();
    } else {
      $('.task-header-fixed').removeClass(cls).hide();
    }
  });
  // 点击快学吧、第5节，滚动相应内容处
  // 快学吧对应内容位置为top:142
  $('.c-txt').click(function(){
    var top = '142';
    $('body').animate({scrollTop: top}, 500)
    // $('body').scrollTop(top);
  });
  // 第5节对应内容位置为top: 642
  $('.nth-course').click(function(){
    var top = '642';
    // $('body').scrollTop(top);
    $('body').animate({scrollTop: top}, 500);
  })
})