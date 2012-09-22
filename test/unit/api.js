module("API");

(function () {

test("setSelection()/getSelection()", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    var ias = $('#test-img').imgAreaSelect({
        show: true,
        onInit: function (img, selection) {
            ias.setSelection(10, 20, 30, 40);
            ias.update();
            var selection = ias.getSelection();

            deepEqual(ias.getSelection(), { x1: 10, y1: 20, x2: 30, y2: 40,
                width: 20, height: 20 },
                'Check if the returned selection is correct');

            equal($('.imgareaselect-selection').width(), 20,
                'Check if the selection area div element has the proper width');
            
            equal($('.imgareaselect-selection').height(), 20,
                'Check if the selection area div element has the proper ' +
                'height');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();

            start();
        },
        instance: true
    });
});

test("setSelection()/getSelection() with scaling", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" \
        style="width: 160px; height: 100px;" />');

    stop();

    var ias = $('#test-img').imgAreaSelect({
        show: true,
        imageWidth: 320,
        imageHeight: 200,
        onInit: function (img, selection) {
            ias.setSelection(10, 20, 30, 40);
            ias.update();
            var selection = ias.getSelection();
            
            deepEqual(ias.getSelection(), { x1: 10, y1: 20, x2: 30, y2: 40,
                width: 20, height: 20 },
                'Check if the returned selection is correct');

            equal($('.imgareaselect-selection').width(), 10,
                'Check if the selection area div element has the proper width');
        
            equal($('.imgareaselect-selection').height(), 10,
                'Check if the selection area div element has the proper ' +
                'height');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();

            start();
        },
        instance: true
    });
});

test("cancelSelection", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" \
        style="width: 160px; height: 100px;" />');

    stop();

    var selectEndCalled = false;
    
    function selectEnd(img, selection) {
        selectEndCalled = true;
    }
    
    var ias = $('#test-img').imgAreaSelect({
        show: true,
        x1: 20, y1: 20, x2: 50, y2: 50,
        onSelectEnd: selectEnd,
        onInit: function (img, selection) {
            ias.cancelSelection();
            
            ok(!$('.imgareaselect-selection').is(':visible'),
                    'cancelSelection: Check if the selection is no longer ' +
                    'visible after a call to cancelSelection()');
            
            equal(selectEndCalled, false, 'cancelSelection: Check if the ' +
                    'onSelectEnd callback function is not triggered');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();

            start();
        },
        instance: true
    });
});

})();