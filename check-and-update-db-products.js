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
  console.log('Fetching products from database...');
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  console.log(`Found ${products.length} products:`);
  products.forEach(p => {
    console.log(`- ID: ${p.id}, Name: ${p.name_uz}, Image: ${p.image}`);
  });

  // Let's update the image paths to the new mockups in the DB
  const updates = [
    { id: 'fiziobrain-dha', image: '/fiziobrain-mockup.jpg' },
    { id: 'ferro-glob', image: '/ferroglob-mockup.jpg' },
    { id: 'fiziobrain-kiddrop', image: '/fiziobrain-kiddrop.jpg' }
  ];

  for (const update of updates) {
    const exists = products.some(p => p.id === update.id);
    if (exists) {
      console.log(`Updating product "${update.id}" image to "${update.image}"...`);
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: update.image })
        .eq('id', update.id);

      if (updateError) {
        console.error(`Error updating "${update.id}":`, updateError);
      } else {
        console.log(`Successfully updated "${update.id}".`);
      }
    } else {
      console.log(`Product "${update.id}" not found in database. Skipping.`);
    }
  }

  console.log('Database product updates completed.');
}

main();
