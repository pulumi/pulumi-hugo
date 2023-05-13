const algoliasearch = require("algoliasearch");

const pathToObjects = process.argv[2];
const objects = require(pathToObjects);

const config = {
    appID: process.env.ALGOLIA_APP_ID,
    searchAPIKey: process.env.ALGOLIA_APP_SEARCH_KEY,
    adminAPIKey: process.env.ALGOLIA_APP_ADMIN_KEY,
};

const client = algoliasearch(config.appID, config.adminAPIKey);
const index = client.initIndex("pulumi");

index
    .replaceAllObjects(objects, { safe: true })
    .then(result => console.log(result.objectIDs));
