import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrentBlockInfo } from './CurrentBlockInfo';
import { TxnsOfBlock } from './TxnsOfBlock';

function BlockInfoContainer({ alchemy }) {
  const { currentBlockNumber } = useParams();

  return (
    <div>
      <CurrentBlockInfo alchemy={alchemy} blockNumber={currentBlockNumber} />
      <TxnsOfBlock alchemy={alchemy} blockNumber={currentBlockNumber} />
    </div>
  );
}

export { BlockInfoContainer };
