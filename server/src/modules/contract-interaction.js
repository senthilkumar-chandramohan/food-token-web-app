import dotenv from "dotenv";
import { getWeb3Instance, getBigNumber, constants } from "../utils/index.js";

dotenv.config();

const sendToken = async (sender, receiver, amount, note) => {
    const web3 = getWeb3Instance();

    const contract = new web3.eth.Contract(
        constants.CONTRACT_ABI,
        constants.CONTRACT_ADDRESS,
    );

    const amountBN = getBigNumber(amount).mul(getBigNumber(constants.DECIMALS));
    console.log(amountBN);

    const txn = contract.methods.transferFrom(sender, receiver, amountBN);
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
    return balance/constants.DECIMALS;
};

const getTransactionHistory = async (address) => {
    const apiKey="VVCPGMJQZ2IZ2FQUT7K79HS2K4SEA6AVB9";
    const reqUrl=`https://api-goerli.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${apiKey}`;

    const response = await fetch(reqUrl, { method: 'GET' });
    const responseJSON = await response.json();

    const filteredResponse = responseJSON.result.map((transaction) => {
        const {
            timeStamp,
            to,
            value,
            hash,
        } = transaction;

        const txnType = to === address.toLowerCase() ? "CREDIT" : "PAYMENT";

        return {
            timeStamp,
            txnType,
            to: constants.WALLET_NAME_MAP[transaction.to],
            value: value/constants.DECIMALS,
            hash,
        };
    });
    return filteredResponse;
};

export {
    sendToken,
    getBalance,
    getTransactionHistory,
};
