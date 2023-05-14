/* eslint-env node */

// TODO: Emit type declaration
module.exports = () => {
  return {
    mode: "production",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    entry: {
      "prosemirror-unified": "./src/index.ts",
    },
    output: {
      filename: "[name].js",
      library: {
        type: "module",
      },
    },
    externals: {
      "prosemirror-commands": "module prosemirror-commands",
      "prosemirror-inputrules": "module prosemirror-inputrules",
      "prosemirror-keymap": "module prosemirror-keymap",
      "prosemirror-model": "module prosemirror-model",
      "prosemirror-state": "module prosemirror-state",
      unified: "module unified",
    },
    optimization: {
      minimize: false,
    },
    experiments: {
      outputModule: true,
    },
  };
};
