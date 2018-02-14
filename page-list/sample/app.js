
$(window).load(

    function() {

        var param = {};

        // page id
        param.rootID = '#page_container';
        param.indexID = '#page_index_container';

        param.allCount = 99;
        param.pagePerCount = 10;

        // create page IndexChanged
        _$pageComponent = new com.PageHelper( param );
        _$pageComponent.addIndexChangeListener(
            indexChangedEventHandler
        );

    }

);

var indexChangedEventHandler = function( event, newIndex ) {
    $('#page_index').text( 'Page is ' + newIndex + '.' );
}