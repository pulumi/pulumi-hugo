(function (document, $) {
    var docsMainNavWrapper = $(".docs-main-nav-wrapper");
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