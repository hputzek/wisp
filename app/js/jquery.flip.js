/*!
 * jQuery 3D Flip v1.0
 * https://github.com/nnattawat/flip
 *
 * Copyright 2014, Nattawat Nonsung
 */

(function( $ ) {
    var flip = function(dom, flippedRotate) {
        dom.data("flipped", true);
        dom.css({
            transform: flippedRotate
        });
        dom.parent().addClass('flipped');
    };

    var unflip = function(dom) {
        dom.data("flipped", false);
        dom.css({
            transform: "rotatex(0deg)"
        });
        dom.parent().removeClass('flipped');
    };

    $.fn.flip = function(options) {
        var $allFlips = this;
        this.each(function(){
            var $dom = $(this);
            if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
                if (options) {
                    flip($dom, $dom.data("flippedRotate"));
                } else {
                    unflip($dom);
                }
            } else { //Init flipable DOM
                var settings = $.extend({
                    axis: "y",
                    reverse: false,
                    trigger: "click"
                }, options );

                var prespective;
                var direction = settings.reverse? "-180deg" : "180deg";

                if (settings.axis.toLowerCase() == "x") {
                    prespective = $dom.height() * 2;
                    // save rotating css to DOM for manual flip
                    $dom.data("flippedRotate", "rotatex(" + direction + ")");
                } else {
                    prespective = $dom.width() * 2;
                    $dom.data("flippedRotate", "rotatey(" + direction + ")");
                }
                var flippedRotate = $dom.data("flippedRotate");
                var height = $dom.height();
                var width = $dom.width();

                $dom.wrap("<div class='flip'></div>");
                $dom.parent().css({
                    perspective: prespective,
                    position: "relative",
                    'min-height': $dom.find('.front').height()
                });

                $dom.css({
                    "transform-style": "preserve-3d",
                    transition: "all 0.5s ease-out"
                });

                $dom.find(".front").wrap("<div class='front-wrap' style='z-index:2;'></div>");
                $dom.find(".back").wrap("<div class='back-wrap'></div>");

                $dom.find(".front, .back, .front-wrap, .back-wrap").outerHeight(height);
                $dom.find(".front, .back, .front-wrap, .back-wrap").outerWidth(width);

                $dom.find(".front-wrap, .back-wrap").css({
                    position: "absolute",
                    "backface-visibility": "hidden"
                });

                $dom.find(".back-wrap").css({
                    transform: flippedRotate
                });

                if (settings.trigger.toLowerCase() == "click") {
                    $dom.find('[data-trigger-flip]').click(function(e) {
                        e.preventDefault();
                        if ($dom.data("flipped")) {
                            unflip($dom);
                        } else {
                            unflip($allFlips);
                            flip($dom, flippedRotate);
                        }

                    });
                } else if (settings.trigger.toLowerCase() == "hover") {
                    $dom.hover(function() {
                        flip($dom, flippedRotate);
                    }, function() {
                        unflip($dom);
                    });
                }
            }
        });
        return this;
    };

}( jQuery ));