const path = require('path');

module.exports = {
    entry: './src/Character/CharacterCenter.ts',
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
