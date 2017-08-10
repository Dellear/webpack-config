var isProduction = process.env.NODE_ENV === 'production' ? true : false;

exports.postCss = {
    loader: 'postcss-loader',
    options: {
        sourceMap: !isProduction,
        plugins: (loader) => [
            require('postcss-import')({root: loader.resourcePath}),
            require('postcss-cssnext')({warnForDuplicates: false}),
            isProduction ? require('cssnano')() : null
        ].filter(item => item)
    }
}

exports.css = {
    loader: 'css-loader',
    options: {
        sourceMap: !isProduction,
        // modules: true
    }
}

exports.less = {
    loader: 'less-loader',
    options: {
        sourceMap: !isProduction
    }
}