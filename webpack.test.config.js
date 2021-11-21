import * as path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';

const CopyPlugin = CopyWebpackPlugin;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const test_folder = 'test'

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, 'src', 'index'),
    output: {
        library: {
            name: 'v3d-web',
            type: 'umd',
        },
        filename: '[name].test.js',
        path: path.resolve(__dirname, test_folder),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.ts'],
        symlinks: false,
    },
    experiments: {
        topLevelAwait: true,
    },
    target: ['web'],
    devServer: {
        allowedHosts: 'localhost',
        static: {
            directory: path.resolve(__dirname, test_folder),
        },
        compress: true,
        port: 8080,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/vendor", to: "src/vendor"},
                {from: "node_modules/@mediapipe/holistic", to: "."},
            ],
        }),
    ],
};

export default config;