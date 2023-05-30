var docsMainNavToggleWrapper = $(".docs-main-nav-toggle-wrapper");
var topNavContainer = $(".top-nav-container");
var docsMainNav = $(".docs-main-nav");
var docsNavToggleIcon = $(".docs-nav-toggle-icon");

(function (document, $) {
    var docsToggle = $(".docs-nav-toggle");

    docsToggle.on("click", function () {
        setDocsMainNavPosition();
        docsMainNavToggleWrapper.toggleClass("docs-nav-show");
        docsMainNavToggleWrapper.toggleClass("docs-nav-hide");
        docsNavToggleIcon.toggleClass("close-docs-main-nav");
        docsNavToggleIcon.toggleClass("open-docs-main-nav");
    });
})(document, jQuery);

$(window).on("resize", function () {
    setDocsMainNavPosition();
    if ($(this).width() >= 1280) {
        docsMainNavToggleWrapper.removeClass("docs-nav-show");
        docsMainNavToggleWrapper.removeClass("docs-nav-hide");
    } else if(!docsMainNavToggleWrapper.hasClass("docs-nav-hide") && !docsMainNavToggleWrapper.hasClass("docs-nav-show")) {
        docsMainNavToggleWrapper.addClass("docs-nav-hide");
    }
}).trigger('resize');

$(window).on("scroll", function () {
    setDocsMainNavPosition();
}).trigger('resize');

$(window).on("load", function() {
    setDocsMainNavPosition();
});

function setDocsMainNavPosition() {
    if ($(this).width() < 1280) {
        if (docsMainNavToggleWrapper.hasClass("docs-nav-show")) {
            docsNavToggleIcon.removeClass("open-docs-main-nav")
            docsNavToggleIcon.addClass("close-docs-main-nav");
        } else if (docsMainNavToggleWrapper.hasClass("docs-nav-hide")) {
            docsNavToggleIcon.removeClass("close-docs-main-nav")
            docsNavToggleIcon.addClass("open-docs-main-nav");
        }

        if (isInViewport(topNavContainer.get(0))) {
            docsMainNavToggleWrapper.css("top", 114);
        } else {
            docsMainNavToggleWrapper.css("top", 60);
        }
    } else {
        docsMainNavToggleWrapper.css("top", 0);
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