(function( window ) {

//-----------------------------------------------------------------
// Class info
//-----------------------------------------------------------------
window.com = window.com || {};
window.com.utils = window.com.utils || {};

com.utils.TimerUtils = new function() {

    /** calllater 10msec. */
    this.TIMEINTERVAL_CALLLATER = 10;

    // timer id.
    var _timerID = null;

    //-----------------------------------------------------------------
    // method / repeat
    //-----------------------------------------------------------------
    /**
     * Set timer event.
     *
     * @param callback function
     * @param interval
     */
    this.setTimer = function( callback, timeout ) {

        if ( _timerID != null ) {
            // if timer is running, clear and recreate
            window.clearTimeout( _timerID );
        } else {}

        var localCallback = callback;
        _timerID = window.setTimeout(
            localCallback,
            timeout
        );

    };

    /** 
     * Call later function
     * This is used for clearing call stack or do process after rendering.
     * 
     * @param callback callback function
     */
    this.callLater = function( callback, timeout ) {

        timeout = timeout || this.TIMEINTERVAL_CALLLATER;

        _timerID = window.setTimeout(
            callback,
            timeout
        );

    };

    this.endTimer = function() {
        if ( _timerID != null ) {
            // if timer is running, clear
            window.clearTimeout( _timerID );
        }
    }
};

}) (window);
