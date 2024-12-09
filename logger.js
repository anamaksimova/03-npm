'use strict';
const fs = require('node:fs');
const EventEmitter = require('node:events');

class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = `./${filename}`;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }
  log(message) {
    if (!this.writing) {
      this.logQueue.unshift(message);
      this.writeLog();
    } else {
      this.logQueue.push(message);
    }
  }
  writeLog() {
    this.writing = true;
    const fileCheck = fs.existsSync(this.filename);

    if (fileCheck) {
      fs.readFile(this.filename, 'utf8', (err, res) => {
        fs.writeFile(this.filename, `${this.logQueue[0]}\r\n`, err => {
          fs.appendFile(this.filename, res, err => {
            this.emit('messageLogged', this.logQueue[0]);

            this.logQueue.shift();
            this.checkFileSize();
            if (this.logQueue.length == 0) {
              console.log('logQueue is empty');
              this.writing = false;
            } else {
              console.log('logQueue is  not empty');
              this.writeLog();
            }

            if (err) throw err;
          });

          if (err) throw err;
        });

        if (err) throw err;
      });
    } else {
      fs.writeFile(this.filename, `${this.logQueue[0]}\r\n`, err => {
        this.emit('messageLogged', this.logQueue[0]);

        this.logQueue.shift();
        this.checkFileSize();
        if (this.logQueue.length == 0) {
          console.log('logQueue is empty');
          this.writing = false;
        } else {
          console.log('logQueue is  not empty');
          this.writeLog();
        }

        if (err) throw err;
      });
    }
  }

  getFileSize() {
    const size = fs.statSync(this.filename).size;
    return size;
  }

  checkFileSize() {
    const fileSize = this.getFileSize();

    if (this.getFileSize() > this.maxSize) {
      console.log('Размер файла больше допустимого', this.getFileSize());
      this.rotateLog();
    } else {
      console.log('Размер файла меньше допустимого', this.getFileSize());
    }
  }

  rotateLog() {
    const baseFileName = this.filename.substring(0, this.filename.lastIndexOf('.'));
    const fileCheck = fs.existsSync(`${baseFileName}.bak`);
    if (fileCheck) {
      fs.readFile(this.filename, 'utf8', (err, res) => {
        fs.appendFile(`${baseFileName}.bak`, '----------' + res + '----------', err => {
          fs.truncate(this.filename, 0, err => {
            if (err) throw err;
          });
          if (err) throw err;
        });
        if (err) throw err;
      });
    } else {
      fs.copyFile(this.filename, `${baseFileName}.bak`, err => {
        fs.truncate(this.filename, 0, err => {
          if (err) throw err;
        });
        if (err) throw err;
      });
    }
  }
}

const logger = new Logger('log.txt', 1024);
logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');

logger.log('Второе сообщение');
