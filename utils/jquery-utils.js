(function( window ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.utils = window.com.utils || {};

    com.utils.jQueryUtils = new function() {

        //-----------------------------------------------------------------
        // method
        //-----------------------------------------------------------------
        /**
         * Check argument jQueryObj is jQuery object or not
         *
         * @param jQueryObj check target
         * @return true:jQueryObj
         */
        this.isJQueryObject = function( jQueryObj ) {
            return (jQueryObj != null && jQueryObj instanceof jQuery) ? true : false;
        };

        /**
         * Get tag name of tower case
         *
         * @param jquery object
         * @return tag name
         */
        this.getTagName = function( jQueryObj ) {

            var retval = null;
            if ( this.isJQueryObject(jQueryObj) && 0 < jQueryObj.size() ) {
                retval = jQueryObj.get(0).tagName.toLowerCase();
            }

            return retval;
        };

        /**
         * Append element.
         */
        this.appendElement = function( parentElement, childNode, text, type ) {

            var childElement = $( childNode );
            if ( text != null ) {
                childElement.html( text );
            }

            parentElement.append( childElement );
            return childElement;
        };

        /**
         * Checks whether jQueryObj is visible or not.
         */
        this.isVisible = function( jQueryObj ) {
            return jQueryObj.is(":visible");
        };

        /**
         * Checks whether jQueryObj is hidden or not
         */
        this.isHidden = function( jQueryObj ) {
            return jQueryObj.is(":hidden");
        };

        /**
         * Checks whether jQueryObj has focus or not.
         */
        this.hasFocus = function( jQueryObj ) {
            return jQueryObj.is(":focus");
        };

        /**
         * remove attr of disabled.
         */
        this.enableComponent = function( jQueryObj ) {
            jQueryObj.removeAttr( "disabled" );
        };

        /**
         * append attr of disabled.
         */
        this.disableComponent = function( jQueryObj ) {
            jQueryObj.attr( "disabled", true );
        };

        /**
         * Checkbox is selected or not.
         *
         * @param jQueryObj
         */
        this.isSelected_Checkbox = function( jQueryObj ) {
            var selectedVal = jQueryObj.is(':checked');
            return selectedVal;
        };

        /**
         * Create drop down items
         *
         * @param
         * @param
         * @param initvalue index(number) or value(string)
         */
        this.createDropdownItems = function( jQueryObj, items, initvalue ) {

            if ( this.isJQueryObject(jQueryObj) != true ) {
                return;
            } else {}

            // clear old values
            jQueryObj.empty();

            var item = null;
            var length = com.utils.ArrayUtils.getLength( items );
            for ( var ii = 0 ; ii < length ; ii++ ) {

                var option = $("<option>");
                item = items[ii];

                option.val( item.value );
                option.html( item.label );
                jQueryObj.append( option );
            }

            if ( com.utils.CommonUtils.isNumber(initvalue) ) {

                // specified init index
                if ( initvalue <= length - 1 ) {
                    item = items[ initvalue ];
                    jQueryObj.val( item.value );
                    jQueryObj.trigger( "change" );
                }

            } else if ( initvalue != null ) {
                // specified init value
                jQueryObj.val( initvalue );
                jQueryObj.trigger( "change" );
            }

        };

        /**
         * Create attribute selector
         */
        this.createAttributeSelector = function( params ) {

            var retval = null;
            if ( com.utils.ArrayUtils.isArray(params) ) {

                var selectors = [];
                var length = com.utils.ArrayUtils.getLength( params );
                for ( var ii = 0 ; ii < length ; ii++ ) {
                    var param = params[ii];
                    selectors.push( '[' + param.key + '=' + param.value + ']' );
                }

                retval = selectors.join("");

            } else if ( params != null ) {

                retval = '[' + params.key + '=' + params.value + ']';

            }

            return retval;
        };

        /**
         * Get filter object
         * (*) If dom attribute value = arguments value of attr, finded object will be returned.
         *
         * @param jQueryObj
         * @param attr search attr key
         * @param value search attr value
         */
        this.filterObject = function( jQueryObj, attr, value ) {
            return jQueryObj.filter(
                function( itemIndex ) {
                    var $this = $(this);
                    var attrValue = $this.attr(attr);
                    return attrValue == value;
                }
            );
        };

        /**
         * Get serialize id
         *
         * @param id
         * @return sedialize id
         */
        this.getSerializeID = function( id ) {

            var retval = null;
            if ( id.charAt(0) == '#' ) {
                retval = id;
            } else {
                retval = '#' + id;
            }

            return retval;
        };

        var _scrolling = false;
        var _scrollCompleteHandler = function() {
            _scrolling = false;
        };

        /**
         * Scroll to component
         *
         * @param $target to scroll component
         * @param speed animation speed, if this isn't specified, speed = 400.
         */
        this.scrollTo = function( $target, speed ) {

            // block double scroll
            if ( _scrolling ) {
                return;
            } else {}

            _scrolling = true;

            // scroll process
            speed = speed || 400;
            var offset = $target.offset();
            if ( offset != null ) {

                var position = offset.top;
                $('body,html').animate(
                    { 'scrollTop' : position },
                    speed,
                    'swing',
                    _scrollCompleteHandler
                );

            } else {}

        };

    };

}) (window);

