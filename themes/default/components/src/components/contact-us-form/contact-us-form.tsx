import { Component, Prop, State, h } from "@stencil/core";
import { MultiSelectFormItem } from "../pulumi-multi-select-form/pulumi-multi-select-form";
import { getQueryVariable } from "../../util/util";

interface ContactUsItem {
    key: string;
    hubspot_form_id: string;
}

@Component({
    tag: "pulumi-contact-us-form",
    styleUrl: "contact-us-form.css",
    shadow: false,
})
export class ContactUsForm {
    // The JSON string of the sessions.
    @Prop()
    items: string;

    // The class for the select input.
    @Prop()
    selectClass?: string;

    // The labelClass defines the class for the label.
    @Prop()
    labelClass?: string;

    // The parsed and transformed session string.
    @State()
    parsedItems: MultiSelectFormItem[];

    @State()
    defaultFormId: string = "";

    componentWillLoad() {
        const formQueryParam = getQueryVariable("form");
        this.parsedItems = JSON.parse(this.items).map((item: ContactUsItem) => {
            return {
                key: (item.key.charAt(0).toUpperCase() + item.key.slice(1)).replace(/-/g, " "),
                selected: formQueryParam ? item.key.toLowerCase() === formQueryParam.toLowerCase() : undefined,
                hubspotFormId: item.hubspot_form_id
            };
        });

        if (formQueryParam) {
            const selectedForm = this.parsedItems.find((item) => item.selected === true);
            if (selectedForm) {
                this.defaultFormId = selectedForm.hubspotFormId;
                return;
            }
        }
    }

    render() {
        return (
            <pulumi-multi-select-form
                items={this.parsedItems}
                selectClass={this.selectClass}
                labelClass={this.labelClass}
                labelText="What can we help you with?"
                defaultFormId={this.defaultFormId}
            />
        );
    }
}
