$(function(){
  // 咨询按钮显示‘在线’、‘电话’效果
  $('.btn-group-a.btn-ask').hover(function(){
    $('.contanct', this).show();
  },function(){
    $('.contanct', this).hide();
  })
  // ‘全部’、'收起'切换效果
  $('.box-dropdown').click(function(){
    // 点击下拉图标，'全部'与'收起'切换
    var hEle = $(this).children(':hidden').eq(0);
    $(this).children().hide();
    hEle.show();
    var parent = $(this).parent('.keyword-box');
    var ofValue = parent.css('overflow') == 'hidden' ? 'visible' : 'hidden';
    parent.css({overflow: ofValue});
  })
  // 导航栏固定
  $(window).scroll(function(){
    var $tab = $('.nav-tabs');
    var sTop = $(this).scrollTop();
    var cls = 'nav-fixed';
    if(sTop > 529) {
      $tab.addClass(cls);
      $('.center', $tab).css({width: '1200px'});
    } else {
      $tab.removeClass(cls);
      $('.center', $tab).css({width: '100%'});
    }
  })
  // 导航栏标签切换
  $('[tab-name]').click(function(){
    var cls = 'tab--active';
    // tab之间切换
    $(this).siblings().removeClass(cls);
    $(this).addClass(cls);
    // 内容之间切换
    var content = $(this).attr('tab-name');
    var $cObjs = $('[tab-link-content]');
    // 所有内容隐藏
    $cObjs.hide();
    // tab指定的内容显示
    $cObjs.filter(function(){
      return $(this).attr('tab-link-content') === content;
    }).show();
    // 内容切换时，跳到当前内容开始处
    $('body').scrollTop(520);
  })
  // 举报
  $('.report').click(function(){
    $('.report-wrap').show();
  })
  $('.submit-btn,.title .icon-guanbi').click(function(){
    $('.report-wrap').hide();
  })
  // 收藏
  $('.i-shoucang').click(function(){
    var def = $(this).css('color');
    var color = $('i', this).css('color');
    // 红色: rgb(255, 0 , 0)
    var tmp = color == def ? 'red' : def;
    $('i', this).css({color: tmp});
  })
})
