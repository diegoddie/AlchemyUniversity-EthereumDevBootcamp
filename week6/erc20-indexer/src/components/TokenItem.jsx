import React from 'react';
import { Flex, Box, Center, Image } from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';

function TokenItem({ tokenBalance, tokenData }) {
  return (
    <Flex key={tokenBalance.id} flexDir="column" color="white" bg="blue" w="20vw">
      <Box>
        <b>Symbol:</b> {tokenData.symbol}&nbsp;
      </Box>
      <Box>
        <b>Balance:</b>&nbsp;
        {parseFloat(Utils.formatUnits(tokenBalance.tokenBalance, tokenData.decimals)).toFixed(2)}
      </Box>
      <Center>
        <Image borderRadius="full" boxSize="50px" src={tokenData.logo} />
      </Center>
    </Flex>
  );
}

export default TokenItem;
