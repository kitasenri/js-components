
;(function( window ) {

    // add extension
    window.applicationContext = window.applicationContext || {};

    applicationContext.facade = new function() {

        //--------------------------------------------------
        // consts
        //--------------------------------------------------
        // extension name
        var EXTENSION_NAME = "facade";
        // send message
        var SEND_FUNCTION_NAME = "sendMessage";
        // listener name
        var LISTENER_NAME = "listeningMessage";
        // message handler name
        var HANDLE_FUNCTION_NAME = "messageHandler";

        //--------------------------------------------------
        // Properties
        //--------------------------------------------------
        // view map
        var _comMap = [];
        // wrapper function for inject to component
        var _sendMessage = null;

        //--------------------------------------------------
        // Method / public
        //--------------------------------------------------
        /**
         * Register com.
         *
         * @param classRef class reference
         */
        this.registerComponent = function( classInstance ) {

            // error check
            if ( !classInstance ) {
                throw new Error( "NULL classRef is registerred to com." );
            } else {}

            // inject object
            _injectObject( classInstance );

            // register map
            _comMap.push( classInstance );

            return classInstance;
        };

        /**
         * Send message method.
         * Search handle target from view and call handle function
         *
         * @param messageName as eventName
         * @param Param parameter
         * @param option option
         */
        this[ SEND_FUNCTION_NAME ] = function( messageName, param, option ) {

            // loop view map
        	var length = _comMap.length;
            for ( var ii = 0 ; ii < length ; ii++ ) {

                var view = _comMap[ ii ];
                var listeners = view[LISTENER_NAME] || [];
                var listenerNum = (listeners != null) ? listeners.length : 0;

                // loop listener name
                for ( var ii = 0 ; ii < listenerNum ; ii++ ) {

                    var listener = listeners[ii];
                    if ( listener == messageName ) {
                        view[ HANDLE_FUNCTION_NAME ]( messageName, param, option );
                        break;
                    } else {}

                }

            }

        };

        //--------------------------------------------------
        // Method / private
        //--------------------------------------------------
        /**
         * Inject object
         *
         * @param instance inject target
         */
        var _injectObject = function( instance ) {
            // set message name
            instance[ EXTENSION_NAME ] = this;
            // set message name
            instance[ SEND_FUNCTION_NAME ] = _sendMessage;
        };

        /**
         * Wrapper function for inject of send message
         *
         * @param targetObj target object(Backbone.)
         * @param methodName "sendMessage".
         */
        var _sendMessage = function( targetObj, methodName ) {
            var t = targetObj;
            var f = targetObj[methodName];
            var retFunc = function() {
                f.apply( t, arguments );
            };
            return retFunc;
        }( this, SEND_FUNCTION_NAME );

    };

})( window );
