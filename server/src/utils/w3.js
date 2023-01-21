import Web3 from 'web3';

const getWeb3Instance = () => {
    return new Web3('http://127.0.0.1:7545');
}

export {
    getWeb3Instance,
};