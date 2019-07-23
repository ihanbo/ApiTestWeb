const argv = require('yargs').argv
const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')
const testEnv = require('./test.env')
let SET_ENV = ""
if(process.env.NODE_ENV === "development"){     //开发模式
    SET_ENV = {...devEnv}
}
if(process.env.NODE_ENV === "production"){     //生产模式
    SET_ENV = {...testEnv}
    if(argv.test){
        SET_ENV = {...testEnv}
    }
    if(argv.prod){
        SET_ENV = {...prodEnv}
    }
}
module.exports = SET_ENV
