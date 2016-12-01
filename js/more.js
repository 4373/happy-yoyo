

define(function (require, exports) {

    var $ = require('./jquery-2.2.4.js');

    var bobo = $('.more').find('.bobo');

    var offsets = [];

    //获取 li位子数组；
    function getOffset() {
        var items = $('.item');
        for (var i = 0; i < items.length; i++) {
            offsets.push($('.item' + (i+1)).offset());
        }
    }

    var s = 0;
    var e = 0;
    var m=false;
    var time=null;
    $('.more').find('.luck-click').on('click', function () {
        if(m) return;
        s=0;
        var n = Math.floor(Math.random() * 8 + 1);
        e = n + 80;
        go(1000);    
    })


    //启动运动，
    //time为运动到目的的时间
    function go(time) {
        m=true;
       timer=setTimeout(function(){
           //控制速度
            var t=1000;     
            if(s<=8){
                t=1000-s*115;
            }
            else if(s<=64) t=100;
            else if(s<=80) t=100+(s-64)*56;
            else  t=1000;
            if(s==e){//条件满足。停止
                clearTimeout(timer);
                bobo.css('transition-duration',t+'ms'); 
                alert('恭喜获得'+(e-80)+'等奖');
                m=false;
                bobo.offset($('.luck-click').offset()).css({'border-radius':'50%'});
                return;
            }

            go(t);
            bobo.css('transition-duration',t+'ms');     
            boboRun(s%8)
            s++;
        },time)        

    }


    //span移动位子到第n个
    function boboRun(n) {
        var bg = '';
        var off = {};
        var br = '';       
        switch (n) {
            case 0: bg = '#E9C218 content-box'; br = '0 30%'; break
            case 1: bg = '#818366 content-box'; br = '50%'; break
            case 2: bg = '#34C377 content-box'; br = '30% 0'; break
            case 3: bg = '#D44B92 content-box'; br = '50%'; break
            case 4: bg = '#7701EF content-box'; br = '0 30%'; break
            case 5: bg = '#FEC8F9 content-box'; br = '50%'; break
            case 6: bg = '#A34D22 content-box'; br = '30% 0'; break
            case 7: bg = '#DEE459 content-box'; br = '50%'; break
        }
        $('.luck-click').css('background',bg);
        $('.luck').css('box-shadow','0 0 30px '+bg.split(' ')[0]);
        bobo.css({ 'background': bg, 'border-radius': br })
        bobo.offset(offsets[n]);


    }

    exports.getOffset = getOffset;
})

