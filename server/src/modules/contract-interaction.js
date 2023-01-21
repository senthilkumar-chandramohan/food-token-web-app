import { getWeb3Instance, constants } from "../utils/index.js";

const sendToken = async (receiver, amount) => {
    const web3 = getWeb3Instance();
    // const createTransaction = await web3.eth.accounts.signTransaction({
    //     from: constants.FROM_ADDRESS,
    //     to: receiver,
    //     value: 0,
    //     gas: 21000,
    // }, constants.PRIVATE_KEY);

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
    const gas = await txn.estimateGas({ from: constants.FROM_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    const data = txn.encodeABI();
    const nonce = await web3.eth.getTransactionCount(constants.FROM_ADDRESS);

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

export {
    sendToken,
}