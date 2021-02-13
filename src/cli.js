#!/usr/bin/env node
const yargs = require("yargs")
const fs = require('fs')
const chalk = require('chalk')
const Errors = require('./errors')
const progress = require("progress")
const axios = require('axios')
const generate = require('./generator')

let args = yargs.scriptName("debox").usage("$0 <cmd> [args]")

// ADD BOILERPLATE TO PROJECT
args.command('add [package] [path]', 'Add a boilerplate.', (yargs) => {
    yargs.positional('path', {
        type: "string",
        default: "debox-template/",
        describe: 'The path you want to add your template to.'
    })
    yargs.positional('package', {
        type: 'string',
        default: null,
        describe: 'The package you want to install.'
    })
}, function (argv) {

    if (argv.package == null) {
        console.log()
        if (argv.package == null) {
            for (let i in Errors.syntax.package_name_needed().text) {
                console.log(Errors.syntax.package_name_needed().text[i]);
            }
        }
        
    } else {

        // GET TEMPLATE
        axios.get("https://cdn.jsdelivr.net/gh/sameeramurthy/debox-templates@latest/templates/" + argv.package + ".json").then(response => {

            // PROGRESS BAR
            console.log();
            let str_conf = `${chalk.bgBlue(" Debox ")} Adding Package ${argv.package} [:bar] :rate/bps :percent :etas`
            let bar = new progress(str_conf, {
                complete: chalk.green('#'),
                incomplete: chalk.grey('·'),
                width: 40,
                total: 5
            });

            let timer = setInterval(function () {
                bar.tick();
                if (bar.complete) {
                    clearInterval(timer)
                    console.log(`\n${chalk.green("Added Template")} "${argv.package}"\n`);
                }
            }, 100);
            if (!fs.existsSync(argv.path)) {
                fs.mkdirSync(argv.path)
            }
            generate(argv.path, JSON.stringify(response.data))
            
        }).catch(err => {
            if (err) {
                if (err.response.status === 404) {
                    for (let i in Errors.server.package_not_found(argv.package).text) {
                        console.log(Errors.server.package_not_found(argv.package).text[i]);
                    }
                }
            }
        })

    }

}).help().argv