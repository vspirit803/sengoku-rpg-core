const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
    entry: './src/Game/Game.ts',
    // entry: './src/index.ts',
    module: {
        rules: [
            {
                // test: /test\/\.tsx?$/,
                test: [path.resolve(__dirname, 'test')],
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '@src': resolve('src'),
            '@assets': resolve('assets'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
