import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function AddressInfo(alchemy) {
	// State to store the address information
	const [addressInfo, setAddressInfo] = useState(null);

	// Get the address parameter from the URL
	const { address } = useParams();

	useEffect(() => {
		// Fetch address data when the component mounts or the address changes
		async function fetchData(address) {
			// Fetch the balance of the address from the Alchemy API
			const addressData = await alchemy.alchemy.core.getBalance(address);
			// Set the address information in the state
			setAddressInfo(addressData._hex);
		}
		fetchData(address);
	}, [alchemy.alchemy.core, address]);

	 // Display a loading message while the address information is being fetched
	if (!addressInfo) {
		return <div className="m-4 p-4 mb-8 rounded-md border-[1px] border-slate-400 text-white">Loading...</div>;
	}

	return (
		<div className="m-4 mb-8 rounded-md border-[1px] border-slate-400">
			<h2 className="py-3 text-2xl text-white text-center border-b-[1px] border-b-slate-400">Address Data 💡</h2>
			<div className="p-4 text-white">
				<p className="text-white"><b>Address</b> {address.slice(0, 6)}...{address.slice(-4)}</p>
				<p className="text-white"><b>Balance</b> {parseInt(addressInfo, 16) / 1000000000000000000} ETH</p>
			</div>
		</div>
	);
}

export { AddressInfo };