import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

const appID = "1174010HRV";
const publicApiKey = "7df9037684fa87409111b2c75ae565bb";
const searchClient = algoliasearch(appID, publicApiKey);

window.addEventListener("DOMContentLoaded", () => {
    const container = "#autocomplete";

    if (document.querySelector(container)) {
        initAutocomplete(container);
    }
});

function initAutocomplete(container) {
    autocomplete({
        container,
        placeholder: "Search...",
        getSources: ({ query }) => {
            return [
                {
                    sourceId: "items",
                    getItems: (params) => {
                        return getAlgoliaResults({
                            searchClient,
                            queries: [
                                {
                                    indexName: "pulumi",
                                    query,
                                }
                            ],
                        })
                    },
                    getItemUrl: ({ item, state }) => {
                        const url = new URL([document.location.origin, item.href].join(""));
                        return url.toString();
                    },
                    templates: {
                        header: ({ components, html }) => {
                            return html`
                                <div class="mb-2">
                                    <div class="text-xs">Here is a header.</div>
                                </div>
                            `;
                        },
                        item: ({ item, components, html }) => {
                            // console.log({ item });
                            return html`
                                <div class="mb-2">
                                    <div class="text-xs font-semibold">${ item.title }</div>
                                    <div class="text-xs">${ item.description }</div>
                                </div>
                            `;
                        },
                        noResults: ({ components, html }) => {
                            return html`
                                <div class="mb-2">
                                    <div class="text-xs font-semibold">No results found.</div>
                                </div>
                            `;
                        },
                        footer: ({ components, html }) => {
                            return html`
                                <div class="mb-2">
                                    <div class="text-xs">Here is a footer.</div>
                                </div>
                            `;
                        },
                    },
                },
            ];
        },
    });
}
