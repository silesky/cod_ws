#!/usr/bin/env node

import * as crypto from 'crypto';
import { Key } from 'readline';

const getRandomBytes = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(10000, (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
};

process.stdin.on('keypress', (_, key: Key) => {
  key.ctrl && key.name === 'c' && process.exit(0);
});

const run = async () => {
  const bytes = await getRandomBytes();
  console.log(bytes);
};

const main: VoidFunction = () => {
  run();
  setInterval(run, 1000)
}

main();
