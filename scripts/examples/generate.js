const nodeFetch = require("node-fetch");
const handlebars = require("handlebars");
const yaml = require("js-yaml");
const fs = require("fs");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
            ...example,
            resources: yaml.dump({ resources: example.resources || [] }),
            summary: (await summarizeExample(example)).data.choices[0].text.trim(),
        },
    });
    fs.writeFileSync(`./themes/default/content/examples/${example.id}.md`, result);
}

async function summarizeExample(example) {
    return openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize the Pulumi example at ${example.url} in five sentences or less, explaining what the example does, which cloud provider and programming language it uses, and the general cloud-computing use case it serves.`,
        max_tokens: 256,
    });
}

generateExamples();
