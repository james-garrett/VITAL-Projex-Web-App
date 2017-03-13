
var HXGN = function(h, w, dot_width, dot_height) {
    // PUBLIC (Set these values to match your project preferences.)
    var w = 30;         // width of the shape
    var h = 24;         // height of the shape
    var dot_width = 3;  // this needs to match the css class width property
    var dot_height = 3; // this needs to match the css class height property 
    var x = 1;
    var y = parseInt(h / 2); // we need to remember that the starting "y" value should be at the mid point between top and bottom
    
    
    // PRIVATE (used internally)
    var section_trans = parseInt(w / 3); 
    
    
    function doDraw( x, y, args ) {
        var html;

        html =''
            + '<div class="abs ' + args.class + '" '
            + '     title="' + args.class + '" '
            + '     style="'
            + '         top:' + ( y * dot_height ) + 'px; '
            + '         left:' + ( x * dot_width ) + 'px; '
            + '     "'
            + '>'
            + '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" '
            + '  width="1" height="1" style="visibility:hidden">' // IE issue?
            + '</div>'

        return html;
    }
    
    
    function drawPass( part, args ) {
        var html = ''; // string for building up the HTML and CSS we're using for drawing the shape
        var my_x = x;
        var my_y = y;
        var yy   = -1; // assume top by default
        var i;

        // override default if needed
        if ( part == 'bottom' ) { yy = 1; }


        // traverse through the 6 sections from the notes above
        //
        // section 1: x and y changing
        //  y's delta is based on whether this is the top or bottom of the shape
        for ( i = 0; i <= section_trans; i++ ) {
            if ( i > 0 ) { 
                my_x += 1; 
                my_y += yy; 
            }

            html += doDraw( my_x, my_y, args );
        }

        // section 2: x only is changing        
        for ( i = 0; i <= section_trans; i++ ) {
            if ( i > 0 ) { 
                my_x += 1; 
                my_y += 0; 
            }

            html += doDraw( my_x, my_y, args );
        }

        // section 3: x and y changing        
        //  y's delta is based on whether this is the top or bottom of the shape
        for ( i = 0; i <= section_trans; i++ ) {
            if ( i > 0 ) { 
                my_x += 1; 
                my_y += yy * -1; 
            }

            html += doDraw( my_x, my_y, args );
        }
        
        return html;
    }


    function draw( args ) {
        var html;

        html= ''
            + drawPass('top', args)    // top half
            + drawPass('bottom', args) // bottom half

        return html;
    }
    

    // re|build up the HTML and add it to the DOM container we're using to show it    
    function main( obj ) {
        var clss, rnd, obj;

        // pick from available css classes for styling the hexagon
        clss = [ 'basic', 'circus', 'vertical-lines', 'spartan', 'horizontal-lines', 'blob' ];
        rnd  = parseInt( Math.random() * clss.length );

        // persist the index (to avoid duplicates until we've run out of css class options)
        if ( typeof( window.my_num ) === 'undefined' ) window.my_num = rnd;

        // increment...
        window.my_num++; 

        // ...and reset to the start of the css options if we've off the top of the list
        if ( window.my_num >= clss.length ) window.my_num = 0;

        // put the shape HTML into a DOM container to show it
        obj = document.getElementById('game');
        obj.innerHTML = draw({
            class: clss[ window.my_num ],
        });

        // and, lets show which css class we used for styling
        obj.innerHTML += ''
            + '<div class="abs" style="'
            + '   text-align:center; width:100%; top:150px; '
            + '   color: #000; background: #eee; '
            + '   opacity: 0.7; padding:5px; '
            + '">CSS Class: ' 
            + clss[ window.my_num ] 
            + '</div>'

    }


    // public interfaces
    return {
//        draw: draw,
        main: main
    }
}();