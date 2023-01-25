import { getWeb3Instance, constants } from "../utils/index.js";

const sendToken = async (sender, receiver, amount, note) => {
    const web3 = getWeb3Instance();
    const networkId = await web3.eth.net.getId();
    const {
        abi,
        networks,
    } = constants.CONTRACT_JSON;

    const contract = new web3.eth.Contract(
        abi,
        networks[networkId].address,
    );

    const txn = contract.methods.sendCoin(receiver, amount);
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
        chainId: networkId,
    }, constants.PRIVATE_KEY);

    const receipt = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
    return receipt;
};

const getBalance = async (address) => {
    const web3 = getWeb3Instance();
    const networkId = await web3.eth.net.getId();
    const {
        abi,
        networks,
    } = constants.CONTRACT_JSON;

    const contract = new web3.eth.Contract(
        abi,
        networks[networkId].address,
    );

    const balance = await contract.methods.getBalance(address).call();
    return balance;
};

export {
    sendToken,
    getBalance,
};
