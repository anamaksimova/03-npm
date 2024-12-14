'use strict';
import { readdir } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

const txtCombiner = async (catalogPath, combinedFileName) => {
  const wStream = createWriteStream(`./${combinedFileName}.txt`);

  try {
    readdir(catalogPath).then(files => {
      files.forEach(file => {
        if (file.substring(file.lastIndexOf('.')) === '.txt') {
          const rStream = createReadStream(`${catalogPath}/${file}`);

          rStream.on('data', chunk => {
            wStream.write(`[${file}]\n`);
            wStream.write(chunk + '\n');
          });
          return;
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
txtCombiner('./files', 'bigFile');