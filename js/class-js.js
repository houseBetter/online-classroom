
$(function () {
  // 面包屑导航点击效果
  $('.breadcrumbs-list .breadcrumb').click(function () {
    // 如： 全部课程 > IT·互联网 > 云计算大数据 >
    // 如果点击的是当前一级，如点击“云计算大数据”，则紧邻其后的 “>"不隐藏
    if ($(this).next().next().length !== 0) $(this).next().nextAll().hide();
  })
  // 下拉框展开/关闭时，下拉框箭头的变化
  $('#sort-checkbox-list').hover(
    function () {
      $('#sort-checkbox-list i').css({ transform: 'rotate(180deg)' });
    }, function () {
      $('#sort-checkbox-list i').css({ transform: 'rotate(0deg)' });
    })
  // 口录播 口直播 口有回放 口可试听 口资料 口习题，复选框事件
  // 以及 口认证课程 口正在直播
  $('#item--long__list .item--long__item,.checkbox-item').click(function () {
    var cls = 'sort-checkbox--checked';
    $(this).hasClass(cls) ? $(this).removeClass(cls) : $(this).addClass(cls);
  })
  // '全部'、'免费课'、'付费课'点击选中的效果
  $('.sort-one-item.item').click(function () {
    var cls = 'item--active';
    $('.sort-one-item.item').removeClass(cls);
    $(this).addClass(cls);
  })
  // “综合排序等”部份点击选中的效果
  $('.sort-two-item').click(function () {
    var cls = 'sort-two-item--active';
    var icls = 'i--active';
    $('.sort-two-item').removeClass(cls);
    $('.praise-rate i,.popularity i').removeClass(icls);
    var flag1 = $(this).children().is('.sort-link__rank');
    var flag2 = $(this).children().is('.praise-rate,.popularity');
    var flag3 = $(this).children().is('.sort-link__price');
    var flag4 = $(this).children().is('.dropdown-toggle');
    if (flag1) {
      $(this).addClass(cls);
    }
    if (flag2) {
      $(this).addClass(cls).find('i').addClass(icls);
    }
    if (flag3) {
      $(this).addClass(cls);
      var up = $(this).find($('.icon-up-solid'));
      var down = $(this).find($('.icon-down-solid'));
      if (up.hasClass(icls)) {
        up.removeClass(icls);
        down.addClass(icls);
      } else {
        up.addClass(icls);
        down.removeClass(icls);
      }
    }

  })
  // 分类中点击效果
  $('.category-item').click(function () {
    var cls = 'category-item--active';
    $('.category-item').removeClass(cls);
    $(this).addClass(cls);
  })
  // 价格区间选择事件
  $('.price-list .price-item a').click(function () {
    // 获取当前子元素<a>的文本
    var text = $(this).text();
    if (text.trim() === '不限') {
      // 选择‘不限’时，显示‘价格区间
      text = '价格区间';
    }
    // 获取子元素，不包括this的文本）
    var t2 = $('#js-rank').children();
    // 将新的文本text和下拉框箭头放到一个临时的div里
    // 再通过.html()取出来
    var tmp = $('<div></div>');
    tmp.append(text).append(t2);
    $('#js-rank').html(tmp.html());
    tmp = null;
    $('#price-rank').hide();
  })
  $('.dropdown-wrap').hover(function () {
    $('#price-rank').show();
  }, function () {
    $('#price-rank').hide();
  })
  // 价格区间，自定义价格区间值效果
  $('.btn-confirm').click(function () {
    // 获取输入的最小值
    var min = $(this).siblings('input').eq(0).val();
    // 获取输入的最大值
    var max = $(this).siblings('input').eq(1).val();
    // min、max都没有值，不触发修改
    // min > max，不触发修改
    // min为空, max有值，触发修改，且min缺省值为0
    // min有值，max为空，触发修改
    // 是否触发修改
    var flag = false;
    if (!min && !max || (max && (min > max))) {
      flag = false;
    } else if (!min && max) {
      min = 0;
      flag = true;
    } else if (min && !max) {
      flag = true;
    } else if(min <= max) {
      flag = true;
    }

    if (flag) {
      text = min + ' - ' + max;
      // 获取价格区间子元素，即下拉图标元素
      var t2 = $('#js-rank').children();
      // 创建一个临时节点
      var tmp = $('<div></div>');
      tmp.append(text).append(t2);
      $('#js-rank').html(tmp.html());
      tmp = null;
      $('#price-rank').hide();
      // 输入框的值清空
      $(this).siblings('input').val('');
    }

  });
  // '直播中'、'进入课堂'切换
  var enterArrowTimer = null;
  $('.course-card-item').hover(function(){
    var h = $('.course-classroom .slide-block', this).children().eq(0).height();
    $('.course-classroom .slide-block', this).animate({ marginTop: '-' + h + 'px' }, 10);
    if($('.course-classroom', this).length) {
      enterArrowTimer = setInterval(function(){
        var a = $('.enter-arrow');
        a.css('margin-left') == '3px' ? a.css({marginLeft: '5px'}) : a.css({marginLeft: '3px'});
      },500);
    }
  }, function(){
    $('.course-classroom .slide-block', this).stop().animate({ marginTop: '0' }, 10);
    clearInterval(enterArrowTimer);
    $('.enter-arrow').css({marginLeft: '3px'});
  })
})