const chalk = require('chalk');

module.exports = {
    client: {
        dir_not_found: function (dir) {
            let code = "C1"
            return {
                "code": code,
                "text": [
                    `\n${chalk.bgRed(chalk.black(" Debox ERROR"))} -> ${chalk.bold(`The directory ${dir} doesn't exist.`)}`,
                    `\n${chalk.bgYellow("ERR CODE")}${chalk.blue(code)}`,
                    "\n"
                ]
            }
        }
    },
    server: {
        package_not_found: function (package) {
            let code = "S1"
            return {
                "code": code,
                "text": [
                    `\n${chalk.bgRed(chalk.black(" Debox ERROR "))} -> ${chalk.bold(`The package '${package}' install doesn't exist.`)}`,
                    `\n${chalk.bgYellow("ERR CODE")}${chalk.blue(code)}`,
                    `\nDid you mean something else? Check your spelling and see if you made a mistake.`,
                    "\n"
                ]
            }
        }
    },
    syntax: {
        package_name_needed: function() {
            let code = "X1"
            return {
                "code": code,
                "text": [
                    `\n${chalk.bgRed(chalk.black(" Debox ERROR "))} -> ${chalk.bold("Must provide a package name, or URL to add.")}`,
                    `\n${chalk.bgGrey(" ERR CODE ")} ${chalk.blue(code)}`,
                    `\n${chalk.bold("Usage:")} debox add <package>`
                ]
            }
        }
    }
}