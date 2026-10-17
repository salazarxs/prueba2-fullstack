module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'webpack'],

        files: [{ pattern: 'src/tests/index.js', watched: false }],
        preprocessors: { 'src/tests/index.js': ['webpack'] },

        webpack: {
            mode: 'development',
            devtool: 'inline-source-map',
            resolve: { extensions: ['.js', '.jsx'] },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: { chrome: '110' } }],
                                    ['@babel/preset-react', { runtime: 'automatic' }],
                                ],
                                plugins: [['istanbul', { exclude: ['src/tests/**'] }]],
                            },
                        },
                    },
                ],
            },
        },

        reporters: ['spec', 'coverage', 'kjhtml'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcov' }],
        },

        browsers: ['FirefoxHeadless'],
        singleRun: false,
        restartOnFileChange: true,
    })
}