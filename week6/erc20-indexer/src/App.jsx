import React, { useState } from 'react';
import { Box, Center, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';
import Header from './components/Header';
import TokenItem from './components/TokenItem';
import AddressInput from './components/AddressInput';
import WalletIntegration from './components/WalletIntegration';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function connect() {
    if (window.ethereum) {
      try {
        // Request access to the user's wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new Web3Provider with the injected provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer from the provider, which is used to sign transactions
        const signer = provider.getSigner();

        // Use the signer to interact with the blockchain
        const address = await signer.getAddress();

        setUserAddress(address);
        console.log('userAddress:', address);
      } catch (error) {
        console.log('Failed to connect wallet:', error);
      }
    } else {
      console.log('No web3 provider detected');
    }
  }

  async function getTokenBalance() {
    try {
      const config = {
        apiKey: import.meta.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };

      const alchemy = new Alchemy(config);
      const provider = alchemy.config.getProvider();
      const data = await alchemy.core.getTokenBalances(userAddress);

      setResults(data);
      setIsLoading(true);

      const tokenDataPromises = data.tokenBalances.map(async (tokenBalance) => {
        const tokenData = await alchemy.core.getTokenMetadata(tokenBalance.contractAddress);
        return tokenData;
      });

      const tokenDataObjects = await Promise.all(tokenDataPromises);
      setTokenDataObjects(tokenDataObjects);
      setHasQueried(true);
      setIsLoading(false);
    } catch (error) {
      console.log('Failed to get token balance:', error);
      setIsLoading(false);
    }
  }

  const handleAddressChange = (address) => {
    setUserAddress(address);
  };

  return (
    <Box w="100vw">
      <Header connectWallet={connect} />

      <Center>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20 token balances!
          </Text>
        </Flex>
      </Center>

      <Flex w="100%" flexDirection="column" alignItems="center" justifyContent="center">
        <Heading mt={42}>Get all the ERC-20 token balances of this address:</Heading>

        <AddressInput setAddress={handleAddressChange} />

        {userAddress && <Text>{userAddress}</Text>}

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>Please make a query!</Text>
        )}

        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried && (
          <Flex w="90vw" justifyContent="center">
            {results.tokenBalances.map((tokenBalance, index) => {
              const tokenData = tokenDataObjects[index];

              return (
                <TokenItem
                  key={tokenBalance.id}
                  tokenBalance={tokenBalance}
                  tokenData={tokenData}
                />
              );
            })}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default App;
