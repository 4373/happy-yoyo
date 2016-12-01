/**
 * Created by Administrator on 2016/9/18.
 */


define(function (require, exports) {

    var $ = require('./jquery-2.2.4');

    var tool=require('./common');

    var detail=require('./detail');

    function loadNav() {

        $.ajax({
            type: 'get',
            url: 'http://datainfo.duapp.com/shopdata/getclass.php',
            success: function (d) {
                var data = JSON.parse(d);
                addNav(data);
                addList(1);
            }

        })

    }

    function addNav(data) {
        var str = "";
        var nav = $('.list').find('.nav')
        for (var i = 0; i < data.length; i++) {
            str += '<li class="iconfont" data-classid="' + data[i].classID + '" data-classname="' + data[i].className + '">' + data[i].icon + '</li>'
        }

        nav.html(str);
        nav.find('li').on('click', function () {
            //标题栏变化
            $('.list').find('.nav-part').find('.title').html($(this).data('classname'));
            //获取classid对应列表
            addList($(this).data('classid'));
        })

    }

    function addList(classid) {
        $.ajax({
            type: 'get',
            data: 'classID=' + classid,
            url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
            dataType: 'JSONP',
            success: function (data) {
                var str='';
                for(var i=0;i<data.length;i++){
                    str+='<div class="card"><div class="img-box" data-goodid="'+data[i].goodsID+'"><img src="'+data[i].goodsListImg+'" /></div><div class="text-box"><p class="name">'+data[i].goodsName+'</p><p class="price"><span class="new-price">'+'￥'+data[i].price+'</span><del class="old-price">'+'￥'+tool.getOldPrice(data[i].price,data[i].discount)+'</del></p></div></div>';
                }
                $('.list').find('.card-box').html(str).find('.img-box').on('click',function(){
                    detail.detailOfgoodsID($(this).data('goodid'));
                });


            }
        })
    }

    exports.loadNav = loadNav;
})