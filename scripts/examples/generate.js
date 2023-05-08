const nodeFetch = require("node-fetch");
const handlebars = require("handlebars");
const yaml = require("js-yaml");
const fs = require("fs");

// export EXAMPLES_API="$(pulumi stack output -s moolumi/examples-api/dev apiURL)"
const examplesAPI = process.env.EXAMPLES_API || "";

const templateSource = fs.readFileSync("./scripts/examples/example.hbs", "utf8");
const template = handlebars.compile(templateSource);

async function generateExamples() {
    const response = await nodeFetch(`${examplesAPI}examples`);
    const examples = await response.json();

    examples.forEach(async example => {
        await renderExample(example);
    });
}

async function renderExample(example) {
    const result = template({
        ...{
            title: example.title,
            description: "This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.",
            id: example.id,
            program: yaml.dump({ program: example.program || null }),
            stack: yaml.dump({ stack: example.stack || null }),
            lastUpdate: yaml.dump({ lastUpdate: example.lastUpdate || null }),
            readme: example.readme,
        },
    });
    fs.writeFileSync(`./themes/default/content/examples/${example.id}.md`, result);
}

generateExamples();
