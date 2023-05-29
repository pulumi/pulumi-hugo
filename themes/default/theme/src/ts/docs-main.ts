var docsMainNavToggleWrapper = $(".docs-main-nav-toggle-wrapper");
var topNavContainer = $(".top-nav-container");
var docsMainNav = $(".docs-main-nav");
var docsNavToggleIcon = $(".docs-nav-toggle-icon");

(function (document, $) {
    var docsToggle = $(".docs-nav-toggle");

    docsToggle.on("click", function () {
        setDocsMainNavPosition();
        if (docsMainNavToggleWrapper.hasClass("docs-nav-show")) {
            docsMainNavToggleWrapper.removeClass("docs-nav-show");
            docsMainNavToggleWrapper.addClass("docs-nav-hide");
            docsNavToggleIcon.addClass("open-docs-main-nav");
        } else {
            docsMainNavToggleWrapper.removeClass("docs-nav-hide");
            docsMainNavToggleWrapper.addClass("docs-nav-show");
            docsNavToggleIcon.addClass("close-docs-main-nav");
        }
    });
})(document, jQuery);

$(window).on("resize", function () {
    if ($(this).width() >= 1280) {
        if (docsMainNavToggleWrapper.hasClass("docs-nav-show")) {
            docsMainNavToggleWrapper.removeClass("docs-nav-show");
        } else if (docsMainNavToggleWrapper.hasClass("docs-nav-hide")) {
            docsMainNavToggleWrapper.removeClass("docs-nav-hide");
        }
    } else {
        docsMainNavToggleWrapper.addClass("docs-nav-hide");
    }
}).trigger('resize');

$(window).on("scroll", function () {
    setDocsMainNavPosition();
}).trigger('resize');

$(window).on("load", function() {
    setDocsMainNavPosition();
    docsMainNavToggleWrapper.addClass("docs-nav-hide");
});

function setDocsMainNavPosition() {
    if ($(this).width() < 1280) {
        if (docsMainNavToggleWrapper.hasClass("docs-nav-show")) {
            docsNavToggleIcon.addClass("open-docs-main-nav");
        } else {
            docsNavToggleIcon.addClass("close-docs-main-nav");
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