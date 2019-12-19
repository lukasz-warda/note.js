const chalk = require('chalk');

const chalkHandler = {
    error(msg) {
        console.log(chalk.inverse.red(msg));
    },
    success(msg) {
        console.log(chalk.inverse.green(msg));
    },
    info(msg) {
        console.log(chalk.inverse.magenta(msg));
    },
    header(msg) {
        console.log(chalk.inverse.blue(msg));
    },
    printMsg(type, msg) {
        chalkHandler[type](msg);
    }

}

module.exports = {
    printMsg: chalkHandler.printMsg
}