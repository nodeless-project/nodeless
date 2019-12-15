import fs from 'fs';
import { CURRENT_DIR } from './constants';

export function createDirectoryContents(templatePath, projectName) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8').replace(/\%project\%/g, projectName);
      const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${projectName}/${file}`);
      createDirectoryContents(`${templatePath}/${file}`, `${projectName}/${file}`);
    }
  });
}
