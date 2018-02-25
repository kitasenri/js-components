;(function( window ) {

    //--------------------------------------------------------
    // Class Information
    //--------------------------------------------------------
    window.com = window.com || {};

    //--------------------------------------------------------
    // Implementation
    //--------------------------------------------------------
    com.CartesianChart = function( option ) {

        //--------------------------------------------------------
        // Properties
        //--------------------------------------------------------

        this.canvas = $("#" + option.id);
        this.ownerContainer = this.canvas.parent();
        this.context = this.canvas.get(0).getContext("2d");

        this.option = option || {};
        this.dataProvider = null;

        // グラフ領域のパディング
        this.paddingTop = this.option.paddingTop || 20;
        this.paddingBottom = this.option.paddingBottom || 40;
        this.paddingLeft = this.option.paddingLeft || 100;
        this.paddingRight = this.option.paddingRight || 20;

        this.width = this.canvas.width();
        this.height = this.canvas.height();
        this.chartWidth = this.width - this.paddingLeft - this.paddingRight;
        this.chartHeight = this.height - this.paddingTop - this.paddingBottom;

        this.chartTop = this.paddingTop;
        this.chartLeft = this.paddingLeft;
        this.chartRight = this.width - this.paddingRight;
        this.chartBottom = this.height - this.paddingBottom;

        this.xOffset = this.option.yScaleXOffset || 20;
        this.yOffset = this.option.yScaleYOffset || 6;

        this.colorSet = this.option.colorSet ||["red","#FF9114","#3CB000","#00A8A2","#0036C0","#C328FF","#FF34C0"];
        this.type = this.option.type || "line";
        this.lineWidth = this.option.lineWidth || 3;

        this.yGap = this.chartHeight / 10;
        this.xColor = 'rgba(180,180,180,0.3)';
        this.yColor = 'rgba(180,180,180,0.3)';

        //--------------------------------------------------------
        // Methods
        //--------------------------------------------------------
        /**
         *
         *
         */
        this.setDataProvider = function( dataProvider ) {

            this.dataProvider = dataProvider;

            this.yLen = (this.dataProvider != null) ? this.dataProvider.length : 0;
            this.xGap = parseInt( this.chartWidth / this.yLen, 10 );

            this.maxY = this.getMax(this);
            this.yGapValue = parseInt( this.maxY / 10, 10 );

            this.render();
        };

        /**
         *
         *
         */
        this.render = function() {
            this.drawAxisX();
            this.drawAxisY();
            if(this.option)this.swtGraph();
        };

        this.swtGraph = function () {
            switch(this.type){
                case('line') : this.drawLine () ;break;
                case('bar')  : this.drawBar ()  ;break;
                default      : this.drawBar () ;break;
            }
        };

        this.drawAxisX = function () {

            for (
                var top = this.chartBottom, count = 0;
                top >= this.chartTop;
                top -= this.yGap, count++
            ) {
                this.context.beginPath();
                this.context.lineWidth = 1;
                this.context.strokeStyle = this.xColor;
                this.context.moveTo(this.chartLeft, top);
                this.context.lineTo(this.chartRight, top);
                this.context.stroke();

                this.drawYscale(top, count);
            }
        };

        this.drawAxisY = function () {

            for (
                    var left = this.chartLeft, count = 0;
                    left <= this.chartRight;
                    left += this.xGap, count++
            ) {
                this.context.beginPath();
                this.context.lineWidth  = 1;
                this.context.strokeStyle = this.yColor;
                this.context.moveTo(left, this.chartTop);
                this.context.lineTo(left, this.chartBottom);
                this.context.stroke();

                if(this.useFirstToColName)this.drawXscale(left, count);

            }
        };

        this.drawXscale = function (left, count){
            if(!this.ColNames[count])return;
            var xOffset = this.option.xScaleXOffset || 20;
            var yOffset = this.option.xScaleYOffset || 20;
            var tOffset = this.option.ColNamesTitleOffset || xOffset + 5;

            var xWkOffset = this.xGap/2 - xOffset;
            this.context.font = "100 12px 'Arial'";
            this.context.fillStyle = "#aaa";
            this.context.fillText(
                this.ColNames[count],
                left + xWkOffset ,
                this.chartBottom + yOffset
           );

           if ( count == 0 ) {
               this.context.fillText(
                    '(' + this.ColNamesTitle + ')',
                    left - tOffset ,
                    this.chartBottom + yOffset
               );
           }

        };

        this.drawYscale = function(top, count){

            this.wkYScaleStr = "";

            this.context.font = "100 12px 'Arial'";
            this.context.fillStyle = "#aaa";
            this.context.fillText(
                this.wkYScaleStr, this.xOffset ,
                top + this.yOffset
            );

            this.wkYScale += this.yGapValue;
        };

        this.drawLine = function () {

            this.context.save();
            for ( var k = 0 ; k < this.dataRowLen ; k++ ){

                var x = this.chartLeft;
                x += this.xGap/2; //オフセット
                this.context.beginPath();
                this.context.lineWidth  = this.lineWidth;
                this.context.strokeStyle = this.colorSet[k];
                this.drawShadow('#222', 5, 5, 5);
                for ( var l = 0 ; l < this.data[k].length ; l++ ) {
                    var posy = this.data[k][l] * this.chartHeight/this.maxY;
                    var y = this.chartBottom - posy;
                    if ( l == 0 ) {
                        this.context.moveTo(x,y);
                    } else {
                        this.context.lineTo(x,y);
                        x += this.xGap;
                    }
                }

                this.context.stroke();
            }

            this.context.restore();
        };

        this.drawShadow = function (color, x, y, blur) {
            this.context.shadowColor = color;
            this.context.shadowOffsetX = x;
            this.context.shadowOffsetY = y;
            this.context.shadowBlur = blur;
        };

        this.getMax = function (that){

            var datas = [];
            for ( var i = 0 ; i < that.dataRowLen ; i++ ) {
                datas=datas.concat(that.data[i])
            }
            return datas.sort(function(a,b){return b-a})[0];
        };

        this.resizeEventHandler = function( event ) {

            if ( com.utils.jQueryUtils.isVisible(this.canvas) && this.dataProvider != null ) {

                this.width = this.canvas.width();
                this.height = this.canvas.height();
                this.chartWidth = this.width - this.paddingLeft - this.paddingRight;
                this.chartHeight = this.height - this.paddingTop - this.paddingBottom;
                this.chartRight = this.width - this.paddingRight;
                this.chartBottom = this.height - this.paddingBottom;

                this.render();
            }

        };

        // after process
        $(window).resize( com.utils.CommonUtils.bind( this, 'resizeEventHandler' ) );
    };

})(window);