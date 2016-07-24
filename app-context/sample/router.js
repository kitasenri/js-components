;(function( window ) {

    var router = Backbone.Router.extend({

        //------------------------------------------------
        // for name spaces
        //------------------------------------------------
        PACKAGE: 'app.router',
        NAME: 'MyRouterView',

        //------------------------------------------------
        // Properties
        //------------------------------------------------
        routes : {
            ''          : 'index',
            'MyProfile' : 'myprof',
            'MyBook'    : 'mybook',
            'MyPlan'    : 'myplan',
            'Component' : 'Component',
        },

        lastSelectedItem : null,

        //------------------------------------------------
        // Implementation
        //------------------------------------------------
        /**
         * ルート選択
         */
        index : function index() {
            this.showView( $("#MyProfile") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "MY_PROF" );
        },

        /**
         * プロフィール選択
         */
        myprof : function myprof() {
            this.showView( $("#MyProfile") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "MY_PROF" );
        },

        /**
         * MyBook選択
         */
        mybook : function mybook() {
            this.showView( $("#MyBook") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "MY_BOOK" );
        },

        /**
        * MyPlan選択
        */
        myplan : function myplan() {
           this.showView( $("#MyPlan") );
           this.sendMessage( message.SET_GUIDEMESSAGE, "MY_PLAN" );
       },

        /**
        * CustomComponent選択
        */
       Component : function component() {
           this.showView( $("#Component") );
           this.sendMessage( message.SET_GUIDEMESSAGE, "COMPONENT" );
       },

       //------------------------------------------------
       // Implementation
       //------------------------------------------------
       /**
        * 表示する画面を切り替える
        *
        * @param view
        */
       showView: function( view ) {

           if ( this.lastSelectedItem != null ) {
               this.lastSelectedItem.hide( 200 );
           } else {}

           view.show( 200 );
           this.lastSelectedItem = view;
       }


    });

    com.utils.CommonUtils.createNamespace( router );

})(window);