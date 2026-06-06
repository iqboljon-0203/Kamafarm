const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log('Updating settings...');
  await supabase.from('settings').upsert({ key: 'telegram_bot', value: 'https://t.me/kamafarmhealthcare' });
  await supabase.from('settings').upsert({ key: 'telegram_channel', value: 'https://t.me/kamafarmhealthcare' });
  console.log('Settings updated.');

  console.log('Fetching products...');
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  for (const p of products) {
    let newLink = 'https://t.me/kamafarmhealthcare';
    if (p.telegramlink && p.telegramlink.includes('?start=')) {
      const parts = p.telegramlink.split('?start=');
      newLink = `https://t.me/kamafarmhealthcare?start=${parts[1]}`;
    } else {
      newLink = `https://t.me/kamafarmhealthcare?start=${p.id}`;
    }

    console.log(`Updating product "${p.id}" telegramlink to "${newLink}"...`);
    const { error: updateError } = await supabase
      .from('products')
      .update({ telegramlink: newLink })
      .eq('id', p.id);

    if (updateError) {
      console.error(`Error updating "${p.id}":`, updateError);
    }
  }

  console.log('Database updates completed.');
}

main();
