import { Component, Prop, State, h } from "@stencil/core";
// import { resources } from "./resources";

// Scroll to top button.
@Component({
    tag: "pulumi-related-content",
    shadow: false,
})
export class ResourceLinks {
    @Prop()
    pagetitle: string;

    @Prop()
    href: string;

    @Prop()
    file: string;

    @State()
    related: [];

    componentWillLoad() {
        // Fetch JSON file containing resource link information.
        fetch(`/${this.file}`)
        .then(resp => resp.json())
        .then((response) => {
            // const relatedResources = response;
            // if (relatedResources) {
            //     const pkg = this.packageName.toLowerCase();
            //     const module = this.moduleName.toLowerCase();
            //     const typ = this.resourceName.toLowerCase();

            //     // Look up related links for this resource.
            //     this.related = relatedResources[pkg] ? relatedResources[pkg][module] ? relatedResources[pkg][module][typ] : undefined : undefined;

            // }
            console.log(response);
            console.log(response[this.pagetitle]);
            this.related = response[this.pagetitle];
        })
        .catch(err => console.error(err));
    }

    render() {
        // relatedResources will be set once the response returns and state is updated,
        // so return empty div until then.
        if (!this.related) {
            return <div></div>
        }
        return (
            <div class="container">
                <hr class="mr-5"/>
                <div class="heading text-lg">Related</div>
                <hr></hr>
                    {
                        this.related.slice(0,3).map((page: string) => {
                            // @ts-ignore
                            const parsed = JSON.parse(page.label);
                            // Parse out the module and resource from the related resource.
                            // We are currently only linking to resources related in the
                            // same package.
                            // const parts = typ.split("/");
                            // let module = parts.slice(0, parts.length-1).join("/");
                            // const resource = parts[parts.length-1];
                            // const rellink = `/registry/packages/${pkg}/api-docs/${module.toLowerCase()}/${resource.toLowerCase()}/`;
                            // @ts-ignore
                            return <div class="links text-blue-600"><a href={parsed.href}>{`${parsed.title}`}</a><hr></hr></div>
                        })
                    }
            </div>
        );
    }
}
