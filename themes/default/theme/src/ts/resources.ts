const filterResourceItems = (filters) => {

    const events = $(".event-list").find(".event-card");
    const monthLabels = $(".event-list").find(".month-label");

    if (filters.length > 0) {
        $(events).each((i, event) => {
            const tags = ($(event).attr("data-filters")).split(' ');
            const dateLabel = $(event).attr("data-month-label");

            filters.forEach(filter => {
                if (!tags.includes(filter)) {
                    $(event).css("display", "none");
                } else if (!tags.includes(location.hash.slice(1))) {
                    $(event).css("display", "none");
                } else {
                    $(event).css("display", "block");
                }
            });
        });
    } else {
        $(events).css("display", "block");
    }
}

$(".pulumi-event-list-container").on("filterSelect", event => {
    const detail: unknown = event.detail;
    const filters = detail as any[];
    const filtersText: string[] = [];

    filters.forEach(filter => {
        filtersText.push(filter.value);
    });

    filterResourceItems(filtersText);
});

$(function () {
    const resourcesEventListFilterNav = document.getElementById("event-list-filter-nav");
    if (resourcesEventListFilterNav) {
        // When the arrows are selected, they scroll the tertiary nav in either direction.
        $("#slideForward").on("click", function () {
            // The width of an individual tab, so the scroll brings one additional full tab into view.
            resourcesEventListFilterNav.scrollLeft += 180;
        });

        $("#slideBackwards").on("click", function () {
            // The width of an individual tab, so the scroll moves one full tab into view.
            resourcesEventListFilterNav.scrollLeft -= 180;
        });

        // If the last or first items are fully in view (depending on the scroll direction),
        // the scroll arrow button is hidden from view (since it's no longer possible to scroll).
        const options = {
            root: document.getElementById("event-list-filter-nav"),
            // To count as in view, the tab must be 100% in view.
            threshold: 1.0,
        };

        const controlScrollForwardVisibility = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $("#slideForward").addClass("hidden");
                } else {
                    $("#slideForward").removeClass("hidden");
                }
            });
        };

        const scrollForwardObserver = new IntersectionObserver(controlScrollForwardVisibility, options);
        const lastNavItem = document.querySelector("#event-list-filter-nav li:last-of-type");
        scrollForwardObserver.observe(lastNavItem);

        const controlScrollBackwardVisibility = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $("#slideBackwards").addClass("hidden");
                } else {
                    $("#slideBackwards").removeClass("hidden");
                }
            });
        };
        const scrollBackwardObserver = new IntersectionObserver(controlScrollBackwardVisibility, options);
        const firstNavItem = document.querySelector("#event-list-filter-nav li:first-of-type");
        scrollBackwardObserver.observe(firstNavItem);
    }
});
