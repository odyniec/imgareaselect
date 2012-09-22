module("Options");

(function () { 

test("classPrefix", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();
    
    $('#test-img').imgAreaSelect({
        classPrefix: 'test',
        x1: 50, y1: 50, x2: 150, y2: 150,
        onInit: function (img, selection) {
            ok($('.test-selection').length == 1,
                    'Check if there is one element with the class ' + 
                    '"test-selection"');
            
            $('#test-img').imgAreaSelect({ handles: true });

            ok($('.test-handle').length == 8,
                    'Check if the added handle elements have the class ' + 
                    '"test-handle"');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});
    
test("handles", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150,
        handles: true,
        onInit: function (img, selection) {
            ok($('.imgareaselect-handle:visible').length == 8,
                'Check if eight handles are visible with "handles: true"');
    
            var imgLeft = Math.round($('#test-img').offset().left),
                imgTop = Math.round($('#test-img').offset().top);
    
            deepEqual([ $(".imgareaselect-handle").eq(0).offset(),
                $(".imgareaselect-handle").eq(2).offset() ],
                [ { left: imgLeft + 50, top: imgTop + 50 },
                    { left: imgLeft + 150 - 5 - 2, top: imgTop + 150 - 5 - 2 } ],
                'Check if the handles are positioned correctly');
    
            $('#test-img').imgAreaSelect({ handles: 'corners', show: true });
    
            ok($('.imgareaselect-handle:visible').length == 4,
                'Check if four handles are visible with "handles: \'corners\'"');
                    
            $('#test-img').imgAreaSelect({ handles: false, show: true });
    
            ok($('.imgareaselect-handle').length == 0,
                'Check if no handles are present with "handles: false"');
                    
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("imageWidth/imageHeight", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" ' +
            'style="width: 160px; height: 100px;" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({ imageWidth: 320, imageHeight: 200,
        onInit: function (img, selection) {
            var x = $(img).offset().left - $(document).scrollLeft(),
                y = $(img).offset().top - $(document).scrollTop();
            
            /* Simulate selecting a 30x30 pixels area */
            $(img).simulate("mousedown", { clientX: x + 10, clientY: y + 10 });
            $(img).simulate("mousemove", { clientX: x + 40, clientY: y + 40 });
            $(img).simulate("mousemove", { clientX: x + 40, clientY: y + 40 });
            $(img).simulate("mouseup", { clientX: x + 40, clientY: y + 40 });
            
            var selection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 60, 60 ], "Check " +
                    "if the selected area has the correct dimensions");
            
            deepEqual([ $('.imgareaselect-selection').width(), 
                     $('.imgareaselect-selection').height() ], [ 30, 30 ],
                    "Check if the selection area div element has the correct " +
                    "dimensions");
            
            $(img).imgAreaSelect({ instance: true }).cancelSelection();
            
            /* Simulate selecting the whole image */
            $(img).simulate("mousemove", { clientX: x, clientY: y });
            $(img).simulate("mousedown", { clientX: x, clientY: y });
            $(img).simulate("mousemove", { clientX: x + 160, clientY: y + 100 });
            $(img).simulate("mousemove", { clientX: x + 160, clientY: y + 100 });
            $(img).simulate("mouseup", { clientX: x + 160, clientY: y + 100 });
            
            selection = $(img).imgAreaSelect({ instance: true }).getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 320, 200 ], "Check " +
                    "if the selected area has the correct dimensions");
            
            deepEqual([ $('.imgareaselect-selection').width(), 
                     $('.imgareaselect-selection').height() ], [ 160, 100 ],
                    "Check if the selection area div element has the correct " +
                    "dimensions");
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("minWidth/minHeight", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({ minWidth: 50, minHeight: 50,
        onInit: function (img, selection) {
            var x = $(img).offset().left - $(document).scrollLeft(),
                y = $(img).offset().top - $(document).scrollTop();
            
            /* Simulate selecting a 10x10 pixels area */
            $(img).simulate("mousedown", { clientX: x + 10, clientY: y + 10 });
            $(img).simulate("mousemove", { clientX: x + 20, clientY: y + 20 });
            $(img).simulate("mousemove", { clientX: x + 20, clientY: y + 20 });
            $(img).simulate("mouseup", { clientX: x + 20, clientY: y + 20 });
            
            var selection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 50, 50 ], "Check " +
                    "if the selected area has the specified minimum " +
                    "dimensions");
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("maxWidth/maxHeight", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');
    
    stop();

    $('#test-img').imgAreaSelect({ maxWidth: 100, maxHeight: 100,
        onInit: function (img, selection) {
            var x = $(img).offset().left - $(document).scrollLeft(),
                y = $(img).offset().top - $(document).scrollTop();

            /* Simulate selecting a 140x140 pixels area */
            $(img).simulate("mousedown", { clientX: x + 10, clientY: y + 10 });
            $(img).simulate("mousemove", { clientX: x + 150, clientY: y + 150 });
            $(img).simulate("mousemove", { clientX: x + 150, clientY: y + 150 });
            $(img).simulate("mouseup", { clientX: x + 150, clientY: y + 150 });

            var selection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 100, 100 ], "Check " +
                    "if the selected area has the specified maximum " +
                    "dimensions");
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("minWidth/minHeight with scaling", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" ' +
            'style="width: 640px; height: 400px;" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({ minWidth: 50, minHeight: 50,
        imageWidth: 320, imageHeight: 200,
        onInit: function (img, selection) {
            var x = $(img).offset().left - $(document).scrollLeft(),
                y = $(img).offset().top - $(document).scrollTop();
            
            /* Simulate selecting a 10x10 pixels area */
            $(img).simulate("mousedown", { clientX: x + 10, clientY: y + 10 });
            $(img).simulate("mousemove", { clientX: x + 20, clientY: y + 20 });
            $(img).simulate("mousemove", { clientX: x + 20, clientY: y + 20 });
            $(img).simulate("mouseup", { clientX: x + 20, clientY: y + 20 });
            
            var selection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 50, 50 ], "Check " +
                    "if the selected area has the specified minimum " +
                    "dimensions");
            
            deepEqual([ $('.imgareaselect-selection').width(), 
                     $('.imgareaselect-selection').height() ], [ 100, 100 ],
                    "Check if the selection area div element has the correct " +
                    "dimensions");
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("maxWidth/maxHeight with scaling", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" ' +
            'style="width: 160px; height: 100px;" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({ maxWidth: 100, maxHeight: 100,
        imageWidth: 320, imageHeight: 200,
        onInit: function (img, selection) {
            var x = $(img).offset().left - $(document).scrollLeft(),
                y = $(img).offset().top - $(document).scrollTop();
            
            /* Simulate selecting a 80x80 pixels area */
            $(img).simulate("mousedown", { clientX: x + 10, clientY: y + 10 });
            $(img).simulate("mousemove", { clientX: x + 90, clientY: y + 90 });
            $(img).simulate("mousemove", { clientX: x + 90, clientY: y + 90 });
            $(img).simulate("mouseup", { clientX: x + 90, clientY: y + 90 });
            
            var selection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual([ selection.width, selection.height ], [ 100, 100 ], "Check " +
                    "if the selected area has the specified maximum " +
                    "dimensions");
            
            deepEqual([ $('.imgareaselect-selection').width(), 
                     $('.imgareaselect-selection').height() ], [ 50, 50 ],
                    "Check if the selection area div element has the correct " +
                    "dimensions");
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("movable", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    var tryMove = function () {
        var eventDown = jQuery.Event('mousedown'),
            eventMove = jQuery.Event('mousemove'),
            eventUp = jQuery.Event('mouseup');
        
        eventDown.which = eventUp.which = 1;
    
        var x = $('.imgareaselect-selection').offset().left,
            y = $('.imgareaselect-selection').offset().top;
        
        eventMove.pageX = eventDown.pageX = x + 25;
        eventMove.pageY = eventDown.pageY = y + 25;
        $('.imgareaselect-selection').trigger(eventMove);
        $('.imgareaselect-selection').trigger(eventDown);
        eventMove.pageX = eventUp.pageX = x;
        eventMove.pageY = eventUp.pageY = y;
        $('.imgareaselect-selection').trigger(eventMove);
        $('.imgareaselect-selection').trigger(eventUp);
    };
    
    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150,
        show: true,
        onInit: function (img, selection) {
            tryMove();
            
            var newSelection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual(newSelection, { x1: 25, y1: 25, x2: 125, y2: 125,
                width: 100, height: 100 },
                'Check if the returned selection is correct after move');

            setTimeout(function () { checkNotMovable(); }, 0);
        }
    });
    
    var checkNotMovable = function () {
        $('#test-img').imgAreaSelect({ remove: true });
        $('#test-img').imgAreaSelect({
            x1: 50, y1: 50, x2: 150, y2: 150,
            movable: false,
            onInit: function (img, selection) {
                tryMove();

                var newSelection = $(img).imgAreaSelect({ instance: true })
                    .getSelection();
                
                deepEqual(newSelection, { x1: 50, y1: 50, x2: 150, y2: 150,
                    width: 100, height: 100 },
                    'Check if the returned selection is correct when ' +
                    'movable is set to false');
                
                /* Cleanup */
                $('#test-img').imgAreaSelect({ remove: true });
                testCleanup();
                
                start();
            }
        });
    };
});

test("parent", function () {
    /* Initialization */
    $('#t').append('<div id="test-div">' + 
            '<img id="test-img" src="data/elephant.jpg" /></div>');
    
    stop();
    
    $('#test-img').imgAreaSelect({
        parent: '#test-div',
        x1: 10, y1: 10, x2: 20, y2: 20,
        onInit: function (img, selection) {
            equal($('.imgareaselect-selection').parent().parent().attr('id'),
                'test-div', 'Check if the parent element is set correctly');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("persistent", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150, persistent: true,
        onInit: function (img, selection) {
            var eventDown = jQuery.Event('mousedown'),
                eventUp = jQuery.Event('mouseup');

            eventDown.which = eventUp.which = 1;
            
            $('.imgareaselect-outer').eq(0).trigger(eventDown);
            $('.imgareaselect-outer').eq(0).trigger(eventUp);
            
            ok($('.imgareaselect-selection').is(':visible'),
                'persistent: Check if the selection remains visible ' +
                'after the outer area is clicked and "persistent" is ' +
                'true');

            $('#test-img').imgAreaSelect({ persistent: false });
            
            $('.imgareaselect-outer').eq(0).trigger(eventDown);
            $('.imgareaselect-outer').eq(0).trigger(eventUp);

            ok(!$('.imgareaselect-selection').is(':visible'),
                'persistent: Check if the selection is no longer ' +
                'visible after the outer area is clicked and ' +
                '"persistent" is false');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            
            testCleanup();
            
            start();
        }
    });
});

test("resizable", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    var tryResize = function () {
        var eventDown = jQuery.Event('mousedown'),
            eventMove = jQuery.Event('mousemove'),
            eventUp = jQuery.Event('mouseup');
        
        eventDown.which = eventUp.which = 1;
    
        var x = $('.imgareaselect-selection').offset().left,
            y = $('.imgareaselect-selection').offset().top;
        
        eventMove.pageX = eventDown.pageX = x;
        eventMove.pageY = eventDown.pageY = y;
        $('.imgareaselect-selection').trigger(eventMove);
        $('.imgareaselect-selection').trigger(eventDown);
        eventMove.pageX = eventUp.pageX = x - 25;
        eventMove.pageY = eventUp.pageY = y - 25;
        $('.imgareaselect-selection').trigger(eventMove);
        $('.imgareaselect-selection').trigger(eventUp);
    };
    
    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150,
        show: true,
        onInit: function (img, selection) {
            tryResize();
            
            var newSelection = $(img).imgAreaSelect({ instance: true })
                .getSelection();
            
            deepEqual(newSelection, { x1: 25, y1: 25, x2: 150, y2: 150,
                width: 125, height: 125 },
                'Check if the returned selection is correct after resize');

            setTimeout(function () { checkNotResizable(); }, 0);
        }
    });
    
    var checkNotResizable = function () {
        $('#test-img').imgAreaSelect({ remove: true });
        $('#test-img').imgAreaSelect({
            x1: 50, y1: 50, x2: 150, y2: 150,
            resizable: false,
            onInit: function (img, selection) {
                tryResize();

                var newSelection = $(img).imgAreaSelect({ instance: true })
                    .getSelection();
                
                deepEqual(newSelection, { x1: 25, y1: 25, x2: 125, y2: 125,
                    width: 100, height: 100 },
                    'Check if the returned selection is correct when ' +
                    'resizable is set to false');
                
                /* Cleanup */
                $('#test-img').imgAreaSelect({ remove: true });
                testCleanup();
                
                start();
            }
        });
    };
});

test("resizeMargin", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150,
        onInit: function (img, selection) {
            var eventMove = jQuery.Event('mousemove'),
                x = $('.imgareaselect-selection').offset().left,
                y = $('.imgareaselect-selection').offset().top;
            
            eventMove.pageX = x + 1;
            eventMove.pageY = y + 1;
            $('.imgareaselect-selection').trigger(eventMove);
            
            equal($('.imgareaselect-selection').parent().css('cursor'),
                'nw-resize', 'Check if the resize mode is enabled when ' +
                'the mouse cursor is within resizeMargin');
            
            eventMove.pageX = x + 20;
            eventMove.pageY = y + 20;
            $('.imgareaselect-selection').trigger(eventMove);
            
            equal($('.imgareaselect-selection').parent().css('cursor'),
                'move', 'Check if the resize mode is disabled when ' +
                'the mouse cursor is not within resizeMargin');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("x1, y1, ...", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    $('#test-img').imgAreaSelect({
        x1: 50, y1: 50, x2: 150, y2: 150, persistent: true,
        onInit: function (img, selection) {
            ok($('.imgareaselect-selection').is(':visible'),
                'Check if the selection area is visible upon initialization');
            
            deepEqual({ x1: 50, y1: 50, x2: 150, y2: 150,
                width: 100, height: 100 }, selection,
                'Check if the returned selection object is correct');

            $('#test-img').imgAreaSelect({ remove: true });
            
            testCleanup();
            
            start();
        }
    });
});

test("zIndex", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" \
        style="position: relative; z-index: 50;" />');

    stop();
        
    $('#test-img').imgAreaSelect({
        zIndex: 100,
        onInit: function (img, selection) {
            equal($('.imgareaselect-selection').parent().css('z-index'), 102,
                'Check if the z-index value is correct');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

})();