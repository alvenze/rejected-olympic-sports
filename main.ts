// Entry program for the make.fun bounty "Rejected Olympic Sports"
// (u-motasimfuad-rejected-olympic-sports-9d83e7da), program/v1 on Node 22.
//
// The entry is one line of text: a made-up Olympic event a commentator
// would have to read with a straight face. Beat one is a broadcast-real
// race, the 100-metre toddler chase, whose absurdity is built into the
// sport itself: the parents are sprinting after a naked toddler who has
// taken the car keys. Beat two is the reversal that closes the line: the
// toddler is not the obstacle in the race, the toddler is its defending
// champion, unbeaten across four Olympics. The program writes that line,
// and nothing else, to /output/entry.txt.
//
// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. This program checks its own line
// against that gate before writing it, and writes no trailing newline,
// so the file the scorer reads is exactly the line.
//
// Local run, standing in for the grader's /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  '100-Metre Toddler Chase: parents sprint after a naked toddler who has taken the car keys; four Olympics in, the toddler remains the defending champion.';

const MAX_CHARS = 200;

function gateOk(text: string): boolean {
  if (!text || !text.trim()) return false;
  if ([...text].length > MAX_CHARS) return false;
  if (text.includes('\n') || text.includes('\r')) return false;
  return true;
}

function outputDir(): string {
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override) return override;
  return '/output';
}

if (!gateOk(LINE)) {
  console.error('entry line fails the gate; refusing to write');
  process.exit(1);
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
const path = join(dir, 'entry.txt');
writeFileSync(path, LINE, 'utf8');
console.log(`wrote ${[...LINE].length} chars to ${path}`);
