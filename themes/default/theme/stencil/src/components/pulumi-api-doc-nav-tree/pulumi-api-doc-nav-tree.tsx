import { Component, h, Prop } from "@stencil/core";
import { APINavNode } from "../pulumi-api-doc-filterable-nav/pulumi-api-doc-filterable-nav";

@Component({
    tag: "pulumi-api-doc-nav-tree",
    styleUrl: "pulumi-api-doc-nav-tree.scss",
    shadow: false,
})
export class PulumiApiDocNavTree {
    @Prop()
    nodes: APINavNode[];

    @Prop()
    baseDirectory: string;

    getNodes(nodes: APINavNode[] = this.nodes) {
        return nodes?.map(node => {
            const nodeHref = `${this.baseDirectory}${node.link}`;

            return <pulumi-api-doc-nav-node node={node} isExpanded={node.isExpanded} href={nodeHref}></pulumi-api-doc-nav-node>;
        });
    }

    render() {
        return <pulumi-tree-view>{this.getNodes()}</pulumi-tree-view>;
    }
}
