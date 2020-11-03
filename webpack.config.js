
const path=require("path");
//const webpack=require("webpack");

module.exports={
    mode:"development",
    entry:`./src/index.js`,
    output:{
        filename:"App.js",
        path:path.resolve(__dirname,"www"),
    },
    devtool:"inline-source-map",
    module:{
        rules:[
            {
                test: /\.css$/,
                use:["style-loader","css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                use:"url-loader",
            },
        ]
    },
    watch:true,
    watchOptions:{
        aggregateTimeout:0,
        poll:true,
        ignored:["node_modules/**"],
    },
    resolve:{
        alias:{
            "vanilla":path.resolve(__dirname,"Vanilla.js"),
            "estate":path.resolve(__dirname,"src/Estate.js"),
            "assets":path.resolve(__dirname,"src/Assets"),
            "components":path.resolve(__dirname,"src/Components"),
            "routes":path.resolve(__dirname,"src/Routes"),
            "afile":path.resolve(__dirname,"src/Afile"),
        },
    },
}