#!/usr/bin/env node
var exec = require('child_process').exec;
/*
    @author Christoph-Thomas Abs
    commnands:
        func:
            init, deploy, ls

*/
const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const cliProgress = require('cli-progress');
const gitDownloader = require('download-git-repo');

const CURR_DIR = process.cwd();
const CLONE_PATH = '/tmp/com.minionjs.templates';

function createDirectoryContents(templatePath, projectName) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);        
        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8').replace(/\%project\%/g, projectName);
            const writePath = `${CURR_DIR}/${projectName}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        }
    });
}

program.version('0.1.0') 
program
  .command('init')
  .arguments('<func>')
  .description('Create a new function')
  .action(async function(funcName, options) {
    const progess = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic); 
    progess.start(100, 0);
    try {
        const templatePath = `${CLONE_PATH}/templates/func/typescript`;
        await new Promise((resolve, reject) => gitDownloader('github:Abrax20/minions', CLONE_PATH, {}, err => err ? reject(err) : resolve()))
        progess.update(20);
        fs.mkdirSync(`${CURR_DIR}/${funcName}`);
         progess.update(40);
        createDirectoryContents(templatePath, funcName);
        progess.update(60);
        exec(`cd ${funcName} && npm i`);
        progess.update(80);

        exec(`rm -fr ${CLONE_PATH}`);

        progess.update(100);
        progess.stop();
    } catch (err) {
        progess.stop();
        console.error(err);
    }
});
program.parse(process.argv);