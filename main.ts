import * as event from './event';

// Put your code here

class Point {
  x: number;
  y: number;
  z: number;
  constructor(coordinates: LuaMultiReturn<[number, number, number]>) {
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.z = coordinates[2];
  }

  static sub(p1: Point, p2: Point) {
    return {
      x: p1.x - p2.x,
      y: p1.y - p2.y,
      z: p1.z - p2.z,
    };
  }

  static distance(p1: Point, p2: Point) {
    let res = 0;
    for (const num of Object.values(Point.sub(p1, p2))) {
      res += math.pow(math.abs(num), 2);
    }
    return math.sqrt(res);
  }
}

const locate = (x: number, y: number, z: number) => {
  return $multi(x, y, z);
};

const CENTRE_POINT = new Point(locate(32, 32, 32));
const OUTER_RADIUS = 30;
const INNER_RADIUS = 27;
const CHUNK_SIZE = 10;
const MAX_X = 64;
const MAX_Y = 64;
const MAX_Z = 64;

const NUM_CHUNKS_X = math.ceil(MAX_X / CHUNK_SIZE);
const NUM_CHUNKS_Y = math.ceil(MAX_Y / CHUNK_SIZE);
const NUM_CHUNKS_Z = math.ceil(MAX_Z / CHUNK_SIZE);

class Chunk {
  private static readonly CHUNK_SIZE = CHUNK_SIZE;
  chunkX: number;
  chunkY: number;
  chunkZ: number;
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  id: number;
  constructor(x: number, y: number, z: number) {
    (this.chunkX = x), (this.chunkY = y), (this.chunkZ = z);
    this.minX = this.chunkX * Chunk.CHUNK_SIZE;
    this.minY = this.chunkY * Chunk.CHUNK_SIZE;
    this.minZ = this.chunkZ * Chunk.CHUNK_SIZE;
    this.maxX = math.min(this.minX + Chunk.CHUNK_SIZE, MAX_X);
    this.maxY = math.min(this.minY + Chunk.CHUNK_SIZE, MAX_Y);
    this.maxZ = math.min(this.minZ + Chunk.CHUNK_SIZE, MAX_Z);
    this.id =
      this.chunkX +
      this.chunkY * NUM_CHUNKS_X +
      this.chunkZ * NUM_CHUNKS_X * NUM_CHUNKS_Y;
  }

  public print() {
    print('Chunk {');
    for (const [key, value] of Object.entries(this)) {
      print(`\t${key}: ${value},`);
    }
    print('}');
  }
}

for (let z = 0; z <= NUM_CHUNKS_Z; z++) {
  for (let y = 0; y <= NUM_CHUNKS_Y; y++) {
    for (let x = 0; x <= NUM_CHUNKS_X; x++) {
      const chunk = new Chunk(x, y, z);
      chunk.print();
    }
  }
}
