
/**
 * アプリケーション初期化処理
 */
$(window).load(
	function() {

        //------------------------------------------------
        // backbone custom plugin
        //------------------------------------------------
	    var f = applicationContext.facade;

        //------------------------------------------------
        // create header & footer
        //------------------------------------------------
	    // View
        var headerView = new app.view.HeaderView();
        f.registerView( headerView );

        var footerView = new app.view.FooterView();
        f.registerView( footerView );

        //------------------------------------------------
        // create router
        //------------------------------------------------
        // Router
        var router = new app.router.MyRouterView();
        f.registerView( router );
        Backbone.history.start();

    }

);

