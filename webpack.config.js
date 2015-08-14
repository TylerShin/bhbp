module.exports = {
    context: __dirname + "/app/assets/javascripts",
    entry: "./reactinput.js",

    output: {
        filename: "profiles_index.js",
        path: __dirname + "/app/assets/javascripts",
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"],
        }],
    }
}
