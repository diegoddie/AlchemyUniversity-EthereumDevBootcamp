import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, digitalSignature }) {
  // Declare and initialize state variables
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // Function to update state variable on change of input field value
  const setValue = (setter) => (evt) => setter(evt.target.value);

  // Function to handle the form submission
  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        digitalSignature,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance); // Update balance state variable with the response from server
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;