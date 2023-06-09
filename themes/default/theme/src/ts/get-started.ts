// controls code rendering of quickstart based on the selected 
// combination of cloud, language, and template.
(function ($) {
    $('input[name="language-radio"], input[name="credentials-radio"], input[name="templates-radio"]').change(function () {
        if ($(this).is(":checked")) {
            const selectedValue = $(this).val();
            const cloud = $('input[name="credentials-radio"]:checked').val();
            const language = $('input[name="language-radio"]:checked').val();
            const template = $('input[name="templates-radio"]:checked').val();
            console.log("template", template)
            $("#template-command").html(`pulumi new ${template ? template + "-" : ""}${cloud}-${language}`);
            $("[id^=template-content]").css("display", "none");
            $(`#template-content-${language}`).css("display", "block");
            $("[id^=next-steps-]").css("display", "none");
            if (!template) {
                $(`#next-steps-${cloud}`).css("display", "block");
            }
        }
    });

    const labelGroups = ["os", "cloud", "language", "template"];
    labelGroups.forEach(labelGroup => {
        $(`label[for^="${labelGroup}-"]`).click(function () {
            $(`label[for^="${labelGroup}-"]`).removeClass("selected");
            $(this).addClass("selected");
        });
    });

    $('input[id="credentials-checkbox"').change(function () {
        console.log("credentials checkbox changed");
        if ($(this).is(":checked")) {
            $("#credentials-step").css("display", "flex");
        } else {
            $("#credentials-step").css("display", "none");
        }
    });

    function setOS() {
        const userAgent = navigator.userAgent;
        let os = "osx";
        if (userAgent.indexOf("Win") !== -1) {
            os = "windows";
        } else if (userAgent.indexOf("Mac") !== -1) {
            os = "osx";
        } else if (userAgent.indexOf("Linux") !== -1) {
            os = "linux";
        }
        $(`#os-${os}-radio`).prop("checked", true);
        $(`label[for^="os-"]`).removeClass("selected");
        $(`label[for="os-${os}-radio"]`).addClass("selected");
    }

    function initQuickStart() {
        $("[id^=template-content]").css("display", "none");
        $("#template-content-typescript").css("display", "block");
        setOS();
    }

    initQuickStart();
})((args) => jQuery(args, jQuery("#pulumi-quickstart"))); //scope this to the quickstart section of the site
