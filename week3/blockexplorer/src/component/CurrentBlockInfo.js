import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

function CurrentBlockInfo(alchemy) {
	// State variable to store the block data
	const [block, setBlock] = useState(null);
	// Extract the currentBlockNumber from the URL params
	const { currentBlockNumber } = useParams();

	useEffect(() => {
		// Fetch the block data when the component mounts or when alchemy.alchemy.core or currentBlockNumber changes
		async function fetchData(blockNumber) {
			// Fetch the block with the specified blockNumber from the Alchemy API
			const currentBlock = await alchemy.alchemy.core.getBlock(parseInt(blockNumber));
			// Update the block state with the fetched block data
			setBlock(currentBlock);
		}
		fetchData(currentBlockNumber);
	}, [alchemy.alchemy.core, currentBlockNumber]);


	if (!block) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Block Info - {block.number}</h2>
			<div className="p-4">
				<div className="px-2 cursor-pointer">
					<p className="text-white"><b>Block Height</b> {block.number}</p>
					<p className="text-white"><b>Timestamp</b> {moment(block.timestamp * 1000).utc().format('DD-MMM-YYYY hh:mm:ss A [UTC]')}</p>
					<p className="text-white"><b>Mined By</b> <Link to={`/address/${block.miner}`} className='underline'>{block.miner.slice(0, 6)}...{block.miner.slice(-4)}</Link></p>
					<p className="text-white"><b>Total Transactions</b> {block.transactions.length}</p>
				</div>
			</div>
		</div>
	);
}

export { CurrentBlockInfo };