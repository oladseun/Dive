const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixDb() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    console.log('Adding description column to public.opportunities...');
    await client.query(`
      ALTER TABLE public.opportunities ADD COLUMN IF NOT EXISTS description text;
    `);
    
    // Notify PostgREST to reload schema cache
    await client.query(`NOTIFY pgrst, 'reload schema';`);

    console.log('Database schema updated successfully!');
  } catch (err) {
    console.error('Error fixing database:', err);
  } finally {
    await client.end();
  }
}

fixDb();
