/**
 * Created by mh on 2016/9/15.
 */

define(function(require,exports){

    function getOldPrice (newPrice, discount) {
        var n = newPrice - 0;
        var d = discount - 0;
        d = d == 0 ? 10 : d;
        var num = new Number(n / d * 10);
        return num.toFixed(2);
    }

    
    exports.getOldPrice=getOldPrice;

})