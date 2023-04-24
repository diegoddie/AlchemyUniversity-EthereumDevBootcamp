// Import necessary modules
const { hashMessage } = require("./scripts/sign");
const secp = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");

// Define the port to listen on
const port = 3042;

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define initial balances for some addresses
const balances = {
  "0xdac10aa1f4e19df723e0": 100,
  "0x59a6ba235444b5b9b091": 50,
  "0xffb937faa4afccee233f": 75,
};

// Define the public keys for each address
const publicKeys = {
  "0xdac10aa1f4e19df723e0": "04163b6d07306e216a3d53b74524e1f423f50362562bfc72176ec8a96d296bb7db195dd98e4ef789e789839d614497fe9e52503624903cdac10aa1f4e19df723e0",
  "0x59a6ba235444b5b9b091": "047ac6a0ab0d74117a1a3ac725525e94e0f6e760d9cf9120eb0a59af7ad996966174d8839fecacdbbe0897151e802f3ae1a66b21b6e10559a6ba235444b5b9b091",
  "0xffb937faa4afccee233f": "04c56b0748ad6374a7153cc805c2e542d7ce10de73f9631bb1651f3a4d9e0294fb076d3586a359738076de42596e11144f32c2685362dcffb937faa4afccee233f",
};

// Define a route for retrieving the balance of an address
app.get("/balance/:address", (req, res) => {
  // The curly braces around address and signature are using destructuring syntax to extract specific properties from the req.params and req.query objects.
  const { address } = req.params;
  const { signature } = req.query;

  // Check if the address is the owner of the balance by verifying their digital signature
  let balance = isOwner(address, signature) ? balances[address] : 0;

  // Send the balance as a JSON response
  res.send({ balance });
});


// Define a route for transferring funds between addresses
app.post("/send", (req, res) => {
  const { sender, recipient, amount, digitalSignature } = req.body;

  // Set the initial balance of each address to 0 if they don't have an existing balance
  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Check if the sender is the owner of the funds by verifying their digital signature
  if (!isOwner(sender, digitalSignature)) {
    res.status(400).send({ message: "Your not the owner of the funds!" });
    return;
  }

  // Check if the sender has enough funds to transfer
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    // Subtract the transferred amount from the sender's balance and add it to the recipient's balance
    balances[sender] -= amount;
    balances[recipient] += amount;
    setInitialBalance(sender);
    setInitialBalance(recipient);
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function isOwner(address, digitalSignature) {
  const publicKey = publicKeys[address];
  const message = "Hey, it's me."
  const hash = hashMessage(message);
  // recreate the uint8array from string
  let digitalSignatureArray = digitalSignature.split(',').map(x => Number(x));
  let uint8Array = new Uint8Array(digitalSignatureArray.length);

  digitalSignatureArray.forEach((x, i) => uint8Array[i] = x);
  return secp.verify(uint8Array, hash, publicKey);
}

