
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    /*
    // The key of this entry is the [name] of output, default is "main". The 'output' config item will override the output of 'entry' property
    entry: {
        mainXXX: './src/index.js'       
        // poly: './polyfills.js'
    },
    */
    mode: 'development',     // The bundle will be minified in 'production' mode
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: "index.html",  // The target filename will be index.html on default
                template: "src/assets/index.html"
            }
        ),
        new CleanWebpackPlugin(),
        
        new CopyPlugin({
            patterns: [
                {
                   from: "src/assets/manifest.json"
                   // to: "dist/manifest.json"  // Not working with dev-server if specify destination !!!!
                   // transform(content, path) { modifier ... }     // actually we can modify the file content before paste it
                },
                {
                    from: "src/assets/favicon.ico"
                },
                {
                    from: "src/assets/css/**"
                }
            ],
            options: {
                concurrency: 20
            }
        }),
        
        new MiniCssExtractPlugin({
            // filename: 'main.css'
            // path: '/css/',
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "style.[chunkhash:8].css",
            chunkFilename: "style.[id].[chunkhash:8].css"
        })
    ],
    
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'bundle.[name].[chunkhash:8].js'
    },
    
    module: {
        strictExportPresence: true,
        rules: [
            {
                // Don't know why .png urls in css not working in dev running with dev-server
                // test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                test: /\.(jpg|jpeg|gif|bmp)$/,
                loader: require.resolve('url-loader'),
                options: {
                  limit: 100000,
                  name: 'static/[name].[hash:8].[ext]'  // imgaes will save as static resources when its size it larger than 'limit'
                }
            },
            {
                test: /\.(js|jsx|mjs)$/,
                // exclude: /(node_modules|bower_components)/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: 'babel-loader',         // Use babel-loader for ES6+ syntax transform, otherwise can only use JavaScript-5
                    options: { presets: ['react-app'] }     // Aligned babel for React, including JSX parsing
                }
            },

            {
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(__dirname, "src/views")        // For scss defined in view components, we use CSS Module
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: "local",      // actually "local" is the default scope value.
                                localIdentName: "[name]_[local]_[hash:base64:5]"
                            },
                            import: true,
                            importLoaders: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },

            {
                test: /\.(css|scss)$/,
                include: [
                    path.resolve(__dirname, "src/scss"),
                    path.resolve(__dirname, "src/assets/css"),
                    path.resolve(__dirname, "src/assets/scss")      // global or assets css/scss, merge to one file
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(svg|png)$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/[name].[hash:8].[ext]'
                }
            },

            {
                test: /\.(md|txt)$/,
                loader: require.resolve('raw-loader')
            }

        ]
    },
    /*
    watch: true,    // dev-server enable watch automatically
    */
    devServer: {
        port: 3000,
        // index: '/test.html',    // default is index.html, but we can use any name because the devServer will install it as this name.
        open: true,
        historyApiFallback: true,       // SPA navigation

        /* ------- Proxy https or https/h2 server ------- */
        proxy: {
            "/api/": {
                target: "http://localhost:8080",
                pathRewrite: { '^/api': '/routing' },   // backend apis path prefix is "/routing/..."
                secure: false,
                proxyTimeout: 8 * 60 * 1000,
                onProxyReq: (proxyReq, req, res) => req.setTimeout(8 * 60 * 1000)
                // changeOrigin: true
                // bypass: bypassFunction,
                // onProxyReq: relayRequestHeaders,
                // onProxyRes: relayResponseHeaders
            }
        }
/* ---------------------------------------------- */
    }
};
