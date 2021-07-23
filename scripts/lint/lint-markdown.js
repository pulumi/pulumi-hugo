const fs = require("fs");
const yaml = require("js-yaml");
const markdownlint = require("markdownlint");
const path = require("path");

/**
 * REGEX for grabbing the the front matter of a Hugo markdown file. Example:
 *
 *     ---
 *     ...props
 *     ---
 */
const FRONT_MATTER_REGEX = /((^---\s*$[^]*?^---\s*$)|(^\+\+\+\s*$[^]*?^(\+\+\+|\.\.\.)\s*$))(\r\n|\r|\n|$)/m;
const AUTO_GENERATED_HEADING_REGEX = /###### Auto generated by ([a-z0-9]\w+)[/]([a-z0-9]\w+) on ([0-9]+)-([a-zA-z]\w+)-([0-9]\w+)/g;

/**
 * Validates if a title exists, has length, and does not have a length over 60 characters.
 * More info: https://moz.com/learn/seo/title-tag
 *
 * @param {string} title The title tag value for a given page.
 */
function checkPageTitle(title) {
    if (!title) {
        return "Missing page title";
    } else if (typeof title === "string") {
        const titleLength = title.trim().length;
        if (titleLength === 0) {
            return "Page title is empty";
        } else if (titleLength > 60) {
            return "Page title exceeds 60 characters";
        }
    } else {
        return "Page title is not a valid string"
    }
    return null;
}

/**
 * Validates that a meta description exists, has length, is not too short,
 * and is not too long.
 * More info: https://moz.com/learn/seo/meta-description
 *
 * @param {string} meta The meta description for a given page
 */
function checkPageMetaDescription(meta) {
    if (!meta) {
        return "Missing meta description";
    } else if (typeof meta === "string") {
        const metaLength = meta.trim().length;
        if (metaLength === 0) {
            return "Meta description is empty";
        } else if (metaLength < 50) {
            return "Meta description is too short. Must be at least 50 characters";
        } else if (metaLength > 160) {
            return "Meta description is too long. Must be shorter than 160 characters";
        }
    } else {
        return "Meta description is not a valid string";
    }
    return null;
}

/**
 * Builds an array of markdown files to lint and checks each file's front matter
 * for formatting errors.
 *
 * @param {string[]} paths An array of paths to search for markdown files.
 * @param {Object} [result] The result object returned after finishing searching.
 * @returns {Object} The markdown file paths to search and an error object for the files front matter.
 */
function searchForMarkdown(paths, result) {
    // If the result arg does not exist we should create it.
    if (!result) {
        result = {
            files: [],
            frontMatter: {},
        }
    }
    // Grab the first file in the list and generate
    // its full path.
    const file = paths[0];
    const fullPath = path.resolve(__dirname, file);

    // Check if the path is a directory
    const isDirectory = fs.statSync(fullPath).isDirectory();

    // Get the file suffix so we can grab the markdown files.
    const fileParts = file.split(".");
    const fileSuffix = fileParts[fileParts.length - 1];

    // Ignore auto generated docs.
    if (file.indexOf("/content/docs/reference/pkg") > -1) {
        const remaining = paths.slice(1, paths.length);
        return searchForMarkdown(remaining, result);
    }
    // If the path is a directory we want to add the contents of the directory
    // to the list.
    if (isDirectory) {
        const contents = fs.readdirSync(fullPath).map(function (file) {
            return fullPath + "/" + file;
        });
        paths[0] = contents;

        // Flatten the array.
        const newPaths = [].concat.apply([], paths);
        return searchForMarkdown(newPaths, result);
        // Else check if the file suffix is a markdown
        // and add it the resulting file list.
    }
    if (fileSuffix === "md") {
        try {
            // Read the file contents so we can grab the file header.
            const content = fs.readFileSync(fullPath, "utf8");

            // Grab the file header.
            const frontMatter = content.match(FRONT_MATTER_REGEX);

            // Remove the dash blocks around the file header.
            const fContent = frontMatter[0].split("---").join("");

            // Read the yaml.
            const obj = yaml.load(fContent);

            // If the page is auto generated, a redirect, or not indexed do not parse the front matter.
            const autoGenerated = obj.no_edit_this_page === true || content.match(AUTO_GENERATED_HEADING_REGEX);
            const redirectPassthrough = typeof obj.redirect_to === "string";
            const noIndex = obj.block_external_search_index === true;
            const allowLongTitle = !!obj.allow_long_title;
            const shouldCheckFrontMatter = !autoGenerated && !redirectPassthrough && !noIndex && !allowLongTitle;

            if (shouldCheckFrontMatter) {
                // Build the front matter error object and add the file path.
                result.frontMatter[fullPath] = {
                    error: null,
                    title: checkPageTitle(obj.title),
                    metaDescription: checkPageMetaDescription(obj.meta_desc),
                };
                result.files.push(fullPath);
            }
        } catch (e) {
            // Include the error message in the front matter error object
            // so we can display it to the user.
            result.frontMatter[fullPath] = {
                error: e.message,
            };
            result.files.push(fullPath);
        }
    }

    // If there are remaining paths in the list, keep going.
    const remaining = paths.slice(1, paths.length);
    if (remaining.length > 0) {
        return searchForMarkdown(remaining, result);
    }
    return result;
}

/**
 * Builds an array of markdown files to search through from a
 * given path.
 *
 * @param {string} parentPath The path to search for markdown files
 */
function getMarkdownFiles(parentPath) {
    const fullParentPath = path.resolve(__dirname, parentPath)
    const dirs = fs.readdirSync(fullParentPath).map(function (dir) {
        return path.join(parentPath, dir);
    });

    return searchForMarkdown(dirs);
}

/**
 * Groups the result of linting a file for markdown errors.
 *
 * @param {Object} result Results of lint errors. See: https://github.com/DavidAnson/markdownlint#usage
 * @return {Object} An object containing the file path and lint errors.
 * @return {string} result.path The full path of the linted file.
 * @return {Object[]} result.errors An array of error objects. Same as the result param.
 */
function groupLintErrorOutput(result) {
    // Grab the keys of the result object.
    const keys = Object.keys(result);

    // Map over the key array so we can combine front matter errors
    // with the markdown lint errors.
    const combinedErrors = keys.map(function (key) {
        // Get the lint and front matter errors.
        const lintErrors = result[key];
        const frontMatterErrors = filesToLint.frontMatter[key];

        // If the front matter error check threw an error add it to the lint
        // error array. Else add title and meta descriptoins if they exist.
        if (frontMatterErrors.error) {
            lintErrors.push({
                lineNumber: "File Header",
                ruleDescription: frontMatterErrors.error,
            });
        } else {
            if (frontMatterErrors.title) {
                lintErrors.push({
                    lineNumber: "File Header",
                    ruleDescription: frontMatterErrors.title,
                });
            }
            if (frontMatterErrors.metaDescription) {
                lintErrors.push({
                    lineNumber: "File Header",
                    ruleDescription: frontMatterErrors.metaDescription,
                });
            }
        }

        if (lintErrors.length > 0) {
            return { path: key, errors: lintErrors };
        }
        return null;
    });

    // Filter out all null values from the combined result array.
    const filteredErrors = combinedErrors.filter(function (err) {
        return err !== null;
    });
    return filteredErrors;
}

// Build the lint object for the content directory.
const filesToLint = getMarkdownFiles(`../../themes/default/content`);

/**
 * The config options for lint markdown files. All rules
 * are enabled by default. The config object let us customize
 * what rules we enfore and how we enforce them.
 *
 * See: https://github.com/DavidAnson/markdownlint
 */
const opts = {
    // The array of markdown files to lint.
    files: filesToLint.files,
    config: {
        // Allow inline HTML.
        MD033: false,
        // Do not enforce line length.
        MD013: false,
        // Don't force language specification on code blocks.
        MD040: false,
        // Allow hard tabs.
        MD010: false,
        // Allow puncuation in headers.
        MD026: false,
        // Allow dollars signs in code blocks without values
        // immediately below the command.
        MD014: false,
        // Allow all code block styles in a file. Code block styles
        // are created equal and we shall not discriminate.
        MD046: false,
        // Allow indents on unordered lists to be 4 spaces instead of 2.
        MD007: { indent: 4 },
        // Allow duplicate headings.
        MD024: false,
        // Allow headings to be indendented.
        MD023: false,
        // Allow blank lines in blockquotes.
        MD028: false,
        // Allow indentation in unordered lists.
        MD007: false,
    },
};

// Lint the markdown files.
const result = markdownlint.sync(opts);

// Group the lint errors by file.
const errors = groupLintErrorOutput(result);

// Get the total number of errors.
const errorsArray = errors.map(function (err) { return err.errors });
const errorsCount = [].concat.apply([], errorsArray).length;

// Create the error output string.
const errorOutput = errors.map(function (err) {
    let msg = err.path + ":\n";
    for (let i = 0; i < err.errors.length; i++) {
        const error = err.errors[i];
        msg += "Line " + error.lineNumber + ": " + error.ruleDescription;
        msg += error.errorDetail ? " [" + error.errorDetail + "].\n" : ".\n";
    }
    return msg;
}).join("\n");

// If there are errors output the error string and exit
// the program with an error.
if (errors.length > 0) {
    console.log(`
Markdown Lint Results:
    - ${filesToLint.files.length} files parsed.
    - ${errorsCount} errors found.

Errors:

${errorOutput}
    `);

    const noError = process.argv.indexOf("--no-error") > -1;
    process.exit(noError ? 0 : 1);
}

console.log(`
Markdown Lint Results:
    - ${filesToLint.files.length} files parsed.
    - ${errorsCount} errors found.
`);
process.exit(0);
