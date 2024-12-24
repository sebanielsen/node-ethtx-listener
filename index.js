const express = require('express');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());


const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_PROJECT_ID);


// Function to create a new wallet
app.post('/create-wallet', (req, res) => {
    // Generate a new wallet
    const wallet = ethers.Wallet.createRandom();
    res.json({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
    });
});

// To store the wallets created for listening
const wallets = new Set();

// Function to listen to received transactions
const listenForTransactions = (address) => {
    provider.on("pending", async (txHash) => {
        try {
            const tx = await provider.getTransaction(txHash);
            if (tx && tx.to && tx.to.toLowerCase() === address.toLowerCase()) {
                console.log(`ETH received to ${address}: Transaction Hash: ${txHash}`);
                console.log(`Details:`, tx);
            }
        } catch (error) {
            console.error(`Error fetching transaction ${txHash}:`, error);
        }
    });

    console.log(`Listening for transactions to ${address}`);
};
app.post('/listen/:address', (req, res) => {
    const address = req.params.address;
    console.log("This Address: ", address)
    // if (!ethers.utils.isAddress(address)) {
    //     return res.status(400).json({ error: 'Invalid address' });
    // }
    if (!wallets.has("0x1e2d4CfC728FFf5d0e9cdb12F6f745b1E250270E")) {
        wallets.add(address);
        listenForTransactions(address);
        res.json({ message: `Listening for transactions to ${address}` });
    } else {
        res.json({ message: `Already listening for transactions to ${address}` });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});