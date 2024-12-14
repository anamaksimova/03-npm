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

// const txtCombiner = async (catalogPath, combinedFileName) => {
//     try {
//         await pipeline (
//             fileInfo(catalogPath),
//             createWriteStream(`./${combinedFileName}.txt`),

//         );
//           console.log('ready');
//     } catch (error) {
//         console.log(error);
//     }

// };

// txtCombiner('./files', 'bigFile');

// const fileInfo = async (catalogPath, combinedFileName) => {
//     const wStream = createWriteStream(`./${combinedFileName}.txt`);

//     try {
//       readdir(catalogPath).then(files => {
//         files.forEach(async file => {
//           if (file.substring(file.lastIndexOf('.')) === '.txt') {
//             console.log(file);

//             const rStream = createReadStream(`${catalogPath}/${file}`);
//             rStream.push('\nok');
//             rStream.on('data', () => {
//               wStream.write(`\n[${file}]\n`);
//             });
//             rStream.pipe(wStream);

//             console.log('ready');
//             return;
//           }

//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
