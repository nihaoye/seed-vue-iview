var path = require('path')
var fs = require('fs')
var UglifyJS = require('uglify-js')

function HandleHtml(options) {
    this.options = options
}

HandleHtml.prototype.apply = function(compiler) {
    var that = this
    var debug = this.options.debug
    compiler.plugin('done', function(compilation, callback) {
        var scriptsContent = '';
        that.options.script.forEach(function(file) {
            var filePath = file, wrapper = true;
            if(file && typeof file == 'object') {
                filePath = file.filePath;
                wrapper = file.wrapper;
            }

            var script = fs.readFileSync(filePath).toString()
            script = script.replace(/DEBUG\_FLAG/ig, debug)
            if(that.options.compress && wrapper) {
                script = UglifyJS.minify(script).code
            }
            if(wrapper) {
                var scriptContent = '<script type="application/javascript">' + script + '</script>'
            } else {
                var scriptContent = script
            }
            scriptsContent += scriptContent
        });
        that.options.templates.forEach(function(path) {
            var content = fs.readFileSync(path).toString()
            var headIndex = content.indexOf('</head>')
            var template = content.slice(0, headIndex) + scriptsContent + content.slice(headIndex)
            fs.writeFileSync(path, template)
        })
    })
};

module.exports = HandleHtml;
