(function gsap() {

    var elIntroHeader = $('.gsap-intro-header');
    var elIntroNav = $('.gsap-intro-nav');
    var elIntroBg = $('.gsap-intro-bg');
    var tlIntro = new TimelineLite();

    tlIntro.from(elIntroHeader, 0.5, {
        autoAlpha: 0,
        y: -50,
        ease: Power1.easeOut,
        delay: 0.75
    }).staggerFrom(elIntroBg, 0.75, {
        autoAlpha: 0,
    }, 0.5).from(elIntroNav, 0.5, {
        autoAlpha: 0
        }, '+= 3');

} ());
