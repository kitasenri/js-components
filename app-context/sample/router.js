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
            'Page1'     : 'page1',
            'Page2'     : 'page2',
            'Page3'     : 'page3',
            'Page4'     : 'page4',
        },

        lastSelectedItem : null,

        //------------------------------------------------
        // Implementation
        //------------------------------------------------
        /**
         * Root page
         */
        index : function index() {
            this.showView( $("#Page1") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "Page1" );
        },

        /**
         * Page1
         */
        page1 : function page1() {
            this.showView( $("#Page1") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "Page1" );
        },

        /**
         * Page2
         */
        page2 : function page2() {
            this.showView( $("#Page2") );
            this.sendMessage( message.SET_GUIDEMESSAGE, "Page2" );
        },

        /**
         * Page3
         */
        page3 : function page3() {
           this.showView( $("#Page3") );
           this.sendMessage( message.SET_GUIDEMESSAGE, "Page3" );
       },

       /**
        * Page4
        */
       page4 : function page4() {
           this.showView( $("#Page4") );
           this.sendMessage( message.SET_GUIDEMESSAGE, "Page4" );
       },

       //------------------------------------------------
       // Implementation
       //------------------------------------------------
       /**
        * Change view
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