$(".section-registry").on("filterSelect", event => {
    const source: any = event.target;
    const detail: unknown = event.detail;
    const filters = detail as any[];

    const packages = $(".all-packages").find(".package");

    const noSelectedType = filters.find(f => f.group === "type") === undefined;
    const noSelectedCategory = filters.find(f => f.group === "category") === undefined;

    if (filters.length > 0) {
        $(packages).addClass("hidden");

        $(packages).each((i, package) => {
            const el = $(package).find("[data-category]");

            const packageType = el.attr("data-type");
            const packageCategory = el.attr("data-category");
            const packageIsNative = packageType === "native-provider";

            const packageHasSelectedType =
                !!filters.find(f => f.group === "type" && f.value === packageType) || (filters.find(f => f.group === "type" && f.value === "provider") && packageIsNative);
            const packageHasSelectedCategory = !!filters.find(f => f.group === "category" && f.value === packageCategory);

            /**
                Show the package if it matches any of the selected filters. For example:

                * If type Component and type Provider are selected, show packages that are
                  tagged as either "component" OR "provider", since those two filters belong
                  to the same option group.

                * If type Component and use-case Cloud are selected, show packages that
                  are tagged as both "component" AND "cloud", since those two filters
                  belong to different option groups.

                * If nothing is selected from a given group, assume the intent is to see
                  everything in that group (so don't apply any of the filters within it).
             */
            if ((packageHasSelectedType || noSelectedType) && (packageHasSelectedCategory || noSelectedCategory)) {
                $(package).removeClass("hidden");
            }
        });
    } else {
        $(packages).removeClass("hidden");
    }

    // Update the list of active filters.
    const activeTags = $("ul.active-tags");
    activeTags.empty();

    filters.forEach(filter => {
        const tag = $($("#active-tag-template").html());
        tag.appendTo(activeTags);
        tag.attr("data-filter-group", filter.group).attr("data-filter-value", filter.value);
        tag.find("span").text(filter.label);
        tag.find("button").on("click", () => source.deselect(filter));
    });

    // Apply selections on the DOM, so cards and tags can use them as well.
    $(".packages, .active-tags")
        .attr(
            "data-selected-types",
            filters
                .filter(f => f.group === "type")
                .map(t => t.value)
                .join(","),
        )
        .attr(
            "data-selected-categories",
            filters
                .filter(f => f.group === "category")
                .map(t => t.value)
                .join(","),
        );

    // Update the count-badge value.
    const allCount = $(".all-packages .package:not(.hidden)").length;
    $(".all-count").text(allCount);

    // Close the menu.
    $("pulumi-filter-select-option-group").each((i, el: any) => el.close());
});

$(".section-registry .no-results .reset").on("click", event => {
    event.stopPropagation();
    const fs = $("pulumi-filter-select").get(0) as any;
    fs.reset();
});

document.addEventListener("DOMContentLoaded", function () {
    const logoNavMenuButton = $(".logo-nav-button");
    const bgMask = $(".logo-nav-bg-mask");
    const logoNavMenu = $("#logo-nav-menu");

    function toggleMenu() {
        logoNavMenu.toggleClass("hidden");
        const navMenuVisible = logoNavMenu.is(":visible");
        logoNavMenuButton.attr("aria-expanded", `${navMenuVisible}`);
        $(".logo-nav-button .mobile-menu-toggle-icon").toggleClass("hidden");
        bgMask.toggleClass("hidden");
    }

    logoNavMenuButton.on("click", toggleMenu);
    // This handles closing the menu when selecting outside for Registry.
    bgMask.on("click", toggleMenu);

    // This handles closing the menu when selecting outside for non-Registry.
    $(document).on("click", function (event) {
        if ($(event.target).closest(logoNavMenuButton).length === 0 &&
            $(event.target).closest(logoNavMenu).length === 0 &&
            logoNavMenu.is(":visible")) {
            toggleMenu();
        }
    });

    // Close the menu when the page is scrolled past point where the
    // practitioner nav is replaced with the sticky search nav.
    $(document).on("scroll", function () {
        const PRACTITIONER_NAV_HEIGHT = 53;
        const scrollY = window.scrollY;
        if (scrollY > PRACTITIONER_NAV_HEIGHT && logoNavMenu.is(":visible")) {
            toggleMenu();
        }
    });
});
