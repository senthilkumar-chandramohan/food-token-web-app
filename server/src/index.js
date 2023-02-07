import https from 'https';
import http from'http';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendToken, getBalance } from './modules/index.js';
import { ACCOUNT_WALLET_MAP } from './utils/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.port || 3001;

const options = {
  key: fs.readFileSync(__dirname + '\\test\\fixtures\\keys\\client-key.pem'),
  cert: fs.readFileSync(__dirname + '\\test\\fixtures\\keys\\client-cert.pem'),
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ['https://localhost:3000','https://192.168.0.112:3000']
}));
app.use("/", express.static(path.join(__dirname, "../../client-buyer/public"))); // To be used in localhost ONLY

app.post("/send-token", async (req, res) => {
  const {
    body: {
      fromAccountID,
      toAccountID,
      amount,
      note,
    },
  } = req;

  const fromWalletAddress = ACCOUNT_WALLET_MAP[fromAccountID];
  const toWalletAddress = ACCOUNT_WALLET_MAP[toAccountID];

  console.log("fromWallet", fromWalletAddress);
  console.log("toWallet", toWalletAddress);

  const receipt = await sendToken(fromWalletAddress, toWalletAddress, amount, note);
  res.json(receipt);
});

app.get("/get-balance", async (req, res) => {
  const accountID = req.query.accountID;
  const walletAddress = ACCOUNT_WALLET_MAP[accountID];
  console.log(walletAddress);
  const balance = await getBalance(walletAddress);
  res.json({ balance });
});

// app.listen(port, () => {
//   console.log(`Listening to port on ${port}`);
// });

// Create an HTTP service.
http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
