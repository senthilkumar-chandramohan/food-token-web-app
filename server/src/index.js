import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendToken, getBalance } from './modules/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.port || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "../../client-buyer/public"))); // To be used in localhost ONLY

app.post("/send-token", async (req, res) => {
  const {
    body: {
      fromAddress,
      toAddress,
      amount,
      note,
    },
  } = req;

  const receipt = await sendToken(fromAddress, toAddress, amount, note);
  res.json(receipt);
});

app.get("/get-balance", async (req, res) => {
  const balance = await getBalance('0x9f7e7c6f2114C114bA070C82e30901aE6526F673');
  res.send(balance);
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
});
