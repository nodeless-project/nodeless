#!/usr/bin/env node

/*
    @title @nodeless/cli
    @author Christoph-Thomas Abs, Paul Spende
    @github https://github.com/Abrax20/nodeless
*/

import program from 'commander';

import { init, deploy, ls, rm, call } from './src/commands';

program.version('0.1.0');

program
  .command('init')
  .arguments('<func>')
  .description('Create a new function')
  .action(init);

program
  .command('ls')
  .description('Lists all functions in the database')
  .action(ls);

program
  .command('deploy')
  .description('Deploys the function in the current folder')
  .action(deploy);

program
  .command('call')
  .arguments('<name> [params]')
  .description('Calls the function with the given name and optionally with the given params')
  .action(call);

program
  .command('rm')
  .arguments('<name>')
  .description('Removes the function with the given name')
  .action(rm);

program.parse(process.argv);
