;(function(window) {

    var view = Backbone.View.extend({

        //------------------------------------------------
        // for name spaces
        //------------------------------------------------
        PACKAGE: 'app.view',
        NAME: "MyCustomView",

        //------------------------------------------------
        // Properties
        //------------------------------------------------
        el: '#Component',

        selectSingleButton: null,
        selectMultiButton: null,

        singleButtonDataProvider : [
            { 'label' : '日曜日', 'value' : 'Sunday' },
            { 'label' : '月曜日', 'value' : 'Monday' },
            { 'label' : '火曜日', 'value' : 'Tuesday' },
            { 'label' : '水曜日', 'value' : 'Wednesday' },
            { 'label' : '木曜日', 'value' : 'Thursday' },
            { 'label' : '金曜日', 'value' : 'Friday' },
            { 'label' : '土曜日', 'value' : 'Saturday' },
        ],

        //------------------------------------------------
        // Init Process
        //------------------------------------------------
        initialize: function() {
            this.createSingleButton();
            this.createMultiButton();
        },

        //------------------------------------------------
        // Implementation
        //------------------------------------------------
        /**
         * １つ選択モードのボタンを生成する
         */
        createSingleButton: function() {

            var option = {
                rootID : '#test'
            };
            this.selectSingleButton = new helper.select.SingleSelectButton(option);
            this.selectSingleButton.setDataProvider( this.singleButtonDataProvider );
            this.selectSingleButton.addEventListener(
                helper.select.EVENT_SELECT_CHANGED,
                com.utils.CommonUtils.bind( this, "singleItemChangedHandler" )
            );

        },

        /**
         * 複数選択可能なボタンを生成する。
         */
        createMultiButton: function() {

            var option = {
                rootID : '#testMulti',
                maxCount : 3,
                selectIcon : './checkYellow.png'
            };
            this.selectMultiButton = new helper.select.MultiSelectButton(option);
            this.selectMultiButton.setDataProvider( this.singleButtonDataProvider );
            this.selectMultiButton.addEventListener(
                helper.select.EVENT_SELECT_CHANGED,
                com.utils.CommonUtils.bind( this, "multiItemChangedHandler" )
            );
            this.selectMultiButton.addEventListener(
                helper.select.EVENT_MAXOVER,
                com.utils.CommonUtils.bind( this, "multiItemOverHandler" )
            );
        },

        //------------------------------------------------
        // EventHandler
        //------------------------------------------------
        /**
         * 単一選択モードのデータ変更ハンドラ
         *
         * @param event Event
         */
        singleItemChangedHandler: function( event ) {
            var index = this.selectSingleButton.getSelectedIndex();
            var selectItem = this.singleButtonDataProvider[index];
        },

        /**
         * 複数選択モードのデータ変更ハンドラ
         *
         * @param event Event
         */
        multiItemChangedHandler: function( event ) {

            var items = [];
            var index = this.selectMultiButton.getSelectedIndex();
            var itemLength = (index != null) ? index.length : 0;
            for ( var ii = 0 ; ii < itemLength ; ii++ ) {
                var selectItem = this.singleButtonDataProvider[index[ii]];
                items.push( selectItem.label );
            }

        },

        /**
         * 複数選択モードの選択数上限オーバーのイベントハンドラ
         *
         * @param event Event
         */
        multiItemOverHandler: function( event ) {

        }

    });

    com.utils.CommonUtils.createNamespace( view );

})( window );