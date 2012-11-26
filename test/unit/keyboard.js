module("Keyboard");

(function () {

test("Document keypress event binding", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();

    var keyPressed = false;

    $(document).bind('keydown keypress', function () {
        keyPressed = true;
    });

    $('#test-img').imgAreaSelect({
        onInit: function (img, selection) {
            $(document).keydown();
            $(document).keypress();

            ok(keyPressed, 'Check if the original document keypress/keydown ' +
                'event handler is called after plugin initialization');

            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();

            start();
        }
    });
});

})();
