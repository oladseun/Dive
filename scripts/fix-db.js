const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixDb() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // 1. Add INSERT policy for users
    console.log('Adding INSERT policy to public.users...');
    await client.query(`
      DROP POLICY IF EXISTS "Users can insert own data." ON public.users;
      CREATE POLICY "Users can insert own data." ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
    `);

    // 2. Create Trigger to automatically insert row on auth.users insert
    console.log('Creating trigger for auth.users...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.users (id, email, name)
        VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    `);

    // 3. Sync existing auth.users to public.users
    console.log('Syncing existing users...');
    await client.query(`
      INSERT INTO public.users (id, email, name)
      SELECT id, email, raw_user_meta_data->>'full_name'
      FROM auth.users
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Database fixed successfully!');
  } catch (err) {
    console.error('Error fixing database:', err);
  } finally {
    await client.end();
  }
}

fixDb();
