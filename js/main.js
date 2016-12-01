/**
 * Created by mh on 2016/9/15.
 */

define(function (require) {

    var $ = require("./jquery-2.2.4");

    var index = require('./index.js');

    var detail = require('./detail');

    var list = require('./list');

    var shopcar = require('./shopcar');

    var more = require('./more');

    //index.init();

    //shopcar.getCar(123456);

    //list.loadNav();






    $('.footer').find('a').on('click', function () {

        var a = window.location.href.split('#')[0];
        window.location.href = a + '#' + $(this).data('hash');

    })

    window.onhashchange = function () {
        //获取hash
        var hash = window.location.href.split('#')[1];

        //不相干页面隐藏
        $('.page').each(function () {
            $(this).hide();
        })
        //hash相同的显示
        $('.page[data-hash=' + hash + ']').show();

        //底部变化
        $('.turn').each(function () {
            $(this).removeClass('active');
        })
        var at = $('.turn[data-hash=' + hash + ']');
        at.addClass('active');
        $('.yoyo').offset(at.offset())


        switch (hash) {
            case 'index': index.init();
                break;

            case 'list': ;
                break;
            case 'shopCar': shopcar.getCar(123456);;
                break;
            case 'my':
                break;

            case 'more': more.getOffset();
                break;
        }



    }
    
    function setSize() {
        var w=$(document).width();
        var h=$(document).height();

        if(w>h){
            $('html').css('font-size',h/640*100+'px');
            $('.list').find('.card').css('width','33.3333333%')
        }
        else{
            $('html').css('font-size',w/640*100+'px');
            $('.list').find('.card').css('width','50%')
        }
        $('.yoyo').offset($('.turn.active').offset());
    }



   $(window).resize(function(){
       setSize();
      

   })

    window.onload = function () {
        window.location.href = window.location.href.split('#')[0] + '#index';
        index.init();
        list.loadNav();
        shopcar.getCar(123456);
        setSize();
    }

})