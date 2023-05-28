var docsMainNavWrapper = $(".docs-main-nav-wrapper");
var topNavContainer = $(".top-nav-container");
var docsMainNav = $(".docs-main-nav");

(function (document, $) {
    var docsToggle = $(".docs-nav-toggle");

    docsToggle.on("click", function () {
        setDocsMainNavPosition();
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

$(window).on("scroll", function () {
    setDocsMainNavPosition();
}).trigger('resize');

function setDocsMainNavPosition() {
    if ($(this).width() < 1280) {
        if (isInViewport(topNavContainer.get(0))) {
            docsMainNav.css("top", 114);
        } else {
            docsMainNav.css("top", 60);
        }
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}