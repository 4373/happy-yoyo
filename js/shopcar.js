/**
 * Created by Administrator on 2016/9/20.
 */


define(function(require,exports){

    var $=require('./jquery-2.2.4');

    var id=0;

    var _data={};

    //当页面跳转到购物车时 ，获取数据
    function getCar(userid){

        id=userid;
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getCar.php',
            dataType:'JSONP',
            data:'userID='+userid,
            type:'get',
            success:function(data){

                $('.shop-car').find('.card-box').html('').html(formatCard(data));

                //注册增删减点击事件
                addAndAqqAndDel();

                //获取购物车数量
                updateFooter();
                //获取商品总价
                updateHeader();

            }
        })
    }

    //
    function formatCard(data){

        var str='';
        _data={};
        for(var i=0;i<data.length;i++){

            str+='<div class="card" id="'+data[i].goodsID+'" data-goodsid="'+data[i].goodsID+'"><div class="img-box"  data-goodsid="'+data[i].goodsID+'"><img src="'+data[i].goodsListImg+'" /></div><div class="text-box"><p class="name">'+data[i].goodsName+'</p><p class="prices">单价：<span class="price">'+'￥'+data[i].price+'</span></p><div class="counts">数量：<a href="javascript:;" class="aqq iconfont icon-jian"></a><input type="tel"  class="count" minlength="1" maxlength="2" value="'+data[i].number+'" disabled><a href="javascript:;" class="add iconfont icon-jia"></a></div></div><a href="javascript:;" class="remove iconfont icon-shanchu"></a></div>'
            _data[data[i].goodsID]=data[i].number;
        }
        return str;
    }



    //商品的增删减事件
    function addAndAqqAndDel(){
        var time=null;
        var car=$('.shop-car');
        //加按钮
        car.find('.add').on('click',function(){
            //clearTimeout(time);
            //var that=this;
            //time=setTimeout(function(){
                var r=$(this).prev().val();
                r++;
                r=r>99?99:r;
                $(this).prev().val(r);
                upLoad(id,$(this).closest('.card').data('goodsid'),r);

            //},200)
        });
        //减按钮
        car.find('.aqq').on('click',function(){
            //clearTimeout(time);
           // var that=this;
            //time=setTimeout(function(){
                var r=$(this).next().val();
                r--;
                r=r<1?1:r;
                $(this).next().val(r);
                upLoad(id,$(this).closest('.card').data('goodsid'),r);
            //},200)
        });

        //删除
        car.find('.remove').on('click',function(){

            upLoad(id,$(this).closest('.card').data('goodsid'),0);
            $(this).closest('.card').remove();

        })

    }
    //改变尾部的购物车数量
    function updateFooter(){
        var n=0;
        for( var i in _data){
            n+=_data[i]-0;
        }   
        $('.shop-count').text(n);
    }

    // 头部的商品总数量和总价格
    function updateHeader(){

        var allcount=0,
            allprice=0;

        $('.shop-car').find('.card').each(function(){
            var n=$(this).find('.count').val()-0;
            var p=$(this).find('.price').html().slice(1)-0;

            allcount+=n;
            allprice+=n*p;

        })

        $('.all-count').html(allcount);
        $('.all-price').html('￥'+new Number(allprice).toFixed(2));
    }

    //下载购物车数据（仅仅goodsid,number）
    //显示在每个商品的输入框内，
    //将数据存储在数组
    function downLoad(){
        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/getCar.php',
            dataType:'JSONP',
            data:'userID='+id,
            type:'get',
            success:function(data){
                _data={};
                for(var i=0;i<data.length;i++){
                    //更新商品数量
                      $('#'+data[i].goodsID).find('.count').val(data[i].number);
                      //存储商品id和数量
                      _data[data[i].goodsID]=data[i].number;
                }
                updateFooter(); 
                updateHeader(); 
            },
            error:function(e){
                console.log(e);
                console.log('下载购物车数据失败');
            }

        })
    }



    //上传购物车数据
    function upLoad(id,gid,gnum){

        $.ajax({
            url:'http://datainfo.duapp.com/shopdata/updatecar.php',
            data:{
                userID:id,
                goodsID:gid,
                number:gnum
            },
            type:'get',
            success:function(data){
                if(data){
                    downLoad();
                     
                }
                
            },
            error:function(e){
                console.log(e);
                console.log('上传购物车数据失败');
            }
        })
    }
    //对外提供的购物车按钮点击事件
    function clickAddCar(id,gid){


        var n=0;
        if(_data[gid]){
            n=_data[gid]-0+1;
        }
        else{
            n=1;
        }

        upLoad(id,gid,n);

    }

    exports.getCar=getCar;

    exports.clickAddCar=clickAddCar;
})