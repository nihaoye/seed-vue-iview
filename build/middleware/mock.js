const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const lodash = require('lodash')

const log = console.log
const pathDir = path.resolve(__dirname, '../../mock')
const mapPath = path.resolve(pathDir, 'map.json')
let mapJSON = getMap()
log(`${chalk.bold('本地mock列表：')}`)
lodash.map(mapJSON, (to, from) => {
    log(`   ${chalk.white(from)} => ${chalk.green(JSON.stringify(to))}`)
})
log('\n')

fs.watchFile(mapPath, () => {
    log(chalk.blue(`map配置文件更新`))
    mapJSON = getMap()
    lodash.map(mapJSON, (to, from) => {
        log(`   ${chalk.white(from)} => ${chalk.green(JSON.stringify(to))}`)
    })
    log('\n')
})
module.exports = (req, res, next) => {
    if (mapJSON[req.path]) {
        const config = mapJSON[req.path]
        log(chalk.bold(`命中mock:${req.path}`))
        log(chalk.green(`   配置:${JSON.stringify(config)}`))
        const type = typeof config
        if (type === 'string') {
            return res.json(getJSON(config))
        } else {
            // read dir
            const fileDir = path.resolve(pathDir, config.dir, config.file + '.json')
            const exist = fs.existsSync(fileDir)
            if (exist) {
                return res.json(getJSON(config.dir + '/' + config.file + '.json'))
            } else {
                return res.json({})
            }
        }
    } else {
        return next()
    }
}

function getMap () {
    const exist = fs.existsSync(mapPath)
    if (exist) {
        let mapJSON = fs.readFileSync(mapPath, 'utf-8')
        try {
            mapJSON = JSON.parse(mapJSON)
        } catch (e) {
            log(chalk.red('解析map出错'))
            mapJSON = {}
        }
        return mapJSON
    }
    return {}
}

function getJSON (name) {
    const exist = fs.existsSync(path.resolve(pathDir, name))
    if (exist) {
        let file = fs.readFileSync(path.resolve(pathDir, name), 'utf-8')
        try {
            file = JSON.parse(file)
        } catch (e) {
            file = {}
        }
        return file
    } else {
        return {}
    }
}
