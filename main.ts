// VELMARA — The Poster for a Place That Isn't There
// Writes the travel poster for the fictional island of Velmara
// (where the sea climbs the sky) to /output/entry.png.
//
// The poster image is bundled with this program as entry.png (a JPEG
// payload, 1024x1024, 241,474 bytes). This program copies it to the
// output path, checks it against the competition gate (whole JPEG,
// 1024x1024, at most 1,048,576 bytes), and verifies the copy is
// byte-identical, so two runs produce byte-identical output.

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outputDir = "/output";
const output = join(outputDir, "entry.png");

const MAX_BYTES = 1_048_576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

// Read width/height from a JPEG's Start Of Frame segment (no deps).
function jpegDimensions(buf: Buffer): { width: number; height: number } {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error("entry.png is not a JPEG (missing SOI marker)");
  }
  let offset = 2;
  while (offset < buf.length - 1) {
    if (buf[offset] !== 0xff) {
      throw new Error("entry.png is not a valid JPEG");
    }
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    // SOF0 (0xc0), SOF1 (0xc1), SOF2 (0xc2) carry width/height.
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error("entry.png has no JPEG Start Of Frame segment");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, output);

const sourceHash = sha256(source);
const outputHash = sha256(output);
if (sourceHash !== outputHash) {
  throw new Error(
    `entry.png copy mismatch: source ${sourceHash} != output ${outputHash}`,
  );
}

const bytes = statSync(output).size;
if (bytes > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes} bytes, over the ${MAX_BYTES} limit`);
}
const { width, height } = jpegDimensions(readFileSync(output));
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
  );
}

console.log(
  `Wrote ${output} (${width}x${height}, ${bytes} bytes, sha256 ${outputHash})`,
);
