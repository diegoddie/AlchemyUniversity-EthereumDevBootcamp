// Import the necessary libraries
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

// Asynchronous function to get the signature information using a private key
async function getSignatureInfo(privateKey) {
    // Create a message to sign
    const message = "Hey, it's me."
    // Call the signMessage function to sign the message using the private key
    const [signature, recoveryBit] = await signMessage(message, privateKey);

    console.log("signature:", signature.toString());
}

// Asynchronous function to sign a message using a private key
async function signMessage(msg, privateKey) {
    return secp.sign(hashMessage(msg), privateKey, { recovered: true });
}

function hashMessage(msg) {
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes);
}

module.exports = { getSignatureInfo, hashMessage };