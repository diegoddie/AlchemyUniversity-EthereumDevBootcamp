import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function LatestBlocks(alchemy) {
	// State to store the blocks information
	const [blocks, setBlocks] = useState(null);

	useEffect(() => {
		// Function to fetch the latest blocks data
		async function fetchData() {
			// Local array to store the blocks
			const localBlocks = [];
			// Get the current block number from the Alchemy API
			const currentBlockNumber = await alchemy.alchemy.core.getBlockNumber();
			// Fetch information for the last 5 blocks
			for (let i = 1; i < 6; i++) {
				// Calculate the block number to fetch
				const blockNumber = currentBlockNumber - i;

				console.log(blockNumber, typeof blockNumber);
				// Fetch the block information from the Alchemy API
				const block = await alchemy.alchemy.core.getBlock(blockNumber);
				 // Push the block data to the localBlocks array
				localBlocks.push(block);
			}
			// Set the blocks state with the fetched data
			setBlocks(localBlocks);
		}
		// Call the fetchData function when the component mounts
		fetchData();
	}, [alchemy.alchemy.core]);

	if (!blocks) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Previous Blocks 📦</h2>
			<div className="p-4">
				{blocks.map((block, index) => (
					<Link to={`/block/${block.number}`}>
						<div key={block.number} className={`px-2 py-4 cursor-pointer ${index === blocks.length - 1 ? "pb-0" : "border-b-2 border-b-slate-400"}`}>
							<p className="text-white"><b>Block Number </b> {block.number}</p>
							<p className="text-white"><b>Mined By </b> {block.miner.slice(0, 6)}...{block.miner.slice(-4)}</p>
							<p className="text-white"><b>Total Transactions</b> {block.transactions.length}</p>
						</div>
					</Link>
				))}
			</div>
			{/* <div className="w-full mt-4 border-t-[1px] border-t-slate-400">
                <button className="w-full p-3 text-white hover:bg-slate-800 focus:bg-slate-800">
                    View All Blocks
                </button>
            </div> */}
		</div>
	);
}

export { LatestBlocks };