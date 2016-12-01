/**
 * Created by mh on 2016/9/16.
 */

define(function(require,exports){

    var $=require('./jquery-2.2.4');

    require('./swiper-3.3.1.jquery.min');

    var tool=require('./common');

    var shopcar=require('./shopcar');

    var detailDom=$('.detail');

    

    function detailOfgoodsID(id){
        

        $.ajax({
            type:'get',
            dataType:'JSONP',
            url:'http://datainfo.duapp.com/shopdata/getGoods.php',
            data:'goodsID='+id,
            success:function(data){


                //轮播图
                var str='';
                var banner=eval(data[0].imgsUrl);
                for(var i=0;i<banner.length;i++){
                    str+='<div class="swiper-slide"><img src="'+banner[i]+'"/></div>';
                }
                detailDom.find('.swiper-wrapper').html(str);
                var mySwiper = new Swiper('.detail .swiper-container', {
                    slidesPerView : 2,
                    autoplay:2000,
                    loop:true,
                    loopAdditionalSlides:1,
                    autoplayDisableOnInteraction : false
                });
                detailDom.find('.goods-name').text(data[0].goodsName);
                detailDom.find('.new-price').text('¥'+data[0].price);
                detailDom.find('.old-price').text('¥'+tool.getOldPrice(data[0].price,data[0].discount));
                detailDom.find('.buyer-number').text(data[0].buynumber);


                var benurl=JSON.parse(data[0].goodsBenUrl);
                var benstr='';

                for(var j=0;j<benurl.length;j++){
                    benstr+='<img src="'+benurl[j]+'"/>';
                }
                detailDom.find('.img-box').html(benstr);

                detailDom.find('.text-box').html(data[0].detail);

                $('.show-detail').on('click',showMore);

                $('.detail').find('.icon-fanhui').on('click',outto);


                $('.detail').find('.add-car').attr('data-goodsid',id);

                $('.detail').find('.add-car').one('click',function(){
                    shopcar.clickAddCar(123456,id);
                })
                into();
            }

        })
    }
    function showMore(){
        detailDom.find('.show-detail').toggleClass('active');
        detailDom.find('.details-plus').toggleClass('active');
    }
    

    function into(){

        detailDom.show().css('left','0').find('.header').css('left','0');
        
    }
    function outto(){
        detailDom.css('left','100%').find('.header').css('left','100%');
    }

    exports.detailOfgoodsID=detailOfgoodsID;

})