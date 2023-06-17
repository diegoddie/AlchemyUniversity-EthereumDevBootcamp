import React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';

function Header({ connectWallet }) {
  return (
    <Flex
      w="100%"
      h="100px"
      bg="blue"
      pos="absolute"
      top="0"
      color="white"
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize={36}>ERC-20 Token Indexer</Heading>
      <Button
        fontSize={20}
        onClick={connectWallet}
        mt={36}
        bgColor="blue"
        ml={36}
        right="20"
        top="0"
        position="absolute"
      >
        Connect Wallet
      </Button>
    </Flex>
  );
}

export default Header;
