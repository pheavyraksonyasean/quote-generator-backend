
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

app.use(cors());
// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/random-quote', async (req, res) => {
  try {
    // Call the 'get_random_quote' database function (RPC)
    const { data, error } = await supabase.rpc('get_random_quote');

    if (error) {
      throw error;
    }

    const quote = data[0]; 

    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ error: 'No quotes found.' });
    }

  } catch (error) {
    console.error('Error fetching random quote:', error.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});