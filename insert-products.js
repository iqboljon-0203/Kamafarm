const fs = require('fs');

const newProducts = [
  {
    id: 'floraslip',
    name_uz: 'Floraslip',
    name_ru: 'Флораслип',
    description_uz: 'Uyqusizlikka qarshi adaptogen vosita.',
    description_ru: 'Адаптогенное средство от бессонницы.',
    composition_uz: 'Melatonin, Valeriana ildizi ekstrakti, Glitsin.',
    composition_ru: 'Мелатонин, Экстракт корней валерианы, Глицин.',
    usage_uz: 'Uyqudan oldin qabul qilinadi.',
    usage_ru: 'Принимать перед сном.',
    category: 'Kattalar uchun',
    image: '/floraslip.jpg',
    badge: 'Yangi',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=floraslip',
    leaflet_uz: [],
    leaflet_ru: []
  },
  {
    id: 'livolola',
    name_uz: 'Livolola',
    name_ru: 'Ливолола',
    description_uz: 'Jigar salomatligi uchun vosita.',
    description_ru: 'Средство для здоровья печени.',
    composition_uz: 'N-Asetiltsistein, Silimarin, L-Ornitin, L-Aspartat, Vitaminlar va minerallar (Mg, Fe, Zn).',
    composition_ru: 'N-Ацетилцистеин, Силимарин, L-Орнитин, L-Аспартат, Витамины и минералы (Кальций, Магний, Железо, Цинк).',
    usage_uz: 'Kattalar uchun.',
    usage_ru: 'Для взрослых.',
    category: 'Kattalar uchun',
    image: '/livolola.jpg',
    badge: 'Yangi',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=livolola',
    leaflet_uz: [],
    leaflet_ru: []
  },
  {
    id: 'zoarapid',
    name_uz: 'ZoaRapid',
    name_ru: 'ЗоаРапид',
    description_uz: 'Erkaklar salomatligi uchun vosita.',
    description_ru: 'Средство для мужского здоровья.',
    composition_uz: 'L-Karnitin, Rux sulfat, Koferment Q10, Astaksantin, Likapin, Metilkobalamin, Natriy selenat.',
    composition_ru: 'L-Карнитин, Цинка сульфат, Кофермент Q10, Астаксантин, Ликопин, Метилкобаламин, Селенат натрия.',
    usage_uz: 'Kattalar uchun.',
    usage_ru: 'Для взрослых.',
    category: 'Kattalar uchun',
    image: '/zoarapid.jpg',
    badge: 'Yangi',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=zoarapid',
    leaflet_uz: [],
    leaflet_ru: []
  },
  {
    id: 'nefrokulir',
    name_uz: 'Nefrokulir',
    name_ru: 'Нефроклир',
    description_uz: 'Buyraklar va siydik yo\'llari sog\'ligi uchun.',
    description_ru: 'Средство для почек и мочевыводящих путей.',
    composition_uz: 'O\'simliklardan tayyorlangan vosita.',
    composition_ru: 'Средство растительного происхождения.',
    usage_uz: 'Kattalar uchun. 30 kapsula.',
    usage_ru: 'Для взрослых. 30 капсул.',
    category: 'Kattalar uchun',
    image: '/nefrokulir.jpg',
    badge: 'Yangi',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=nefrokulir',
    leaflet_uz: [],
    leaflet_ru: []
  }
];

function appendProductsToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lastIndex = content.lastIndexOf('];');
  if (lastIndex !== -1) {
    const productsStr = newProducts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');
    content = content.substring(0, lastIndex) + ',\n  ' + productsStr + '\n];' + content.substring(lastIndex + 2);
    fs.writeFileSync(filePath, content);
    console.log('Appended to', filePath);
  } else {
    console.log('Could not find ]; in', filePath);
  }
}

appendProductsToFile('./src/lib/constants.ts');
appendProductsToFile('./seed-products.js');
