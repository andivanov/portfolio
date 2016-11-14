
(function () {

    var date = new Date();
    var thisYear = date.getFullYear();
    $('.js-year').html(thisYear);

    $('[data-typer-targets]').typer();

    //Intro section - Plax effect
    $('.intro-image').plaxify({'xRange':10,'yRange':20});
	$('.intro-image-2').plaxify({'xRange':7,'yRange':10});
    $('.intro-image-3').plaxify({'xRange':10,'yRange':15});
    $.plax.enable();


    //Smooth scrolling
    $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
            }
        }
    });


    //Fade in elements
    var element = $('.js-fadeInElement');
    $(element).addClass('zoomOut');
    $(window).scroll(function() {
        for (var i = 0; i < element.length; i++) {
            var elementTopToPageTop = $(element[i]).offset().top;
            var windowTopToPageTop = $(window).scrollTop();
            var windowInnerHeight = window.innerHeight;
            var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
            var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
            var distanceFromBottomToAppear = 300;

            if (elementTopToWindowBottom > distanceFromBottomToAppear) {
                $(element[i]).addClass('zoomIn');
                $(element[i]).removeClass('zoomOut');
            }
            else if (elementTopToWindowBottom < 0) {
                $(element[i]).removeClass('zoomIn');
                $(element[i]).addClass('zoomOut');
            }
        }
    });

    //Retina
    var Retina = function() {
        'use strict';
        return {
            init: function(){
                //Get pixel ratio and perform retina replacement
                //Optionally, you may also check a cookie to see if the user has opted out of (or in to) retina support
                var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
                if (pixelRatio > 1) {
                    $('img').each(function(idx, el){
                        el = $(el);
                        if (el.attr('data-src2x')) {
                            el.attr('data-src-orig', el.attr('src'));
                            el.attr('src', el.attr('data-src2x'));
                        }
                    });
                }
            }
        };
    }();
    Retina.init();


})();
