import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';


export function initApi() {
  config();
  const api = express();
  const PORT = process.env.BOT_API_PORT || 4828;

  api.use(cors());
  api.use(express.json());


  api.listen(PORT, () => {
    console.log(`Bot API is running on port ${PORT}`);
  });

  return api;
}