// This line imports the Axios library, which is used for making HTTP requests.
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// Define an async main function to run the program
async function main() {
  // Check if the name parameter has been provided
  if (process.argv.length < 3) {
    console.error('Usage: node index.js [name]');
    process.exit(1);
  }
   // Get the name from command line arguments and trim it
  const name = process.argv[2].trim();

   // Create a Merkle tree from the nice list
  const merkleTree = new MerkleTree(niceList);

   // Get the index of the given name in the list
  const index = niceList.findIndex(n => n === name);

   // Get the root hash of the Merkle tree
  const root = merkleTree.getRoot();

  // Get the proof for the given name
  const proof = merkleTree.getProof(index)

  // Make a POST request to the server with the name, proof, and root
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
    root,
  });

  console.log({ gift });
}

main();

