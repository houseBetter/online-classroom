$(function(){
  // 目录显示与隐藏
  $('.category').click(function(){
    if($('.cate-content').is(':hidden')) {
      $('.cate-content').show();
    } else {
      $('.cate-content').hide();
    }
  })
  $('.item-list .item').hover(function(){
    $('.popup', this).show();
  }, function(){
    $('.popup', this).hide();
  })
})