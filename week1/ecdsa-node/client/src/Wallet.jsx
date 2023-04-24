import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, digitalSignature, setDigitalSignature }) {
  // onChangeAddress event handler to update the address state and balance
  async function onChangeAddress(evt) {
    const address = evt.target.value; // get the address value from the input
    setAddress(address); // update the address state with the new value
    if (address && digitalSignature) { // if both address and digitalSignature are available
      const {
        data: { balance }, // send a GET request to the server to get the balance of the account associated with the address and digitalSignature
      } = await server.get(`balance/${address}?signature=${digitalSignature}`);
      setBalance(balance); // update the balance state with the response from the server
    } else {
      setBalance(0);
    }
  }

  // onChangeDS event handler to update the digitalSignature state and balance
  async function onChangeDS(evt) {
    const digitalSignature = evt.target.value; // get the digitalSignature value from the input
    setDigitalSignature(digitalSignature); // update the digitalSignature state with the new value
    if (address && digitalSignature) { // if both address and digitalSignature are available
      const {
        data: { balance }, // send a GET request to the server to get the balance of the account associated with the address and digitalSignature
      } = await server.get(`balance/${address}?signature=${digitalSignature}`);
      setBalance(balance); // update the balance state with the response from the server
    } else {
      setBalance(0);
    }
  }

  // render the Wallet component
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChangeAddress}></input>
      </label>
      <label>
        Digital Signature
        <input placeholder="Use the script for signing a message then place the signature here" value={digitalSignature} onChange={onChangeDS}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;