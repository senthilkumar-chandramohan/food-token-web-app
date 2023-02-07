import dotenv from "dotenv";
import { getWeb3Instance, constants } from "../utils/index.js";

dotenv.config();

const sendToken = async (sender, receiver, amount, note) => {
    const web3 = getWeb3Instance();

    const contract = new web3.eth.Contract(
        constants.CONTRACT_ABI,
        constants.CONTRACT_ADDRESS,
    );

    const txn = contract.methods.transferFrom(sender, receiver, amount);
    // TODO: update contract to accept sender const txn = contract.methods.sendCoin(sender, receiver, amount);
    const gas = await txn.estimateGas({ from: constants.SYSTEM_WALLET });
    const gasPrice = await web3.eth.getGasPrice();
    const data = txn.encodeABI();
    const nonce = await web3.eth.getTransactionCount(constants.SYSTEM_WALLET);

    console.log('\n gas:', gas);
    console.log('\n gasPrice:', gasPrice);
    console.log('\n nonce:', nonce);

    const signedTxn = await web3.eth.accounts.signTransaction({
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 5,
    }, constants.PRIVATE_KEY);

    const receipt = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
    return receipt;
};

const getBalance = async (address) => {
    const web3 = getWeb3Instance();

    const contract = new web3.eth.Contract(
        constants.CONTRACT_ABI,
        constants.CONTRACT_ADDRESS,
    );

    const balance = await contract.methods.balanceOf(address).call();
    return balance;
};

export {
    sendToken,
    getBalance,
};
