'use strict';
import { Buffer } from 'node:buffer';
const textToBuffer = (text, encoding) => {
  const res = Buffer.from(text, encoding);
  return res;
};

const bufferToText = (buffer, encoding) => {
  const res = buffer.toString(encoding);
  return res;
};

const text = 'Привет мир!';
const utf8Buffer = textToBuffer(text, 'utf8');
console.log('utf8Buffer: ', utf8Buffer);

const decodedBase64Text = bufferToText(utf8Buffer, 'Base64');
console.log('decodedBase64Text: ', decodedBase64Text);

const base64Buffer = textToBuffer(decodedBase64Text, 'Base64');
console.log('base64Buffer: ', base64Buffer);

const decodedUtf8Text = bufferToText(base64Buffer, 'utf8');
console.log('decodedUtf8Text: ', decodedUtf8Text);