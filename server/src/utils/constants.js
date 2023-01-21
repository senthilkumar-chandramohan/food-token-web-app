import CONTRACT_JSON from "./resources/MetaCoin.json" assert { type: "json" };

const FROM_ADDRESS = '0x8cD2CF9e38DE42ffDC749BfCA6b7376B26F95109';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '231d2cacf0ce6edf8973234d3d33d20a62214023c76e0fcccc95aaaa3163e32a';

export {
    FROM_ADDRESS,
    PRIVATE_KEY,
    CONTRACT_JSON,
};
