const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");

function getFiles(basePath, results = []) {
    const contents = fs.readdirSync(basePath);

    for (const file of contents) {
        const filePath = path.join(basePath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            const dirContents = getFiles(filePath);
            results.push(...dirContents);
            continue;
        }

        results.push(filePath);
    }

    return results;
}

function checkLinks(filePath) {
    const failures = [];

    const file = fs.readFileSync(filePath).toString();
    const root = parse(file);
    const links = root.querySelectorAll("a");
    for (const l of links) {
        const b = file.substring(0, file.indexOf(l.outerHTML.split("\n")[0]));
        const lineNumber = b.split("\n").length;
        const element = l.outerHTML;

        if (!l.getAttribute("href")) {
            failures.push({
                element,
                filePath,
                lineNumber,
                message: "Missing href",
            });
            continue;
        }

        if (l.getAttribute("href").indexOf("relref") > -1) {
            failures.push({
                element,
                filePath,
                lineNumber,
                message: "Links is using a relref which is no longer supported",
            });
            continue;
        }

        if (l.getAttribute("href").split("#")[0].slice(-1) !== "/") {
            failures.push({
                element,
                filePath,
                lineNumber,
                message: "Missing trailing slash",
            });
        }
    }

    return failures;
}

async function checkFiles(files, failures = []) {
    const file = files.shift();
    const fileFailures = checkLinks(file);
    failures.push(...fileFailures);

    if (files.length === 0) {
        return failures;
    }

    return checkFiles(files, failures);
}

function renderFileOutput(filePath, failures) {
    return `${filePath}:
  ${failures.sort((a, b) => a.lineNumber > b.lineNumber).map(f => `Line ${f.lineNumber}: ${f.message}`).join("\n  ")}`
}

async function main() {
    const files = getFiles("./themes/default/layouts/");

    const failures = await checkFiles(files);
    const sortedFailures = failures.reduce((res, curr) => {
        if (!res[curr.filePath]) {
            res[curr.filePath] = [];
        }

        res[curr.filePath].push(curr);

        return res;
    }, {});

    const output = [];
    for (const key of Object.keys(sortedFailures)) {
        const value = sortedFailures[key];
        output.push(renderFileOutput(key, value));
    }

    console.log(`
Link Lint Results:
  - ${files.length} files checked
  - ${Object.values(output).length} issues found.
`);

    if (Object.values(output).length > 0) {
        console.log("Issues:\n");
        console.log(output.join("\n\n"), "\n");
        throw Error("Issues with links found");
    }
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.log("ERROR", e);
        process.exit(1);
    });
