var docsMainNavToggleWrapper = $(".docs-main-nav-toggle-wrapper");
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
    } 

    var mainNav = $(".main-nav");
    var mainNavToggle = $(".docs-nav-toggle");
    if (document.getElementsByClassName("docs-list-main").length > 0) {
        if ($(".docs-list-main").get(0).getBoundingClientRect().y <= 0) {
            mainNav.css("margin-top", 60 - Math.max($(".top-nav-container").get(0).getBoundingClientRect().y, 0));
            mainNavToggle.css("top", 211 - Math.max($(".top-nav-container").get(0).getBoundingClientRect().y, 0));
        } else {
            mainNav.css("margin-top", 0);
        }
    }
}
