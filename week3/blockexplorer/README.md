# Ethereum Block Explorer 🚀

Welcome to the Ethereum Block Explorer! This web application allows you to explore the Ethereum blockchain, view block and transaction information, and retrieve data about addresses.

## Features

✨ **Search by Address, Transaction Hash, or Block Number**: Easily search for addresses, transaction hashes, or block numbers to retrieve relevant information.

🔍 **Address Information**: Get details about an Ethereum address, including the address itself and its balance.

🔗 **Transaction Information**: Retrieve information about a specific transaction, such as the sender, recipient, and transaction status.

🧱 **Block Information**: Explore details about a specific block, including its number, timestamp, and transaction count.

🔄 **Real-time Data**: The explorer leverages Alchemy API to fetch real-time data from the Ethereum mainnet.

## Technologies Used

- React
- Alchemy SDK
- TailwindCSS

## Getting Started
1. Clone the repository:
```git clone https://github.com/diegoddie/AlchemyUniversity-EthereumDevBootcamp/tree/master/week3/blockexplorer```

2. Inside the block-explorer directory, install the dependencies:
```npm install```

3. Set up your Alchemy API key:
   - Get your Alchemy API key from the Alchemy platform.
   - Create a `.env` file in the project root directory.
   - Add the following line to the `.env` file:
    ```REACT_APP_ALCHEMY_API_KEY=<your-api-key>```

4. Start the development server:
```npm start```