(function( window ) {

window.com = window.com || {};
window.com.utils = window.com.utils || {};

com.utils.CommonUtils = new function() {

    this.bind = function( targetObj, functionName ) {
        var t = targetObj;
        var f = targetObj[functionName];
        var retFunc = function() {
            f.apply( t, arguments );
        };
        return retFunc;
    };

    this.createNamespace = function( actor ) {

        var ww = window;
        var nn = actor.prototype.PACKAGE.split('.');
        var nnLength = (nn != null) ? nn.length : 0;
        for ( var ii = 0 ; ii < nnLength ; ii++ ) {

            var name = nn[ii];
            if ( ww[name] != null ) {
                ww = ww[name];
            } else {
                ww[name] = {};
                ww = ww[name];
            }

        }

        ww[ actor.prototype.NAME ] = actor;
    };

    this.copyObject = function( dst, src ) {
        return $.extend( true, dst, src );
    };


};

}) (window);
