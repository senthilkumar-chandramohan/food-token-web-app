import https from 'https';
import http from'http';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import webPush from 'web-push';
import { sendToken, getBalance, getTransactionHistory } from './modules/index.js';
import { ACCOUNT_DETAILS_MAP } from './utils/constants.js';
import init from './modules/init.js';

import './modules/txn-listener.js';

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

  const fromWalletAddress = ACCOUNT_DETAILS_MAP[fromAccountID].wallet;
  const toWalletAddress = ACCOUNT_DETAILS_MAP[toAccountID].wallet;

  console.log("fromWallet", fromWalletAddress);
  console.log("toWallet", toWalletAddress);

  const receipt = await sendToken(fromWalletAddress, toWalletAddress, amount, note);
  res.json(receipt);
});

app.get("/get-balance", async (req, res) => {
  const accountID = req.query.accountID;
  const walletAddress = ACCOUNT_DETAILS_MAP[accountID].wallet;
  console.log("wallet", walletAddress);
  const balance = await getBalance(walletAddress);
  res.json({ balance });
});

app.get("/get-txn-history", async (req, res) => {
  const accountID = req.query.accountID;
  const walletAddress = ACCOUNT_DETAILS_MAP[accountID].wallet;
  console.log("wallet", walletAddress);
  const txnHistory = await getTransactionHistory(walletAddress);
  res.json({ txnHistory });
});

app.get("/get-app-server-key", async (req, res) => {
  const {
    query: {
      accountID,
    }
  } = req;

  const vapidKeys = ACCOUNT_DETAILS_MAP[accountID].vapidKeys || webPush.generateVAPIDKeys();
  const { publicKey } = vapidKeys;
  console.log(vapidKeys);
  
  ACCOUNT_DETAILS_MAP[accountID].vapidKeys = vapidKeys;

  console.log("Acount details", ACCOUNT_DETAILS_MAP);
  const result = fs.writeFileSync(`${__dirname}\\utils\\resources\\ACCOUNT_DETAILS_MAP.json`, JSON.stringify(ACCOUNT_DETAILS_MAP));
  console.log(result);

  res.json({ publicKey });
});


app.post("/add-subscription", (req, res) => {
  const {
    body,
    query: {
      accountID,
    }
  } = req;

  console.log('accountID', accountID);
  console.log('body', body);

  ACCOUNT_DETAILS_MAP[accountID].subscription = body;

  console.log("Acount details", ACCOUNT_DETAILS_MAP);
  const result = fs.writeFileSync(`${__dirname}\\utils\\resources\\ACCOUNT_DETAILS_MAP.json`, JSON.stringify(ACCOUNT_DETAILS_MAP));

  const payload = JSON.stringify({ title: 'Push Notification Test' });

  const vapidKeys = ACCOUNT_DETAILS_MAP[accountID].vapidKeys;
  
  webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  console.log('subscription', body);
  webPush.sendNotification(body, payload)
    .catch(error => console.error(error));

  res.json({status: 'success'});
});

init(__dirname);

// app.listen(port, () => {
//   console.log(`Listening to port on ${port}`);
// });

// Create an HTTP service.
http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
