import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import historyRouter from "instantsearch.js/es/lib/routers/history";

function hitTemplate(hit) {
    return `
        <article>
            <h3><a href="${ hit.url }">${ hit.program.name }</a></h3>
            <p>${ hit.description }</p>
        </article>
    `;
}

const searchClient = algoliasearch("1174010HRV", "7df9037684fa87409111b2c75ae565bb");

const search = instantsearch({
    searchClient,
    indexName: "pulumi",
});


// console.log({ search });
search.start();
