const path = require('path');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: path.resolve(__dirname, './src/browser-detection/index.ts'),
    output: {
        path: path.resolve(__dirname, 'files/browser-detection'),
        filename: 'index.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: 'url-loader',
            },
        ],
    },
    performance: {
        hints: false,
    },
};
