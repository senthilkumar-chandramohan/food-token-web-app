import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendToken, getBalance } from './modules/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../client-buyer/public"))); // To be used in localhost ONLY

app.get("/send-token", async (req, res) => {
  const receipt = await sendToken('0x1aa9698D553Cce1ACB50b069e7Cfb674cAaA4de3', 10);
  res.json(receipt);
});

app.get("/get-balance", async (req, res) => {
  const balance = await getBalance('0x1aa9698D553Cce1ACB50b069e7Cfb674cAaA4de3', 10);
  res.send(balance);
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
});
