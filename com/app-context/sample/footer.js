;(function(window) {

    var view = Backbone.View.extend({

        //------------------------------------------------
        // for name spaces
        //------------------------------------------------
        PACKAGE: 'app.view',
        NAME: "FooterView",

        //------------------------------------------------
        // Properties
        //------------------------------------------------
        el: 'footer',

        messages: {
            'MY_PROF' : 'Page1です。',
            'MY_BOOK' : 'Page2です。',
            'MY_PLAN' : 'Page3です。',
            'COMPONENT' : 'Page4です。'
        },

        //------------------------------------------------
        // Message handler
        //------------------------------------------------
        listeningMessage: [
            message.SET_GUIDEMESSAGE
        ],

        /**
         * フッターにメッセージを表示するためのハンドラ
         *
         * @param message 受信するメッセージ種類
         * @param param パラメタ
         * @param option オプション（変換する文字列）
         */
        messageHandler: function( message, param, option ) {

            if ( option != null ) {
                this.$el.html( (this.messages[param] || '').replace('%s', option) );
            } else {
                this.$el.html( this.messages[param] || '' );
            }

        }

    });

    com.utils.CommonUtils.createNamespace( view );

})( window );