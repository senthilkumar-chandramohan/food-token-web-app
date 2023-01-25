import CONTRACT_JSON from "./resources/MetaCoin.json" assert { type: "json" };

const SYSTEM_WALLET = '0xd29eB4F7693ee0AF2FA68747743A9A8910813d6e';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '474a4917bf23caefe40a3eba19c96e154c742cda7bb9228ee1ccd4e1607903c5';

export {
    SYSTEM_WALLET,
    PRIVATE_KEY,
    CONTRACT_JSON,
};
