const path = require("path");

if (!process.env.JS_BUNDLE) {
    throw new Error("Missing required environment variable JS_BUNDLE. Exiting.");
}

module.exports = () => {
    return {
        mode: "production",
        entry: {
            index: "./assets/src/main.ts",
        },
        output: {
            filename: `../${process.env.JS_BUNDLE}`,
        },
        resolve: {
            extensions: [".ts", ".js"],
            modules: [
                `${path.join(__dirname, "assets/ts")}`,
                "node_modules"
            ],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        }
    }
}
