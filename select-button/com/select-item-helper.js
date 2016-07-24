;(function() {

    //--------------------------------------------------------
    // Class Information
    //--------------------------------------------------------
    window.helper = window.helper || {};
    window.helper.select = window.helper.select || {};

    //--------------------------------------------------------
    // Consts
    //--------------------------------------------------------
    // １個選択モード
    helper.select.SELECTIONMODE_SINGLE = "SelectionMode_Single";
    // 複数選択モード
    helper.select.SELECTIONMODE_MULTI = "SelectionMode_Multi";

    // 複数選択モード：アイテム追加
    helper.select.MULTIRET_ADD = 1;
    // 複数選択モード：アイテム削除
    helper.select.MULTIRET_REMOVE = 2;
    // 複数選択モード：アイテムオーバー
    helper.select.MULTIRET_OVER = 3;

    // カスタムイベント：最大数超え
    helper.select.EVENT_MAXOVER = "Event_MaxOver";
    // カスタムイベント：選択変更
    helper.select.EVENT_SELECT_CHANGED = "Event_SelectChanged";

    //--------------------------------------------------------
    // Implementation
    //--------------------------------------------------------
    helper.select.SelectItemHelper = function( option ) {

        //--------------------------------------------------------
        // Condition
        //--------------------------------------------------------
        var selectionMode = option.selectionMode || helper.select.SELECTIONMODE_SINGLE;
        var maxSelectCount = (selectionMode == helper.select.SELECTIONMODE_MULTI) ? option.maxCount : 1;

        //--------------------------------------------------------
        // Properties
        //--------------------------------------------------------
        var selectedIndexes = [];

        /**
         * 選択状態をセットする。
         * 
         * @param index 選択状態
         * @return 複数選択モード時の結果（追加、削除、オーバー）
         */
        this.setSelectedIndex = function( index ) {

            var retval = 0;
            switch (selectionMode) {
                case helper.select.SELECTIONMODE_SINGLE: {
                    selectedIndexes = [index];
                    break;
                }
                case helper.select.SELECTIONMODE_MULTI: {

                    var ss = selectedIndexes.indexOf(index);
                    if ( ss != -1 ) {
                        // 登録済みのため、クリア
                        selectedIndexes.splice(ss, 1);
                        retval = helper.select.MULTIRET_REMOVE;
                    } else {

                        if ( selectedIndexes.length < maxSelectCount ) {
                            // 最大個数ではない
                            selectedIndexes.push( index );
                            retval = helper.select.MULTIRET_ADD;
                        } else {
                            retval = helper.select.MULTIRET_OVER;
                        }

                    }

                    break;
                }
                default: {
                    break;
                }
            }

            return retval;
        };

        /** 
         * 選択状態を取得する。
         * 
         * @return 選択状態
         */
        this.getSelectedIndex = function() {
            return selectedIndexes;
        };

    };

})(window);