/**
 * @class WISP.initPlugins
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */

if (typeof WISP === 'undefined') {
    WISP = jQuery.extend({},{});
}

WISP.initPlugins = (function () {
    'use strict';
    var wall = null;
    /**
     * initialize method
     */
    function initialize() {
        wall = new freewall(".wispcast-grid");
        wall.reset({
            selector: 'li',
            animate: true,
            cellW: 'auto',
            cellH: 'auto',
            onResize: function() {
                wall.fitWidth();
            }
        });

        var images = wall.container.find('img');
        images.find('img').load(function() {
            //wall.fitWidth();
        });
    }

    function updateWall() {
        wall.fitWidth();
    }

    // expose public functions
    return {
        initialize: initialize,
        updateWall: updateWall
    };
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
    WISP.Bootstrap.registerBootstrap(WISP.initPlugins);
}