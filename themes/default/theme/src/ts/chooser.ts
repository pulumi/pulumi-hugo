import { getQueryVariable } from "./util";

function getElemClasses(e) {
    return ($(e).attr("class") || "").split(/\s+/);
}

// selectChoice applies the specified choice for all on-page choosers.
function selectChoice(kind, choice) {
    $(`pulumi-chooser[type="${kind}"]`).attr("selection", choice);
}

$(document).on("DOMContentLoaded", function () {

    // If a query param's been provided for a tab category, honor that.
    ["language", "os", "cloud", "k8s-language", "input-kind"].forEach(function (kind) {
        var val = getQueryVariable(kind);
        if (val) {
            selectChoice(kind, val);
        }
    });
});
