
(function () {

    var date = new Date();
    var thisYear = date.getFullYear();
    $('.js-year').html(thisYear);

    //Intro section - Plax effect
    $('.intro-image').plaxify({'xRange':10,'yRange':20});
	$('.intro-image-2').plaxify({'xRange':7,'yRange':10});
    $('.intro-image-3').plaxify({'xRange':10,'yRange':15});
    $.plax.enable();



})();
