// Importing the necessary components from other files
import Wallet from "./Wallet";
import Transfer from "./Transfer";

// Importing the App.scss file to add custom styles
import "./App.scss";
import { useState } from "react";

function App() {
  // Creating state variables with the useState hook. The useState hook is used to create three state variables: balance, address, and digitalSignature. These state variables can be updated with the setBalance, setAddress, and setDigitalSignature functions respectively.
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");

  // Rendering the Wallet and Transfer components with the state variables passed as props
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        digitalSignature={digitalSignature}
        setDigitalSignature={setDigitalSignature}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} digitalSignature={digitalSignature} />
    </div>
  );
}

export default App;