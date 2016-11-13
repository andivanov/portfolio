
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
    $(element).addClass('js-fade-element-hide');
    $(window).scroll(function() {
        for (let i = 0; i < element.length; i++) {
            let elementTopToPageTop = $(element[i]).offset().top;
            let windowTopToPageTop = $(window).scrollTop();
            let windowInnerHeight = window.innerHeight;
            let elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
            let elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
            let distanceFromBottomToAppear = 200;

            if (elementTopToWindowBottom > distanceFromBottomToAppear) {
                $(element[i]).addClass('js-fade-element-show');
            }
            else if (elementTopToWindowBottom < 0) {
                $(element[i]).removeClass('js-fade-element-show');
                $(element[i]).addClass('js-fade-element-hide');
            }
        }
    });


})();
