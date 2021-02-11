#!/usr/bin/env node
const yargs = require("yargs")
const chalk = require('chalk')
const Errors = require('./errors')
const progress = require("progress")
const https = require('https')

let args = yargs.scriptName("debox").usage("$0 <cmd> [args]")
args.command('add [package]', 'Add a boilerplate.', (yargs) => {
    yargs.positional('package', {
        type: 'string',
        default: null,
        describe: 'The package you want to install.'
    })
}, function (argv) {
    if (argv.package == null) {
        console.log()
        for (let i in Errors.syntax.package_name_needed().text) {
            console.log(Errors.syntax.package_name_needed().text[i]);
        }
    } else {

        
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
              console.log(`\n${chalk.green("Added Template")} "${argv.package}"\n`);
              clearInterval(timer)
            }
        }, 100);
    }
}).help().argv