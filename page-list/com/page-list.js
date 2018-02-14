;(function( window ) {


    window.com = window.com || {};

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
    var TEMPLETE_BACK = '<li class="cursor" id="page-back"><a class="goto_back">&lt;&lt;</a></li>';
    // next button
    var TEMPLETE_NEXT = '<li class="cursor" id="page-next"><a class="goto_next">&gt;&gt;</a></li>';
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
    window.com.PageHelper = function( option ) {

        if ( !option.rootID ) {
            throw new Error('(ERROR) PageHelper, input value option.root doesn\'t specified.');
        }

        //-----------------------------------------------------------------
        // property / ref
        //-----------------------------------------------------------------
        // root container
        var $root = $( option.rootID );
        // page index container
        var $pageIndexContainer = $( option.indexID );

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
            $root.append( $ul )
                 .addClass( 'pagination' );

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
            $backPage.click( com.utils.CommonUtils.bind(this, 'backButtonClickedHandler') );
            $nextPage.click( com.utils.CommonUtils.bind(this, 'nextButtonClickedHandler') );
            $pageButton.click( com.utils.CommonUtils.bind(this, 'pageButtonClickedHandler') );

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
                }

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
            }

            if ( _lastSelectedButton != null ) {
                _lastSelectedButton.find('a').removeClass( CLASSNAME_ACTIVE );
                _lastSelectedButton = null;
            }

            // refresh page
            $pageButton.each(
                function( itemIndex, dom ) {
                    var $page = $(dom);
                    var pageIndex = $page.data('value');
                    if ( index == pageIndex ) {
                        $page.find('a').addClass( CLASSNAME_ACTIVE );
                        _lastSelectedButton = $page;
                    }
                }
            );

            if ( !initF ) {
                // dispatch init event or not.
                $root.trigger( EVENTNAME_INDEXCHANGED, [index] );
            }

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
            }

            var index = this.getPageNumber();
            if ( 1 < index ) {
                this.setPageNumber( index - 1 );
            }

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
            }

            var index = this.getPageNumber();
            if ( index < _maxPage ) {
                this.setPageNumber( index + 1 );
            }

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
        (function(that) {
            that._init();
        })(this);

    };


})( window );