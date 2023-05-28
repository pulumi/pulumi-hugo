var docsMainNavWrapper = $(".docs-main-nav-wrapper");

(function (document, $) {
    var docsToggle = $(".docs-nav-toggle");

    docsToggle.on("click", function () {
        if (docsMainNavWrapper.hasClass("docs-nav-show")) {
            docsMainNavWrapper.removeClass("docs-nav-show");
            docsMainNavWrapper.addClass("docs-nav-hide");
        } else {
            docsMainNavWrapper.removeClass("docs-nav-hide");
            docsMainNavWrapper.addClass("docs-nav-show");
        }
    });
})(document, jQuery);

$(window).on("resize", function () {
    if ($(this).width() >= 1280) {
        if (docsMainNavWrapper.hasClass("docs-nav-show")) {
            docsMainNavWrapper.removeClass("docs-nav-show");
        } else if (docsMainNavWrapper.hasClass("docs-nav-hide")) {
            docsMainNavWrapper.removeClass("docs-nav-hide");
        }
    }
}).trigger('resize');