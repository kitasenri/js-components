
/**
 * アプリケーション初期化処理
 */
$(window).load(
    function() {

        //------------------------------------------------
        // backbone custom plugin
        //------------------------------------------------
        var f = window.context;

        //------------------------------------------------
        // create header & footer
        //------------------------------------------------
        // View
        var headerView = new app.view.HeaderView();
        f.registerComponent( headerView );

        var footerView = new app.view.FooterView();
        f.registerComponent( footerView );

        //------------------------------------------------
        // create router
        //------------------------------------------------
        // Router
        var router = new app.router.MyRouterView();
        f.registerComponent( router );

        Backbone.history.start();
    }

);

