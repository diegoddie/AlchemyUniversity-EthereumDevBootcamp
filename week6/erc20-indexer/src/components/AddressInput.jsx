import React, { useState } from 'react';
import { Input, Button, Flex } from '@chakra-ui/react';

function AddressInput({ setAddress }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setAddress(inputValue);
  };

  return (
    <Flex>
      <Input
        placeholder="Enter an address"
        value={inputValue}
        onChange={handleInputChange}
        mr={2}
      />
      <Button onClick={handleButtonClick}>Search</Button>
    </Flex>
  );
}

export default AddressInput;
