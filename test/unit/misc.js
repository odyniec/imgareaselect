module("Miscellaneous");

(function () {

test("Window resize event occuring before image is loaded", function () {
    /* 
     * This checks for an error that occurred in MSIE 9.0. Quote from a bug
     * report sent by an user: "In IE 9, if a window resize event occurs before
     * the img tag loads, adjust() will barf trying to read $parent.css,
     * because $parent is undefined."
     */

    /* We don't do any assertions, we just need to check if there's no error */
    expect(0);

    /* Initialization */
    $('#t').append('<img id="test-img" src="" />');

    $('#test-img').imgAreaSelect({});

    $(window).resize();

    $('#test-img').imgAreaSelect({ remove: true });
    testCleanup();
});

})();
