'use strict';
const fs = require('node:fs');

// 1task

const app = (sourceDir, targetDir) => {
  fs.mkdir(targetDir, { recursive: true }, err => {
    if (err) throw err;
    console.log('Папка создана');
  });

  fs.readdir(sourceDir, (err, files) => {
    console.log('Files: ', files);
    files.forEach(file => {
      fs.stat(`${sourceDir}/${file}`, (error, stats) => {
        if (error) {
          console.log('error: ', error);
        } else if (stats.isFile()) {
          fs.copyFile(`${sourceDir}/${file}`, `${targetDir}/${file}`, err => {
            console.log(`${file} copied`);
            if (err) throw err;
          });
        } else if (stats.isDirectory()) {
          app(`${sourceDir}/${file}`, `${targetDir}/${file}`);
        }
      });

      if (err) throw err;
    });
  });
};

module.exports = { app };
