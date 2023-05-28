(function (document, $) {
    var docsMainNav = $("#docs-main-nav");
    var docsToggle = $(".docs-nav-toggle");
    var docsMainNavWrapper = $(".docs-main-nav-wrapper");
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    docsToggle.on("click", function () {
        if (docsMainNav.css("display") === "none") {
            docsMainNav.css("display", "flex");
            docsToggle.css("left", "281px");
            docsMainNavWrapper.css("top", "-40px");
            docsToggle.css("top", "150px");
        } else {
            docsMainNav.css("display", "none");
            docsToggle.css("left", "0px");
        }
    });
})(document, jQuery);