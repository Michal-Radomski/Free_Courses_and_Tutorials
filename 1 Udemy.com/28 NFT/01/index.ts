import * as CryptoJS from "crypto-js";
// console.log("CryptoJS:", CryptoJS);

class Block {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;

  constructor(index: number, timestamp: string, data: any, previousHash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash(): string {
    return CryptoJS.SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, new Date().toISOString(), "Genesis Block", "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.generateHash();
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.generateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

const myBlockchain: Blockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, new Date().toISOString(), { amount: 100 }));
myBlockchain.addBlock(new Block(2, new Date().toISOString(), { amount: 50 }));
// console.log("myBlockchain:", myBlockchain);

console.log("JSON.stringify(myBlockchain, null, 2):", JSON.stringify(myBlockchain, null, 2));
