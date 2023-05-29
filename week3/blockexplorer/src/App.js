import { Alchemy, Network } from 'alchemy-sdk';
import { Route, Routes, Link } from 'react-router-dom';
import { SearchInput } from './component/SearchInput';
import { BlockInfoContainer } from './component/BlockInfoContainer';
import { TxnInfo } from './component/TxnInfo';
import { AddressInfo } from './component/AddressInfo';
import './App.css';
import Home from './component/Home';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  return (
    <div className='bg-slate-950 min-h-screen'>
      <div className="max-w-[425px] m-auto">
        <nav className='text-white text-2xl font-bold text-center py-4'><Link to="/">Ethereum Blockchain Explorer</Link></nav>
        <SearchInput></SearchInput>
        <Routes>
          <Route path="/" element={<Home alchemy={alchemy} />} />
          <Route path="/block/:currentBlockNumber" element={<BlockInfoContainer alchemy={alchemy} />} />
          <Route path="/txn/:txnHash" element={<TxnInfo alchemy={alchemy} />} />
          <Route path="/address/:address" element={<AddressInfo alchemy={alchemy} />} />
        </Routes>

        <footer className='text-center p-4'>
          <p className='text-white mb-1'>Made with 💓 by <a className='text-white underline' href="https://github.com/diegoddie">Diego Lauricella</a></p>
          <p><a className='text-white underline' href="https://university.alchemy.com/">Alchemy University - Ethereum Dev. Bootcamp</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
