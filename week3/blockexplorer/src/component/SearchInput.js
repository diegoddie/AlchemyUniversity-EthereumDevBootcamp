import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchText = searchText.trim();

    if (isValidAddress(trimmedSearchText)) {
      navigate(`/address/${trimmedSearchText}`);
    } else if (isValidTxnHash(trimmedSearchText)) {
      navigate(`/txn/${trimmedSearchText}`);
    } else if (isValidBlockNumber(trimmedSearchText)) {
      navigate(`/block/${trimmedSearchText}`);
    } else {
      alert('Invalid input. Please enter a valid address, transaction hash, or block number.');
    }
  };

  const isValidAddress = (address) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
  };

  const isValidTxnHash = (txnHash) => {
    const txnHashRegex = /^0x([A-Fa-f0-9]{64})$/;
    return txnHashRegex.test(txnHash);
  };

  const isValidBlockNumber = (blockNumber) => {
    const blockNumberRegex = /^\d+$/;
    return blockNumberRegex.test(blockNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="m-auto w-full text-center p-4">
      <input
        type="text"
        placeholder="Search by Address / Txn Hash / Block"
        className="py-2 pr-8 pl-3 w-[calc(100%-50px)] text-white bg-slate-800 rounded-md border-2 border-transparent hover:border-slate-400 focus:outline-none focus:border-slate-400 cursor-pointer"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 ml-2 text-white bg-slate-800 rounded-md border-2 border-transparent hover:border-slate-400 focus:border-slate-400"
      >
        🔍
      </button>
    </form>
  );
}

export { SearchInput };
