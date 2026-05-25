require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Since we are using typescript for lib/products.ts, we need to extract the data manually for JS, or we can just copy-paste the array here to avoid typescript compilation issues in the seed script.

const PRODUCTS = [
  {
    id: 'fiziobrain',
    name_uz: 'Fiziobrain (DHA Suspenzion)',
    name_ru: 'Fiziobrain (DHA Суспензия)',
    description_uz: 'Bolalar miyasi va yurak-qon tomir tizimining rivojlanishi uchun maxsus ishlab chiqilgan kompleks formula. Miya va nerv hujayralarini tiklash, xotirani yaxshilash va immunitetni mustahkamlash uchun.',
    description_ru: 'Комплексная формула, специально разработанная для развития мозга и сердечно-сосудистой системы детей. Для восстановления мозговых и нервных клеток, улучшения памяти и укрепления иммунитета.',
    composition_uz: 'Dokosaheksayen kislotasi (DHA), Rux, L-Lizin, B vitamini kompleksi, D3 vitamini, Omega-3 yog\' kislotalari.',
    composition_ru: 'Докозагексаеновая кислота (DHA), Цинк, L-Лизин, Комплекс витаминов B, Витамин D3, Омега-3 жирные кислоты.',
    usage_uz: 'Kuniga 1 marta 5 ml (1 o\'lchov qoshiq) ovqatlanish paytida yoki keyin qabul qilinadi. 3 yoshdan 12 yoshgacha bo\'lgan bolalar uchun. Davomiyligi: 30 kun.',
    usage_ru: 'Принимать 1 раз в день по 5 мл (1 мерная ложка) во время или после еды. Для детей от 3 до 12 лет. Длительность: 30 дней.',
    category: 'Miya faoliyati',
    image: '/fiziobrain.png',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarm_bot?start=fiziobrain',
  },
  {
    id: 'ferro-glob',
    name_uz: 'Ferro-Glob',
    name_ru: 'Ferro-Glob',
    description_uz: 'Organizmdagi temir, aminokislotalar va vitaminlar tanqisligini to\'liq qoplash, infeksion kasalliklardan keyin tiklanish. Qon yaratish jarayonini normalashtirish uchun maxsus formulyatsiya.',
    description_ru: 'Полное восполнение дефицита железа, аминокислот и витаминов в организме, восстановление после инфекционных заболеваний. Специальная формуляция для нормализации кровообразования.',
    composition_uz: 'Natriy feredetati, L-Metilfolat, Adenozilkobalamin, Rux (Gem va Globin omili), Askorbin kislotasi, Mis sulfat.',
    composition_ru: 'Натрия фередетат, L-Метилфолат, Аденозилкобаламин, Цинк (фактор Гем и Глобин), Аскорбиновая кислота, Сульфат меди.',
    usage_uz: 'Kattalarga kuniga 2 marta 10 ml, bolalarga kuniga 1 marta 5 ml ovqat oldidan qabul qilinadi. 60 kunlik kurs tavsiya etiladi.',
    usage_ru: 'Взрослым — 2 раза в день по 10 мл, детям — 1 раз в день по 5 мл до еды. Рекомендованный курс — 60 дней.',
    category: 'Kamqonlik',
    image: '/ferroglob.png',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarm_bot?start=ferro-glob',
  },
  {
    id: 'vitaminkids',
    name_uz: 'VitaKids Gummies',
    name_ru: 'VitaKids Gummies',
    description_uz: 'Bolalar uchun 12 ta muhim vitamin va minerallarni o\'z ichiga olgan mazali shirin vitaminlar. Immunitet, o\'sish va rivojlanishni qo\'llab-quvvatlaydi. 4 yoshdan katta bolalar uchun.',
    description_ru: 'Вкусные мармеладные витамины, содержащие 12 важных витаминов и минералов для детей. Поддерживает иммунитет, рост и развитие. Для детей старше 4 лет.',
    composition_uz: 'A, C, D3, E vitamini, B1, B2, B6, B12, Folik kislota, Pantofen kislota, Biotin, Rux.',
    composition_ru: 'Витамины A, C, D3, E, B1, B2, B6, B12, Фолиевая кислота, Пантотеновая кислота, Биотин, Цинк.',
    usage_uz: '4-12 yoshli bolalar: kuniga 2 ta gummies. 12 yoshdan katta: kuniga 3 ta. Chaynab yeyiladi. Ovqatlanish bilan birga qabul qilinishi tavsiya etiladi.',
    usage_ru: 'Дети 4-12 лет: 2 мармеладки в день. Старше 12 лет: 3 мармеладки в день. Жевать. Рекомендуется принимать во время еды.',
    category: 'Bolalar uchun',
    image: '/vitaminkids.png',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarm_bot?start=vitaminkids',
  },
  {
    id: 'omega3-premium',
    name_uz: 'Omega-3 Premium',
    name_ru: 'Omega-3 Premium',
    description_uz: 'Yurak-qon tomir tizimi, miyasi va ko\'rish organlarini himoya qilish uchun yuqori konsentratsiyali baliq yog\'i. EPA va DHA ning optimal nisbati.',
    description_ru: 'Высококонцентрированное рыбье масло для защиты сердечно-сосудистой системы, мозга и органов зрения. Оптимальное соотношение EPA и DHA.',
    composition_uz: 'Baliq yog\'i (EPA 360mg, DHA 240mg per kapsula), E vitamini (antoksidant), Leman qobig\'i yog\'i.',
    composition_ru: 'Рыбий жир (EPA 360 мг, DHA 240 мг на капсулу), Витамин E (антиоксидант), Масло лимонной цедры.',
    usage_uz: 'Kattalarga kuniga 2 kapsula ovqat bilan birga qabul qilinadi. Davolanish kursi: 3 oy.',
    usage_ru: 'Взрослым — 2 капсулы в день во время еды. Курс лечения: 3 месяца.',
    category: 'Kattalar uchun',
    image: '/fiziobrain.png',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarm_bot?start=omega3',
  },
  {
    id: 'neuro-complex',
    name_uz: 'Neuro Complex',
    name_ru: 'Neuro Complex',
    description_uz: 'Miya faoliyatini yaxshilash, xotirani kuchaytirish va aqliy charchoqni kamaytirish uchun kuchli neyrotropik kompleks. Stressga qarshi va diqqatni oshiruvchi.',
    description_ru: 'Мощный нейротропный комплекс для улучшения мозговой деятельности, укрепления памяти и снижения умственной усталости. Антистрессовый и повышающий концентрацию.',
    composition_uz: 'Ginkgo Biloba ekstrakt (240mg), L-Teanin, Fosfatidilserin, B5, B6, B12 vitamini, Magiy L-treonat.',
    composition_ru: 'Экстракт Гинкго Билоба (240 мг), L-Теанин, Фосфатидилсерин, Витамины B5, B6, B12, L-треонат магния.',
    usage_uz: 'Kuniga 1 kapsuladan ertasiga ovqatdan keyin. Talabalar va faol aqliy mehnat bilan shug\'ullanuvchilar uchun.',
    usage_ru: 'По 1 капсуле в день утром после еды. Для студентов и людей с активной умственной деятельностью.',
    category: 'Miya faoliyati',
    image: '/fiziobrain.png',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarm_bot?start=neuro',
  }
];

async function seed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log('Clearing existing products...');
  await supabase.from('products').delete().neq('id', 'dummy');

  console.log('Inserting products...');
  const { data, error } = await supabase.from('products').insert(PRODUCTS);

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log('Successfully seeded products!');
  }
}

seed();
