// 分页
// 当前页、下一页、 上一页、跳转到第几页、添加删除某页、修改某页
// pageSize, 页总数
var Pages = (function () {
  // var $items = $('.task-card');
  // var pageSize = 3;
  // var total = Math.ceil($items.length / pageSize);
  // var nthPage = [];
  // for (var i = 0; i < total; i++) {
  //   var end = (i + 1) * pageSize;
  //   var start = end - pageSize + 1;
  //   var tmp = []
  //   for (var j = start - 1; j < end; j++) {
  //     if ($items.eq(j).length) tmp.push($items.eq(j))
  //   }
  //   nthPage.push(tmp)
  // }

  return {
    pageSize: 3,
    total: 0,
    current: 0,
    next: 1,
    prev: -1,
    nthPage: [],
    currentPage: [],
    nextPage: [],
    prevPage: [],
    init: function ($items, pageSize) {
      if (!$items) return [];
      // 初始化参数
      this.pageSize = pageSize || 3;
      this.total = Math.ceil($items.length / this.pageSize);
      for (var i = 0; i < this.total; i++) {
        var end = (i + 1) * this.pageSize;
        var start = end - this.pageSize + 1;
        var tmp = [];
        for (var j = start - 1; j < end; j++) {
          if ($items.eq(j).length) tmp.push($items.eq(j))
        }
        this.nthPage.push(tmp);
      }
      // 第一页为默认当前页
      this.current = 0;
      this.currentPage = this.nthPage[0] || [];
      // 下一页
      this.next = this.current + 1;
      this.nextPage = this.nthPage[this.next] || [];
      // 上一页
      this.prev = this.current - 1;
      this.prevPage = this.nthPage[this.prev] || [];
    },
    next: function () {
      this.current = this.current + 1;
      this.next = this.current + 1;
      this.prev = this.current - 1;
      this.currentPage = this.nthPage[this.current];
      this.nextPage = this.nthPage[this.next];
      this.prevPage = this.nthPage[this.prev];
    },
    prev: function () {
      this.current = this.current - 1;
      this.next = this.current + 1;
      this.prev = this.current - 1;
      this.currentPage = this.nthPage[this.current];
      this.nextPage = this.nthPage[this.next];
      this.prevPage = this.nthPage[this.prev];
    },
    // 根据序号，获取序号所在页中所有的items
    // index: item的序号
    getNthPageItems: function (index) {
      // 不在范围内
      if (index < 0 || index > this.total * this.pageSize) return [];
      var pageNo = -1;
      for (var i = 0; i < this.total; i++) {
        if (index <= this.pageSize * (i + 1)) {
          pageNo = i;
          break;
        }
      }
      return this.nthPage[pageNo];
    },
    // 根据序号，获取该item
    getItemsByIndex: function (index) {
      var newArray = [];
      for (var i = 0; i < this.total; i++) {
        newArray = newArray.concat(this.nthPage[i]);
      }
      return newArray[index];
    }

  }

})();
Pages.init($('.task-card'));
// 置顶与取消置顶
// targetEle: 要置顶或要取消置顶的jQuery对象，parent: 元素的父元素jQuery对象, isSetTop: 是否置顶
// 元素自定义特性card-index用来记录初始时位置
function setOrCancelTop($targetEle, $parent, isSetTop) {
  var initIndex = $targetEle.attr('card-index');
  // isSetTop缺省时为true
  if (isSetTop == null) isSetTop = true;
  if (isSetTop) {
    // 置顶，元素排在第一位；页码跳转第一页
    Pages.nthPage()
  } else {
    // 取消置顶，元素位置回到初始位置； 页码跳转至初始位置所在页

  }
}

$(function () {
  $('.apply-entrance').hover(function () {
    $('.apply-link-list', this).show();
    $(this).addClass('apply-entrance-hover')
  }, function () {
    $('.apply-link-list', this).hide();
    $(this).removeClass('apply-entrance-hover');
  })
  // ------- 个人中心 ---------//
  // tab页切换
  $('#nav-all,#nav-pay,#nav-study,#nav-sale').click(function () {
    var idVal = $(this).attr('id');
    var cls = 'active';
    $(this).siblings('li').removeClass(cls);
    $(this).addClass(cls);
    $('div[nav-id]').hide();
    $('div[nav-id=' + idVal + ']').show();
  })
  // 课程滑动效果
  $('.task-slide-card .card-title').click(function () {
    $(this).siblings('.card-content').slideToggle();
  })
  // 左侧导航
  $('li[to-content-id]').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('to-content-id');
    $('div[content-id]').hide();
    var tObj = $('div[content-id]').filter(function () {
      return $(this).attr('content-id') === id;
    });
    tObj.show();

  })
  // ------------------ 
  // 页头中，下拉图标展开与关闭产生的效果
  $('.apply-entrance').hover(function () {
    $('.icon-rotate', this).css({ transform: 'rotate(180deg)' });
  }, function () {
    $('.icon-rotate', this).css({ transform: 'rotate(0deg)' })
  })
  // 下拉图标展开与关闭的产生的效果
  $('.left-nav-content_schedule .integral-item').click(function () {
    // matrix( 1 , 0 , 0 , 1 , 0 , 0 ) ,第三个参数代表rotate
    var flag = $('.icon-rotate', this).css('transform').replace(/[^0-9\-,]/g, '').split(',')[2] >= 0
    if (flag) {
      $('.icon-rotate', this).css({ transform: 'rotate(180deg)' });
    } else {
      $('.icon-rotate', this).css({ transform: 'rotate(0)' });
    }
    $('.integral').toggle();

  });
  $('.task-card-list .task-card').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var $dataCourse = $('[data-course]');
    var cValue = $(this).attr('data-course__id')
    $dataCourse.hide();
    $dataCourse.filter(function () {
      return $(this).attr('data-course') == cValue;
    }).eq(0).show();
  })
  // 置顶
  $('.task-card .set-top').click(function (event) {
    // ”置顶“与”取消置顶“文本切换
    var on = $(this).children().eq(0);
    var off = $(this).children().eq(1);
    if (on.is(':hidden')) {
      on.show();
      off.hide();
    } else {
      off.show();
      on.hide();
    }
    // 点击“置顶”，阻止事件冒泡
    event.stopPropagation();
    // 获取所在task-card元素
    var pa = $(this).parent('.task-card');
    // 获取task-card元素的父元素
    var ppa = pa.parent();
    // 元素中自定义特性card-index用来记录初始时位置
    var cIndex = parseInt(pa.attr('card-index'));
    var pageSize = 3;
    var total = Math.ceil($('.task-card').length / pageSize);
    // 获取同胞元素
    var siblings = pa.siblings();
    // 课程班级信息、任务信息
    var $dataCourse = $('[data-course]');
    var cValue = pa.attr('data-course__id');
    $dataCourse.hide();
    $dataCourse.filter(function () {
      return $(this).attr('data-course') == cValue;
    }).eq(0).show();

    pa.addClass('active');
    pa.siblings().removeClass('active');
    if (off.is(':visible')) {
      // 元素置顶，置顶后默认选中
      siblings.eq(0).before(pa);
      ppa.children().hide();
      for (var i = 0; i < 3; i++) {
        ppa.children().eq(i).show();
      }
      $('.btn-prev').attr({ 'current-page': 1 });
      $('.btn-next').attr({ 'current-page': 1 });
    } else {
      // 取消置顶，取消后该元素恢复初始位置，且默认选中
      // 元素中自定义特性card-index用来记录初始时位置
      if (pa.index() !== cIndex) {
        var tmp = ppa.children().filter(function () {
          return parseInt($(this).attr('card-index')) == cIndex - 1;
        }).eq(0);
        tmp.after(pa);
        ppa.children().hide();
        var pageNo = -1;
        for (var j = 0; j < total; j++) {
          if (cIndex <= pageSize * (j + 1) - 1) {
            pageNo = j;
            break;
          }
        }
        var end = (pageNo + 1) * pageSize;
        var start = end - pageSize + 1;
        for (var z = start - 1; z < end; z++) {
          ppa.children().eq(z).show();
        }
        $('.btn-prev').attr({ 'current-page': pageNo + 1 });
        $('.btn-next').attr({ 'current-page': pageNo + 1 });
      }
    }
  })
  // 前一页
  $('.btn-prev').click(function () {
    // 每页显示的个数
    var pageSize = 3;
    // 当前页码
    var curPage = parseInt($(this).attr('current-page'));
    // 总页数
    var totalPages = parseInt($(this).attr('total-pages'));
    var cards = $('.task-card-list .task-card');
    var $dataCourse = $('[data-course]');
    if (curPage > 1) {
      // 前一页起始、结束的条目序号
      var end = (curPage - 1) * pageSize;
      var start = end - pageSize + 1;
      // 取条目时是从0开始的，即eq(0)代表序号为1的条目
      for (var i = start - 1; i <= end - 1; i++) cards.eq(i).show();
      cards.eq(start - 1).prevAll().hide();
      cards.eq(end - 1).nextAll().hide();
      // 修改”前-页“/”下一页“的当前页码
      $(this).attr({ 'current-page': curPage - 1 });
      $(this).siblings('.btn-next').attr({ 'current-page': curPage - 1 });
      // 每页的第1个条目默认选中
      cards.removeClass('active');
      cards.eq(start - 1).addClass('active');
      // 课程班级信息、任务等显示
      var cValue = cards.eq(start - 1).attr('data-course__id')
      $dataCourse.hide();
      $dataCourse.filter(function () {
        return $(this).attr('data-course') == cValue;
      }).eq(0).show();
    }

  })
  $('.btn-next').click(function () {
    // 每页显示的个数
    var pageSize = 3;
    // 当前页码
    var curPage = parseInt($(this).attr('current-page'));
    // 总页数
    var totalPages = parseInt($(this).attr('total-pages'));
    var cards = $('.task-card-list .task-card');
    var $dataCourse = $('[data-course]');
    if (curPage < totalPages) {
      // 下一页起始、结束的条目序号
      var end = (curPage + 1) * pageSize;
      var start = end - pageSize + 1;
      // 取条目是从0开始的，即eq(0)代表序号为1的条目
      for (var i = start - 1; i <= end - 1; i++) cards.eq(i).show();
      cards.eq(start - 1).prevAll().hide();
      cards.eq(end - 1).nextAll().hide();
      // 修改"前一页" / "下一页“的当前页码
      $(this).attr({ 'current-page': curPage + 1 });
      $(this).siblings('.btn-prev').attr({ 'current-page': curPage + 1 });
      // 每页的第1个条目默认选中
      cards.removeClass('active');
      cards.eq(start - 1).addClass('active');
      // 课程班级信息、任务等显示
      var cValue = cards.eq(start - 1).attr('data-course__id')
      $dataCourse.hide();
      $dataCourse.filter(function () {
        return $(this).attr('data-course') == cValue;
      }).eq(0).show();
    }
  })
  // 移出课程
  $('.del-course').click(function () {
    // 当前删除链接所在的课程卡片的详细内容
    var $this = $(this).parents('[data-course]');
    // 获取课程卡片id值
    var value = $this.attr('data-course');
    // 轮播中的所有的课程卡片
    var $dataCourseId = $('[data-course__id]');
    // 要移除的课程卡片
    var $thisCourseId = $dataCourseId.filter(function () {
      return $(this).attr('data-course__id') == value;
    }).eq(0);
    // 获取所有的课程卡片的详细内容
    var $dataCourse = $('[data-course]');
    // 第一个隐藏课程卡显示
    var $fisrtHidObj = $dataCourseId.filter(function (index) {
      return $(this).is(':hidden')
    }).eq(0);
    var index = $dataCourseId.index($fisrtHidObj[0]);
    $fisrtHidObj.show();
    var i = $dataCourseId.index($thisCourseId[0]);
    // 后一个同胞
    i++;
    if (i <= $dataCourseId.length - 1) {
      $thisCourseId.siblings().removeClass('active');
      $dataCourseId.eq(i).addClass('active');
    }
    // 该课程卡包含班级信息、任务信息的详细内容显示
    $dataCourse.hide();
    $dataCourse.eq(index).show();
    // 移除
    $this.remove();
    $thisCourseId.remove();

  })
  $('#guide-btn').click(function () {
    $('#guide-intro-container').hide();
  })
  // 显示更多
  $('.info-item.more-li a').click(function () {
    var $parent = $(this).parent('.more-li');
    var $c = $parent.children('.more').eq(0);
    if ($c.is(':hidden')) {
      $c.show();
    } else {
      $c.hide();
    }
  })
  // 开启/关闭课程提醒
  $('.more .close-open a').click(function () {
    var $c = $(this).parent().children();
    $close = $c.eq(0);
    $open = $c.eq(1)
    if ($close.is(':hidden')) {
      $close.show();
    } else {
      $close.hide();
    }
    if ($open.is(':hidden')) {
      $open.show();
    } else {
      $open.hide();
    }
  })
  // 复选框选中
  $('.reason-item').click(function () {
    if ($(this).hasClass('checked')) {
      $(this).removeClass('checked');
    } else {
      $(this).addClass('checked');
    }
  });
  // 投诉
  $('.submit,.close-btn').click(function () {
    $('.complain-container').hide();
  })
  $('.complain').click(function () {
    $('.complain-container').show();
  })
  // 字符限制
  $('.char-limit').keyup(function () {
    var value = $(this).val();
    var length = $(this).attr('maxlength');
    if (value.length > length) {
      value = value.substr(0, length);
      $(this).val(value);
    }
    var count = value.length;
    var $count = $('.word-num .count');
    $count.html(count);
    if (length - count <= 10) {
      if(!$count.hasClass('warning')) $count.addClass('warning');
    } else {
      if($count.hasClass('warning')) $count.removeClass('warning');
    }
  })
})