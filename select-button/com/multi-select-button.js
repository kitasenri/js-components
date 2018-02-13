
;(function() {

    //--------------------------------------------------------
    // Class Information
    //--------------------------------------------------------
    window.helper = window.helper || {};
    window.helper.select = window.helper.select || {};


    //--------------------------------------------------------
    // Implementation
    //--------------------------------------------------------
    helper.select.MultiSelectButton = function( option ) {

        //--------------------------------------------------------
        // Consts
        //--------------------------------------------------------
        // css名：ルート
        var ROOT_COMMON = "toggleSelect-multi";
        // css名：選択時
        var SELECTED_CLASS_ON = "list-on-multi";
        // css名：非選択時
        var SELECTED_CLASS_OFF = "list-off-multi";
        // css名：共通
        var SELECTED_CLASS_COMMON = "list-common-multi";

        // 最大選択数
        var MAX_SELECTABLE_COUNT = option.maxCount || 1;

        //--------------------------------------------------------
        // Properties
        //--------------------------------------------------------
        // ルートエレメント
        var $ul = $(option.rootID).addClass( ROOT_COMMON );

        // データリスト
        var dataProvider = null;

        // 選択状態管理ヘルパ
        var selectItemHelper = null;

        // 選択アイコン
        var selectIcon = option.selectIcon || null;

        //--------------------------------------------------------
        // Implementation
        //--------------------------------------------------------
        /** 
         * データプロバイダを指定する。
         * データプロバイダを指定することにより複数選択ボタンを生成する。
         *  
         * @param dp dataProvider
         */
        this.setDataProvider = function( dp ) {

            // clear old data
            $ul.find('li').off('click');
            $ul.empty();

            // create element
            dataProvider = dp;
            var itemLength = (dataProvider != null) ? dataProvider.length : 0;
            for ( var ii = 0 ; ii < itemLength ; ii++ ) {

                var item = dataProvider[ii];
                var $li = $('<li>').appendTo( $ul );
                var $span = $('<span>').appendTo( $li ).addClass( SELECTED_CLASS_COMMON ).addClass( SELECTED_CLASS_OFF );
                if ( selectIcon != null ) {
                    // カスタムアイコンを表示
                    $span.html( '<img src="' + selectIcon + '">' + item.label );
                    $span.find('img').hide();
                } else {
                    // アイコン表示無し
                    $span.text( item.label );
                }
                $span.attr( 'data-list-index', ii );
                $span.attr( 'data-value', item.value );
            }

            //

            var option = {};
            option.selectionMode = helper.select.SELECTIONMODE_MULTI;
            option.maxCount = MAX_SELECTABLE_COUNT;
            selectItemHelper = new helper.select.SelectItemHelper( option );
            $ul.find('li').click( com.utils.CommonUtils.bind( this, "itemClickEvenetHandler" ) );
        };

        /**
         * 現在の選択状態を取得
         * 
         * @return 現在の選択状態
         */
        this.getSelectedIndex = function() {
            return selectItemHelper.getSelectedIndex();
        };

        /**
         * ボタンクリックのイベントハンドラ
         *
         * @param event MouseEvent
         */
        this.itemClickEvenetHandler = function( event ) {

            var $span = $(event.target);
            if ( selectIcon != null ) {

                var tagName = $span.get(0).tagName;
                if ( tagName == 'IMG' ) {
                    $span = $span.parent();
                } else {}


            } else {}
            var index = $span.data('listIndex');

            var retval = selectItemHelper.setSelectedIndex( index );
            switch ( retval ) {
                case helper.select.MULTIRET_ADD: {
                    $span.addClass( SELECTED_CLASS_ON ).removeClass( SELECTED_CLASS_OFF );
                    if ( selectIcon != null ) {
                     // カスタムアイコンを表示
                        $span.find('img').show();
                    } else {}
                    $ul.trigger( helper.select.EVENT_SELECT_CHANGED );
                    break;
                }
                case helper.select.MULTIRET_REMOVE: {
                    $span.addClass( SELECTED_CLASS_OFF ).removeClass( SELECTED_CLASS_ON );
                    if ( selectIcon != null ) {
                     // カスタムアイコンを非表示
                        $span.find('img').hide();
                    } else {}
                    $ul.trigger( helper.select.EVENT_SELECT_CHANGED );
                    break;
                }
                case helper.select.MULTIRET_OVER: {
                    $ul.trigger( helper.select.EVENT_MAXOVER );
                    break;
                }
                default: {
                    break;
                }
            }

        };

        /**
         * 引数に指定したインデックス番号のエレメントを検索する。
         *
         * @param index 検索番号
         * @return 検索対象エレメント
         */
        this.findElement = function( index ) {
            var $span = $ul.find( 'span' );
            return com.utils.jQueryUtils.filterObject( $span, 'data-list-index', index );
        };

        /**
         * イベントチェック
         */
        this.addEventListener = function( eventName, handler ) {
            $ul.on( eventName, handler );
        };

    };

})(window);