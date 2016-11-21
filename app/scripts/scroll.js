(function scrollMagic() {

    // init scrollMagic
    var controller = new ScrollMagic.Controller();

    $('.js-fade-in').each(function () {

        // build a scene
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            duration: '100%',
            triggerHook: 0.8
        })

        .setClassToggle(this, 'fade-in')
        .addTo(controller);

    });

} ());
