const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const PRODUCTS = require('./seed-products.js');

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
  for (const product of PRODUCTS) {
    const dbData = {
      id: product.id,
      name_uz: product.name_uz || '',
      name_ru: product.name_ru || '',
      description_uz: product.description_uz || '',
      description_ru: product.description_ru || '',
      composition_uz: product.composition_uz || '',
      composition_ru: product.composition_ru || '',
      usage_uz: product.usage_uz || '',
      usage_ru: product.usage_ru || '',
      category: product.category || '',
      image: product.image || '',
      badge: product.badge || '',
      telegramlink: product.telegramlink || ''
    };

    const { data: existing } = await supabase.from('products').select('id').eq('id', product.id).maybeSingle();

    if (existing) {
      console.log('Updating', product.id);
      const { error } = await supabase.from('products').update(dbData).eq('id', product.id);
      if (error) console.error('Error updating', product.id, error);
    } else {
      console.log('Inserting', product.id);
      const { error } = await supabase.from('products').insert([dbData]);
      if (error) console.error('Error inserting', product.id, error);
    }
  }
  console.log('Done syncing products to Supabase!');
}

main();
