$(function () {
  // 页头中，下拉内容显示与隐藏效果
  $('.apply-entrance').hover(function(){
    $('.apply-link-list', this).show();
    $(this).addClass('apply-entrance-hover')
  }, function(){
    $('.apply-link-list', this).hide();
    $(this).removeClass('apply-entrance-hover');
  })
  // 页头中，下拉图标展开与关闭产生的效果
  $('.apply-entrance').hover(function(){
    $('.icon-rotate', this).css({transform: 'rotate(180deg)'});
  }, function(){
    $('.icon-rotate', this).css({transform: 'rotate(0deg)'})
  })
  // 下拉显示二维码
  $('.icon').hover(function(){
    $('.icon-up-solid', this).hide();
    $('.icon-down-solid', this).show();
    $('.qrcode-wrap', this).show();
  }, function(){
    $('.icon-up-solid', this).show();
    $('.icon-down-solid', this).hide();
    $('.qrcode-wrap', this).hide();
  })
})