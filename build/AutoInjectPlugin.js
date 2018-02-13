const fs = require('fs')
const UglifyJS = require('uglify-js')

function AutoInject (options) {
    this.options = options
    const {script, compress = true} = options
    this.content = script.reduce((content, filePath) => {
        let script = fs.readFileSync(filePath).toString()
        if (compress) {
            script = UglifyJS.minify(script).code
        }
        content += `<script type="application/javascript">${script}</script>`
        return content
    }, '')
}

AutoInject.prototype.apply = function (compiler) {
    const {content} = this
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            htmlPluginData.html = htmlPluginData.html.replace(/<\/head>/, `${content}</head>`)
            callback(null, htmlPluginData)
        })
    })
}

module.exports = AutoInject
