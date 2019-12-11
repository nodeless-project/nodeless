#!/usr/bin/env node

/*
    @author Christoph-Thomas Abs
    commnands:
        func:
            init, deploy, ls

*/
var co = require('co');
var prompt = require('co-prompt');
const program = require('commander');

if(!process.args) process.argv.push('-h');

program.version('0.1.0') 
program
  .command('init')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    const mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });
 

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });
 
program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });
 
program
    .command('') // <- not currently supported
    .action(function () { console.log('default'); });
program.parse(process.argv);


 
/*
program
.arguments('<file>')
.action(function(file) {
    co(function *() {
        var username = yield prompt('username: ');
        var password = yield prompt.password('password: ');
    });
})
.parse(process.argv)
*/