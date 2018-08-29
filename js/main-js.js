
function planeShow() {
  $('#js-jump-to-top').addClass('mod-side-operation__jump-to-top-hover');
  // 先stop()，防止动画积累
  $('#js-plane').stop().animate({ top: '0' })
  // $('#js-plane').css('top', '56px').animate({top: '0'});
}
function planeHide() {
  $('#js-jump-to-top').removeClass('mod-side-operation__jump-to-top-hover');
  $('#js-plane').stop().css({ top: '56px' });
}
function planeToTop() {
  var o = $('#js-side-operation').offset().top;
  var p = $("#js-jump-plan-container");
  // var c = $('#js-jump-container');
  // var v = $('#js-plane');
  p.css({ overflow: 'visible' });
  p.animate({ top: -o - 500 + 'px' });
  setTimeout(function () {
    // 滚动条移到顶端
    $('body').animate({ scrollTop: 0 }, function () {
      p.css({ overflow: 'hidden', top: '-7px' });
    });
  }, 50)
}
// 课程分类相关
function boxShadowShow() {
  $('#header-class').addClass('header-class-hover');
  $('#index-cate').show();
}
function boxShadowHide() {
  $('#header-class').removeClass('header-class-hover');
  $('#index-cate').hide();
}
function searchTypeDropDownSelect() {
  var items = $('#mod-search-dropdown .mod-search-dropdown-item');
  var s = items.eq(1);
  var s0 = items.eq(0).children();
  var cls = 'mod-search-dropdown-hover';
  s0.animate({}, function () {
    if (s.hasClass(cls)) s0.css({ transform: 'rotate(0)' })
    else s0.css({ transform: 'rotate(180deg)' })
  });
  s.hasClass(cls) ? s.removeClass(cls) : s.addClass(cls);
}
// 我要讲课
function lectureTypeDropDownShow() {
  var a = $('#apply-entrance');
  var i = $('#apply-entrance i');
  var list = $('#apply-entrance .apply-link-list');
  var cls = 'apply-entrance-hover';
  a.addClass(cls);
  list.show();
  // i.animate({}, function () {
  //   i.css({ transform: 'rotate(180deg)' })
  // })
  i.css({ transform: 'rotate(180deg)' })
}
function lectureTypeDropDownHide() {
  var a = $('#apply-entrance');
  var i = $('#apply-entrance i');
  var list = $('#apply-entrance .apply-link-list');
  var cls = 'apply-entrance-hover';
  a.removeClass(cls);
  list.hide();
  // i.animate({}, function () {
  //   i.css({ transform: 'rotate(0)' })
  // })
  i.css({ transform: 'rotate(0)' })
}
function hotSearchShow() {
  $('#header-index-hot').show();
}
function hotSearchHide() {
  $('#header-index-hot').hide();
}

function tabSelected() {
  $('#cate-tab-list .cate-tab-item.active').removeClass('active');
  $(this).addClass('active');
}
function interestPaneShow() {
  $('.main-category').show();
}
function interestPaneHide() {
  $('.main-category').hide();
}
function countDown(classTimeStr) {
  return function () {
    // 检验时间格式，格式满足YYYY/MM/DD HH:MM:SS
    // 时间字符串转时间的日期
    var pattern = /^\d{4}\/\d{1,2}\/\d{1,2} \d{2}:\d{2}:\d{2}$/;
    if (pattern.exec(classTimeStr)) return null;
    var arry = [];
    var now = new Date();
    var classTimeDate;
    var countDownTime = -1;
    var days = -1, hours = -1, minutes = -1, seconds = -1;
    classTimeDate = new Date(classTimeStr);
    countDownTime = classTimeDate.getTime() - now.getTime();
    if (countDownTime < 0) {
      $('#course-status p.text').hide();
      $('#course-status p.living').show();
      return null;
    }
    day = Math.floor(countDownTime / 1000 / 60 / 60 / 24);
    hours = Math.floor((countDownTime - day * 1000 * 60 * 60) / 1000 / 60 / 60);
    minutes = Math.floor((countDownTime - day * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60) / 1000 / 60);
    seconds = Math.floor((countDownTime - day * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
    var s = '';
    if (day) {
      s = '<span>&nbsp;' + day + '&nbsp;</span>天';
    } else {
      s = '<span>&nbsp;' + hours + '&nbsp;</span>时' +
        '<span>&nbsp;' + minutes + '&nbsp;</span>分' +
        '<span>&nbsp;' + seconds + '&nbsp;</span>秒'
    }
    $('#course-status p.living').hide();
    $('#course-status p.text').show();
    $('#course-status p.text').html(
      '距离上课&nbsp;' + s
    )
  }
}
function classSignUpPaneShow() {
  $('#tips-buy-course').show();
}
function classSignUpPaneHide() {
  $('#tips-buy-course').hide()
}
function taskItemHover() {
  var cls = 'task-item--active';
  $('.task-item').removeClass(cls);
  $(this).addClass(cls);
}
// 判断是否兼容webp格式的图片
function checkWebp() {
  try {
    return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
  } catch (err) {
    return false;
  }
}
// webp格式不兼容，转换成png
function consvertPng() {
  var flag = checkWebp();
  if (!flag) {
    $('img').each(function () {
      var src = $(this).attr('src');
      if (typeof src != 'undefined') {
        src = src.replace('.webp', '.png');   //将webp格式转换成jpg格式
        $(this).attr('src', src);
      }
    })
  }
}
$(function () {
  // webp格式图片不兼容下，转换成png图片
  consvertPng();
  if (!$('body').scrollTop()) $('#js-jump-container').hide();
  // ---------------- 滚动条监听 ----------------//
  $(window).on('scroll', function () {
    var top = $('body').scrollTop();

    var c = $('#js-jump-container');
    if (top <= 0) {
      // c.hide();
      c.fadeOut(1000);
    } else {
      // c.show();
      c.fadeIn(1000);
    }
  });

  // 在“回到Top”图标上的效果
  // 鼠标悬停、移出及点击事件
  $('#js-jump-container').hover(planeShow, planeHide);
  $('#js-jump-container').click(planeToTop);

  // 课程分类效果
  var hc = $('#header-class');
  var ic = $('#index-cate');
  var li = $('#index-cate .mod-nav__li');
  var s = $('#index-cate .mod-nav__wrap-nav-side');
  hc.hover(boxShadowShow, boxShadowHide);
  li.hover(function () {
    s.css({ display: 'none' });
    var index = li.index(this);
    var jObj = s.eq(index);
    jObj.show();
  }, function () {
    var index = li.index(this);
    var jObj = s.eq(index);
    jObj.hide();
  });
  s.hover(function () {
    $(this).show();
  }, function () {
    $(this).hide();
  })

  // 搜索-搜索类型下拉框
  $('#mod-search-dropdown').click(searchTypeDropDownSelect);
  // 搜索-热门搜索
  $('#mod-search_input').click(hotSearchShow);
  $('#mod-search_input').focusout(hotSearchHide)

  // 我要课下拉框
  $('#apply-entrance').hover(lectureTypeDropDownShow, lectureTypeDropDownHide);

  // ---------- 首页-类目导航 -------------//
  // 类目导航
  $('#cate-tab-list .cate-tab-item').click(tabSelected);
  $('#btn-cate-tab-edit').click(interestPaneShow);
  $('.btn-default').click(interestPaneHide);
  // ---------- 精选直播课 -----------//
  // 直播倒计时
  var countDownTimer = setInterval(countDown('2018/8/16 9:00:00'), 500);
  // 立即报名
  $('#course-apply').click(classSignUpPaneShow);
  $('#btn-close,#sign-up,#cancel').click(classSignUpPaneHide);
  $('.task-item').mouseover(taskItemHover);
  // ---------- 登录 -------------//
  $('#mod-entry-login,#header-login').click(function () {
    $('.login-wrap').show();
  })
  // 鼠标移动到二维码图片上，出现另一张图片
  var imgTimer;
  $('.img-group').hover(function () {
    var $img = $('.qr-img', this);
    var $phone = $('.qr-phone', this);
    $img.stop().animate({ left: '-74px' }, function () {
      $phone.stop().fadeIn();
    })
    imgTimer = setTimeout(function () {
      $phone.fadeOut(function () {
        $img.animate({ left: '0' })
      })
    }, 2000);
  }, function () {
    clearTimeout(imgTimer);
    var $img = $('.qr-img', this);
    var $phone = $('.qr-phone', this);
    $phone.stop().fadeOut(function () {
      $img.stop().animate({ left: '0' })
    });
  });

  // 标签页切换
  $('.mod-login .tab .tab-item').click(function () {
    $('.mod-login .tab .tab-item').removeClass('active');
    $(this).addClass('active');
    if ($(this).hasClass('qq')) {
      $('.mod-login .qr-code .weixin-block').hide();
      $('.mod-login .qr-code .qq-block').show();
    } else {
      $('.mod-login .qr-code .qq-block').hide();
      $('.mod-login .qr-code .weixin-block').show();
    }
  })
  $('#close-icon').click(function () {
    $('.login-wrap').hide();
    $('.mod-login .tab .tab-item').removeClass('active');
    $('.mod-login .tab .tab-item.qq').addClass('active');
    $('.mod-login .qr-code .weixin-block').hide();
    $('.mod-login .qr-code .qq-block').show();
    $('.mod-entry-user--unlogin').hide();
    $('.mod-entry-user--login').show();
  })
  // ------------------ //
  // 跳转到“我的课程”
  $('#myclass-html').click(function () {
    window.open('./html/personal-center.html', '_blank');
  })
  // 精选直播课右侧列表链接
  $('[course-link]').click(function () {
    if ($(this).attr('course-link') == 'true') {
      window.open('./html/course-fire-control.html', '_blank');
    }
  })
  // 退出
  $('.logout').click(function(){
    $('.mod-entry-user--login').hide();
    $('.mod-entry-user--unlogin').show();
  });
  // 修改兴趣中，兴趣选中取消
  $('.small-category-item').click(function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });
})