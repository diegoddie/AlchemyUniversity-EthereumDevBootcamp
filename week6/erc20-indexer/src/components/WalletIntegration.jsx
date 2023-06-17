import { Button, Spinner } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

function WalletIntegration({ setUserAddress }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        setIsLoading(true);

        // Request access to the user's wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create a new Web3Provider with the injected provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer from the provider, which is used to sign transactions
        const signer = provider.getSigner();

        // Use the signer to interact with the blockchain
        const address = await signer.getAddress();

        setUserAddress(address);
        setIsConnected(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      console.log("No web3 provider detected");
    }
  }

  return (
    <Button onClick={connectWallet} disabled={isLoading || isConnected}>
      {isLoading ? <Spinner size="sm" color="white" /> : isConnected ? "Connected" : "Connect Wallet"}
    </Button>
  );
}

export default WalletIntegration;
