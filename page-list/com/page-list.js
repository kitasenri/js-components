;(function( window ) {

    //-----------------------------------------------------------------
    // Class info
    //-----------------------------------------------------------------
    window.com = window.com || {};
    window.com.helper = window.com.helper || {};

    //-----------------------------------------------------------------
    // Consts
    //-----------------------------------------------------------------
    // class name
    var CLASSNAME_ACTIVE = 'active';
    // index change event
    var EVENTNAME_INDEXCHANGED = 'IndexChanged';

    // parent 
    var TEMPLETE_UL = '<ul>';
    // back button
    var TEMPLETE_BACK = '<li class="cursor" id="page-back"><a class="goto_back"> </a></li>';
    // next button
    var TEMPLETE_NEXT = '<li class="cursor" id="page-next"><a class="goto_next"> </a></li>';
    // page button
    var TEMPLETE_PAGE = '<li class="cursor" data-filter-type="page" data-value="%page"><a class="goto">%page</a></li>';

    //-----------------------------------------------------------------
    // concrete
    //-----------------------------------------------------------------
    /**
     * constructor
     * 
     * @param option option info
     */ 
    com.helper.PageHelper = function( option ) {

        if ( !option.rootID ) {
            throw new Error('(ERROR) com.helper.PageHelper, input value option.root doesn\'t specified.');
        } else {}

        //-----------------------------------------------------------------
        // property / ref
        //-----------------------------------------------------------------
        // root container
        var $root = $( com.utils.jQueryUtils.getSerializeID(option.rootID) );
        // page index container
        var $pageIndexContainer = $( com.utils.jQueryUtils.getSerializeID(option.indexID) );

        // ul
        var $ul = $( TEMPLETE_UL );
        // back
        var $backPage = $( TEMPLETE_BACK );
        // next
        var $nextPage = $( TEMPLETE_NEXT );
        // pages
        var $pageButton = null;

        //-----------------------------------------------------------------
        // property
        //-----------------------------------------------------------------
        // all count
        var _allCount = com.utils.CommonUtils.getIntValue(option.allCount) || 0;
        // page count
        var _pageCount = com.utils.CommonUtils.getIntValue(option.pageCount) || 4;
        // page per count
        var _pagePerCount = com.utils.CommonUtils.getIntValue(option.pagePerCount) || 20;

        //-----------------------------------------------------------------
        // property / action
        //-----------------------------------------------------------------
        // max page
        var _maxPage = Math.ceil( _allCount / _pagePerCount );
        // current selected button
        var _lastSelectedButton = null;

        //-----------------------------------------------------------------
        // lifecycle
        //-----------------------------------------------------------------
        /** 
         * initialize
         */
        this._init = function() {

            // create structure
            $root.append( $ul );
            // back button
            $ul.append( $backPage );

            var li = null;
            for ( var ii = 1 ; ii <= _maxPage ; ii++ ) {

                // page
                li = TEMPLETE_PAGE.replace(/%page/g, ii.toString());
                $( li ).appendTo( $ul );

            }

            // next button
            $ul.append( $nextPage );

            // search page button
            $pageButton = $root.find( '[data-filter-type=page]' );

            // set page index
            this.setPageNumber( option.initPage || 1, true );

            // append event
            $backPage.click( com.utils.CommonUtils.bind('backButtonClickedHandler', this) );
            $nextPage.click( com.utils.CommonUtils.bind('nextButtonClickedHandler', this) );
            $pageButton.click( com.utils.CommonUtils.bind('pageButtonClickedHandler', this) );
            
            // set page index
            this.updatePageNumber();
        };
        
        /** 
         * remove page component
         */
        this.destroy = function() {

            $root.off();

            // remove event
            $backPage.off( 'click' );
            $nextPage.off( 'click' );
            $pageButton.off( 'click' );

            // remove from dom
            $ul.remove();
        };

        /** 
         * Add index change event listener
         * 
         * @param handler
         */
        this.addIndexChangeListener = function( handler ) {
            $root.on( EVENTNAME_INDEXCHANGED, handler );
        };

        //-----------------------------------------------------------------
        // method
        //-----------------------------------------------------------------
        /** 
         * Set page number
         */
        this.updatePageNumber = function() {

            var allCount = _allCount;
            if ( 0 < allCount ) {

                var pageNumber = this.getPageNumber();
                var pagePerCount = _pagePerCount;

                var firstPageCount = _pagePerCount * (pageNumber - 1) + 1;
                var lastPageCount = _pagePerCount * pageNumber;
                if ( allCount < lastPageCount ) {
                    lastPageCount = allCount;
                } else {}

                var pageText = firstPageCount + ' to ' + lastPageCount + ' of ' + allCount + ' results';
                $pageIndexContainer.text( pageText );

            } else {
                // product not found
                var pageText = '0 results';
                $pageIndexContainer.text( pageText );
            }

        };

        /** 
         * Page number
         * 
         * @return page number
         */
        this.getPageNumber = function() {
            return (_lastSelectedButton != null) ? _lastSelectedButton.data('value') : -1;
        };

        /** 
         * set page index
         * 
         * @param index new page index
         */
        this.setPageNumber = function( index, initF ) {

            var cp = this.getPageNumber();
            if ( index == cp ) {
                return;
            } else {}

            if ( _lastSelectedButton != null ) {
                _lastSelectedButton.find('a').removeClass( CLASSNAME_ACTIVE );
                _lastSelectedButton = null;
            } else {}

            // refresh page
            $pageButton.each(
                function( itemIndex, dom ) {
                    var $page = $(dom);
                    var pageIndex = $page.data('value');
                    if ( index == pageIndex ) {
                        $page.find('a').addClass( CLASSNAME_ACTIVE );
                        _lastSelectedButton = $page;
                    } else {}
                }
            );

            if ( !initF ) {
                // dispatch init event or not.
                $root.trigger( EVENTNAME_INDEXCHANGED, [index] );
            } else {}

            this.adjustPageStatus( index );
        };

        /** 
         * Adjust page status
         */
        this.adjustPageStatus = function( selectedPage ) {

            var pageCount = _pageCount;
            var diff = Math.floor( pageCount / 2 );

            // number page
            selectedPage = parseInt( selectedPage );
//            if ( selectedPage == 1 ) {
//                // first page
//                $backPage.hide();
//                $nextPage.show();
//            } else if ( selectedPage == _maxPage ) {
//                // last page
//                $backPage.show();
//                $nextPage.hide();
//            } else {
//                // other page
//                $backPage.show();
//                $nextPage.show();
//            }

            $pageButton.each( 
                function( ii, dom ) {

                    var $page = $(dom);
                    var index = $page.data('value');
                    if ( selectedPage == 1 ) {

                        if ( pageCount < index ) {
                            $page.hide();
                        } else {
                            $page.show();
                        }

                    } else if ( selectedPage == _maxPage ) {

                        if ( _maxPage - pageCount < index ) {
                            $page.show();
                        } else {
                            $page.hide();
                        }

                    } else {

                        if ( (index < selectedPage - diff) || (selectedPage + diff < index) ) {
                            $page.hide();
                        } else {
                            $page.show();
                        }

                    }

                } // end function
            ); // end each

        };

        //-----------------------------------------------------------------
        // event handler
        //-----------------------------------------------------------------
        /** 
         * Back button clicked handler
         * 
         * @param event MouseEvent
         */
        this.backButtonClickedHandler = function( event ) {

            if ( _maxPage <= 1 ) {
                return;
            } else {}

            var index = this.getPageNumber();
            if ( 1 < index ) {
                this.setPageNumber( index - 1 );
            } else {}

            this.updatePageNumber();
        };

        /** 
         * Next button clicked handler
         * 
         * @param event MouseEvent
         */
        this.nextButtonClickedHandler = function( event ) {

            if ( _maxPage <= 1 ) {
                return;
            } else {}

            var index = this.getPageNumber();
            if ( index < _maxPage ) {
                this.setPageNumber( index + 1 );
            } else {}

            this.updatePageNumber();
        };

        /** 
         * Page button clicked handler
         * 
         * @param event MouseEvent
         */
        this.pageButtonClickedHandler = function( event ) {

            var $button = $( event.currentTarget );
            var pageNumber = $button.attr( 'data-value' );

            this.setPageNumber( pageNumber );

            this.updatePageNumber();
        };

        //-----------------------------------------------------------------
        // private
        //-----------------------------------------------------------------
        (function( that ) {
            that._init();
        })( this );

    };

})( window );