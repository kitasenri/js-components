window.com = window.com || {};
window.com.utils = window.com.utils || {};

/** 
 * Screen utils for responsible
 */
com.utils.ScreenUtils = new function() {

    //-----------------------------------------------
    // consts
    //-----------------------------------------------
    // max-width: 399px
    this.MEDIATYPE_NARROW_S = 1;
    // max-width: 479px
    this.MEDIATYPE_NARROW_M = 2;
    // max-width: 767px
    this.MEDIATYPE_NARROW_L = 4;
    // max-width: 960px
    this.MEDIATYPE_WIDE_M = 5;

    //-----------------------------------------------
    // property / private
    //-----------------------------------------------
    // current type
    var _mediaType = -1;
    // registerred handler
    var _observeListMap = [];

    //-----------------------------------------------
    // init
    //-----------------------------------------------
    /** 
     * Initialize
     */
    this.init = function() {

        $(window).on(
            'resize',
            com.utils.CommonUtils.bind( 'resizeEventHandler', this )
        );

        _mediaType = this.getMediaType();
    };
    

    //-----------------------------------------------
    // method
    //-----------------------------------------------
    /** 
     * Add Media query observer handler
     * When query type is changed, handler is called.
     * 
     * @param handler function
     */
    this.addMediaQueryObserver = function( handler ) {
        _observeListMap.push( handler );
    };

    /** 
     * Get current media type
     * 
     * @return media type
     */
    getMediaType = function() {
        return _mediaType;
    };

    //-----------------------------------------------
    // private
    //-----------------------------------------------
    /** 
     * @private
     * Get media type
     * 
     * @return media type
     */
    this.getMediaType = function() {

        var retval = 99;
        if ( window.matchMedia('(max-width: 399px)').matches ) {
            retval = this.MEDIATYPE_NARROW_S;
        } else if ( window.matchMedia('(max-width: 479px)').matches ) {
            retval = this.MEDIATYPE_NARROW_M;
        } else if ( window.matchMedia('(max-width: 767px)').matches ) {
            retval = this.MEDIATYPE_NARROW_L;
        } else if ( window.matchMedia('(max-width: 960px)').matches ) {
            retval = this.MEDIATYPE_WIDE_M;
        } else {}

        return retval;
    };

    //-----------------------------------------------
    // event handler
    //-----------------------------------------------
    /** 
     * @private
     * Resize event handler
     * 
     * @param event 
     */
    this.resizeEventHandler = function( event ) {

        var mediaType = this.getMediaType();
        if ( _mediaType != mediaType ) {

            var length = com.utils.ArrayUtils.getLength( _observeListMap );
            for ( var ii = 0 ; ii < length ; ii++ ) {
                var notifier = _observeListMap[ii];
                notifier( event, mediaType, _mediaType );
            }

        } else {}

        // media list
        _mediaType = mediaType;
    };

    //-----------------------------------------------
    // initialize
    //-----------------------------------------------
    (function(that) {
        that.init();
    })(this);

};