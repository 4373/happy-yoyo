
/**
 * Created by mh on 2016/9/15.
 */
define(function (require, exports) {
    //jquery
    var $ = require('./jquery-2.2.4.js');

    //工具类模块
    var tool = require('./common');

    //轮播图模块
    require('./swiper-3.3.1.jquery.min');

    //商品详情
    var detail = require('./detail');

    //购物车
    var shopcar=require('./shopcar');
    
    //加载热推商品
    function getHotGoods() {

        $.ajax({
            type: 'get',
            url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
            dataType: 'JSONP',
            success: function (data) {
                var dom = strToDom(data);
                $('.part1').find('.card-box').html(dom);
                $('.img-box').on('click', function () {
                    detail.detailOfgoodsID($(this).data('goodsid'));
                });
                clickCar();
            }
        })
    }

    //将数据渲染到dom ,返回dom字符串
    function strToDom(data) {
        var cardStr = '';
        for (var i = 0; i < data.length; i++) {
            cardStr += '<div class="card"><div class="img-box"  data-goodsid="' + data[i].goodsID + '"><img src="' + data[i].goodsListImg + '"/></div><div class="content"><p class="title">' + data[i].goodsName + '</p><p class="price"><span class="new-price">' + '￥' + data[i].price + '</span><span class="old-price">' + '￥' + tool.getOldPrice(data[i].price, data[i].discount) + '</span></p><p class="discount">' + data[i].discount + '折' + '</p></div><a href="javascript:;" class="buybtn iconfont icon-gouwuche" data-goodsid="' + data[i].goodsID + '"></i></a></div>'
        }



        return cardStr;
    }


    //初始化主页banner
    function initBanner() {

        $.ajax({
            type: 'get',
            dataType: 'JSONP',
            url: 'http://datainfo.duapp.com/shopdata/getBanner.php',
            success: function (data) {
                //加载数据
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    str += '<div class="swiper-slide" data-goodsid="' + data[i].goodsID + '"><img src="' + eval(data[i].goodsBenUrl)[0] + '"></div>'
                }
                $(".part1").find('.swiper-wrapper').html(str);
                //启动轮播图
                var mySwiper = new Swiper('.part1 .swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    // 如果需要分页器
                    pagination: '.swiper-pagination'

                })


                $('.part1').find('.swiper-slide').on('click', function () {
                    detail.detailOfgoodsID($(this).data('goodsid'));
                });


            }

        })


    }

    //获取搜索历史
    function getSearchHistory() {
        return localStorage.getItem('searchHistory');
    }

    //设置搜索历史
    function setSearchHistory(s) {
        var h = getSearchHistory('searchHistory');

        if (h) {
            var arr = h.split(' ');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == s) return;
            }
            h += ' ' + s;
        } else {
            h = s;
        }

        localStorage.setItem('searchHistory', h);
    }

    //清除搜索历史
    function clearSearchHistory() {
        localStorage.removeItem('searchHistory');
        $('.history').hide().find('p').remove();
    }

    //渲染搜索历史
    function showSearchHistory() {
        var s = getSearchHistory();
        var hs = $('.history');
        if (s) {
            var arr = s.split(' ');
            var str = '';
            hs.find('p').remove();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    str += '<p>' + arr[i] + '</p>';
                }
            }
            hs.find('h2').after(str);
            hs.show();
        }
        else {
            hs.hide();

        }

        //历史记录搜索点击
        $('.index').find('.history p').on('click', function () {
            var text = $(this).html();
            $('.search-text').val(text);
            $('.search').trigger('click');
        })

    }



    //搜索商品
    function searchGoods(keyWord, fn) {
        $.ajax({
            url: 'http://datainfo.duapp.com/shopdata/selectGoodes.php',
            type: 'get',
            data: 'selectText=' + encodeURI(keyWord),
            dataType: 'JSONP',
            success: function (data) {

                fn && fn(strToDom(data));


            }
        })
    }


    //点击搜索框
    $('.search-text').on('focus', function () {
        //跳转
        $('.part1').css('transform', 'translateX(-100%)').next().css('transform', 'translateX(-100%)');
        $('.footer').addClass('active');
        $('.search-part').addClass('active');
        showSearchHistory();

    })

    //点击清除搜索历史
    $('.clear-history').on('click', function () {
        clearSearchHistory();
    })

    //点击返回按钮
    $('.back').on('click', function () {
        $('.part1').css('transform', 'translateX(0)').next().css('transform', 'translateX(0)');
        $('.footer').removeClass('active');
        $('.search-part').removeClass('active');
    })

    //点击搜索
    $('.search').on('click', function () {
        var s = $('.search-text').val();
        if (s && s.indexOf(' ') === -1) {
            setSearchHistory(s);
            showSearchHistory();
        }
        searchGoods(s, function (data) {
            if (data) {
                $('.suggest').hide();
                $('.message').hide();
                $('.part2').find('.card-box').html(data).find('.img-box').on('click', function () {
                    detail.detailOfgoodsID($(this).data('goodsid'));
                });
                clickCar();
            }
            else {
                $('.suggest').show();
                $('.message').show();
                $('.part2').find('.card-box').html("");
            }
        });
    })

    //推荐商品点击
    $('.index').find('.hot li').on('click', function () {
        var text = $(this).html();
        $('.search-text').val(text);
        $('.search').trigger('click');
    })

    //加入购物车点击
    function clickCar(){

        $('.index').find('.buybtn').on('click',function(){

            var a=$(this).data('goodsid');
            shopcar.clickAddCar(123456,a);
        })
    }

    function init() {
        initBanner();
        getHotGoods();
        

    }

    exports.init = init;

});
