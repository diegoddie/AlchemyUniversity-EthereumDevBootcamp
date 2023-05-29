import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function CurrentBlock(alchemy) {
	// State variable to store the current block data
	const [block, setBlock] = useState(null);

	useEffect(() => {
		// Fetch the current block data when the component mounts or when alchemy.alchemy.core changes
		async function fetchData() {
			// Fetch the current block from the Alchemy API
			const currentBlock = await alchemy.alchemy.core.getBlock();
			// Update the block state with the fetched current block data
			setBlock(currentBlock);
		}
		fetchData();
	}, [alchemy.alchemy.core]);

	if (!block) {
		// Render a loading message if the block data is not available yet
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}
	
	// Render the latest block information
	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Latest Block 🆕</h2>
			<div className="p-4">
				<Link to={`/block/${block.number}`} className="px-2 cursor-pointer">
					<p className="text-white"><b>Block Number</b> {block.number}</p>
					<p className="text-white"><b>Mined By</b> {block.miner.slice(0, 6)}...{block.miner.slice(-4)}</p>
					<p className="text-white"><b>Total Transactions</b> {block.transactions.length}</p>
				</Link>
			</div>
		</div>
	);
}

export { CurrentBlock };