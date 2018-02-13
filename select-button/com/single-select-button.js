
;(function() {

    //--------------------------------------------------------
    // Class Information
    //--------------------------------------------------------
    window.helper = window.helper || {};
    window.helper.select = window.helper.select || {};

    //--------------------------------------------------------
    // Consts
    //--------------------------------------------------------
    //--------------------------------------------------------
    // Implementation
    //--------------------------------------------------------
    helper.select.SingleSelectButton = function( option ) {

        //--------------------------------------------------------
        // Consts
        //--------------------------------------------------------
        // css名：ルート
        var ROOT_COMMON = "toggleSelect";
        // css名：選択時
        var SELECTED_CLASS_ON = "list-on";
        // css名：非選択時
        var SELECTED_CLASS_OFF = "list-off";
        // css名：共通
        var SELECTED_CLASS_COMMON = "list-common";

        //--------------------------------------------------------
        // Properties
        //--------------------------------------------------------
        // ルートエレメント
        var $ul = $(option.rootID).addClass( ROOT_COMMON );
        // データリスト
        var dataProvider = null;
        // 選択状態管理ヘルパ
        var selectItemHelper = null;

        //--------------------------------------------------------
        // Implementation
        //--------------------------------------------------------
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

                //
                $span.text( item.label );
                $span.attr( 'data-list-index', ii );
                $span.attr( 'data-value', item.value );
            }

            //

            var option = {};
            option.selectionMode = helper.select.SELECTIONMODE_SINGLE;
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
            var index = $span.data('listIndex');

            // remove old select
            var oldIndex = selectItemHelper.getSelectedIndex();
            if ( oldIndex != null && 1 == oldIndex.length ) {
                this.findElement( oldIndex[0] ).removeClass( SELECTED_CLASS_ON ).addClass( SELECTED_CLASS_OFF );
            } else {}

            selectItemHelper.setSelectedIndex( index );
            $span.addClass( SELECTED_CLASS_ON ).removeClass( SELECTED_CLASS_OFF );

            $ul.trigger( helper.select.EVENT_SELECT_CHANGED );
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