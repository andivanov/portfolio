
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


    //header scroller
    $(document).scroll(function() {
        var $el = $('.js-intro-header');
        var elHeight = $el.innerHeight()
        var pos = $(document).scrollTop();
        var parallax = parseInt(pos * -0.3) + 'px';
        var fadeStart = 0;
        var fadeUntil = elHeight / 1.2;
        var opacity = 0;

        if( pos <= fadeStart ){
          opacity = 1;
        } else if( pos <= fadeUntil ){
          opacity = 1 - pos/fadeUntil;
        }

        $el.css({
            'margin-top': parallax,
            'opacity': opacity
        });
    });

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
    $(element).addClass('fadeOut');
    $(window).scroll(function() {
        for (var i = 0; i < element.length; i++) {
            var elementTopToPageTop = $(element[i]).offset().top;
            var windowTopToPageTop = $(window).scrollTop();
            var windowInnerHeight = window.innerHeight;
            var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
            var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
            var distanceFromBottomToAppear = 200;

            if (elementTopToWindowBottom > distanceFromBottomToAppear) {
                $(element[i]).addClass('fadeIn');
                $(element[i]).removeClass('fadeOut');
            }
            else if (elementTopToWindowBottom < 0) {
                $(element[i]).removeClass('fadeIn');
                $(element[i]).addClass('fadeOut');
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


    //Parallax
    if ($('#js-parallax-window').length) {
        parallax();
    }

    $(window).scroll(function(e) {
        if ($('#js-parallax-window').length) {
            parallax();
        }
    });

    function parallax(){
        if( $('#js-parallax-window').length > 0 ) {
            var plxBackground = $('#js-parallax-background');
            var plxWindow = $('#js-parallax-window');

            var plxWindowTopToPageTop = $(plxWindow).offset().top;
            var windowTopToPageTop = $(window).scrollTop();
            var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

            var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
            var windowInnerHeight = window.innerHeight;
            var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
            var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
            var plxSpeed = 0.35;

            plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
        }
    }


})();
