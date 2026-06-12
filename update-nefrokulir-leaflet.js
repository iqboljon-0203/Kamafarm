const fs = require('fs');

const leaflet_uz = [
  {
    title: "Chiqarish shakli va tarkibi",
    content: [
      "Chiqarish shakli: kapsulalar, planshetlar 600, 1000 mg.",
      "1 kapsulaning tarkibi:",
      "Dorixona levisti ildizi ekstrakti - 100 mg",
      "Oddiy tillabosh o'ti ekstrakti - 100 mg",
      "Rozmarin barglari ekstrakti - 100 mg",
      "Dala qirqbo'g'imi quruq ekstrakti - 15 mg"
    ]
  },
  {
    title: "Xususiyatlari",
    content: [
      "O'simliklardan tayyorlangan buyrak va siydik yo'llari kasalliklari tuzalishiga yordam beradigan vosita. Preparat spazmga, yallig'lanishga qarshi va antimikrobiyal ta'sirga ega bo'lib, yengil diuretik va tuzlarni eritish xususiyati bor.",
      "Dorixona levisti ildizi ekstrakti – antispazmodik, diuretik va antibakterial ta'sirga ega.",
      "Oddiy tillabosh o'ti ekstrakti - ishtahani oshiradi, me'da shirasining sekretsiyasini oshiradi, oshqozon-ichak motorikasini tezlashtiradi, yengil laksatif va antigelmintik ta'sirga ega.",
      "Rozmarin barglari ekstrakti - yallig'lanishga qarshi, diuretik, antispazmodik va antibakterial ta'sirga ega.",
      "Dala qirqbo'g'imi ekstrakti - diuretik va yallig'lanishga qarshi ta'sirga ega. Ushbu vositaning terapevtik ta'siri qabul qilishning birinchi kunidan boshlab namoyon bo'ladi va butun davolanish davrida kuzatiladi."
    ]
  },
  {
    title: "Foydalanish uchun ko'rsatmalar",
    content: [
      "Nefroklir biologik faol oziq-ovqat qo'shimchasi o'simlik tarkibiy qismlarining biologik ta'sirining kombinatsiyasi birinchi navbatda siydik hosil bo'lishi va chiqarilishining fiziologik jarayonlarining yaxshilanishi bilan tavsiflanadi.",
      "Bundan tashqari, ular immunitet tizimini mustahkamlash, siydik yo'llarida mikroblarsiz muhitni saqlash, yallig'lanish va spastik jarayonlarni rivojlanish xavfini kamaytirish kabi tananing boshqa turli muhim funktsiyalarini metabolizm va regulatsiyada ham ishtirok etadi; turli tuzlar va MKD hosil bo'lish xavfini kamaytiradi.",
      "Mahsulotning faol komponentlari, shuningdek, qon tomirlari devorlarining metabolizmini, ularning mustahkamligi va elastikligini yaxshilashga yordam beradi. Qon tomirlarining tonusini yaxshilash qon aylanishini va organlarning funktsional faoliyatini faollashtirishga yordam beradi.",
      "Nefroklir tarkibidagi boy vitamin kompleksi ishtahani va umumiy faoliyatni yaxshilaydi, tananing sovuqqa chidamliligini oshiradi, charchoqni yo'q qiladi va siydik yo'llarining yallig'lanish kasalliklarini rivojlanish xavfini kamaytiradi."
    ]
  },
  {
    title: "Tavsiya etiladi",
    content: [
      "Kattalar va 12 yoshdan oshgan bolalar: 1 kapsuladan (tabletka) kuniga 2 marta, ovqatdan oldin yoki ovqat vaqtida qabul qilinadi. Davolashning davomiyligi - 1 oy."
    ]
  },
  {
    title: "Qo'llash mumkin bo'lmagan holatlar va Maxsus ko'rsatmalar",
    content: [
      "Qo'llash mumkin bo'lmagan holatlar: tarkibiy qismlarga individual yuqori sezuvchanlik.",
      "Maxsus ko'rsatmalar: Biologik faol oziq-ovqat qo'shimchasi. Dori vositasi emas. Ishlatishdan oldin mutaxassis bilan maslahatlashish talab etiladi.",
      "Homilador, emizikli ayollar va 12 yoshgacha bo'lgan bolalarga faqat shifokor ko'rsatmasi bo'yicha tavsiya etiladi.",
      "Quruq, salqin, quyosh nurlaridan himoyalangan, bolalar qo'li etmaydigan joyda saqlang. Yaroqlilik muddati: 3 yil.",
      "Ishlab chiqaruvchi: MChJ \"Kamafarm Healthcare\" Uzbekistan"
    ]
  }
];

const leaflet_ru = [
  {
    title: "Форма выпуска и Состав",
    content: [
      "Форма выпуска: капсулы, таблетки 600, 1000 мг.",
      "Состав 1 таблетки:",
      "Экстракт любистока лекарственного корни - 100 мг",
      "Экстракт золототысячника трава - 100 мг",
      "Экстракт розмарина обыкновенного листья - 100 мг",
      "Сухой экстракт хвоща полевого - 15 мг"
    ]
  },
  {
    title: "Свойства",
    content: [
      "Диуретическое средство растительного происхождения. Препарат оказывает мочегонное, спазмолитическое, противовоспалительное, противомикробное действие.",
      "Экстракт любистока лекарственного корни - оказывает диуретическое, спазмолитическое и антибактериальное действие.",
      "Экстракт золототысячника трава - повышает аппетит, повышает секрецию желудочного сока, ускоряет моторику ЖКТ, оказывает легкое слабительное и противогельминтное действие.",
      "Экстракт розмарина обыкновенного листья - оказывает противовоспалительное, диуретическое, спазмолитическое и антибактериальное действие.",
      "Сухой экстракт хвоща полевого - оказывает диуретическое и противовоспалительное действие. Лечебное действие проявляется уже с первого дня приема и наблюдается в течение всего периода лечения."
    ]
  },
  {
    title: "Показания к применению",
    content: [
      "Сочетание биологических эффектов растительных компонентов в биодобавке к пище Нефроклир характеризуется преимущественно улучшением физиологических процессов мочеобразования и мочевыделения.",
      "Кроме того, они также участвуют в метаболизме и регуляции различных других важных функций организма, таких как укрепление иммунитета, сохранение в мочевых путях без микробной среды и снижение риска развития воспалительных и спастических процессов; уменьшает риск образование различных солей и МКД.",
      "Активные компоненты продукции способствуют также улучшению обмена веществ стенок кровеносных сосудов, их прочности и эластичности. Улучшение сосудистого тонуса способствует активации кровообращения и функциональной активности органов.",
      "Богатый витаминный комплекс в составе Нефроклир улучшает аппетит и общее самочувствие, повышает устойчивость организма к простудным процессам, устраняет утомляемость, уменьшает риск развития воспалительных заболеваний мочевыводящих путей."
    ]
  },
  {
    title: "Рекомендуется",
    content: [
      "Взрослым и детям старше 12 лет по 1 капсуле (таблеток) 2 раза в сутки, вовремя или до еды. Продолжительность приема - 1 месяц."
    ]
  },
  {
    title: "Противопоказания и Особые указания",
    content: [
      "Противопоказание: индивидуальная непереносимость компонентов.",
      "Особые указания: Биологически активная добавка к пище. Не является лекарственным средством. Перед применением требуется консультация специалиста.",
      "Беременным, кормящим женщинам и детям до 12 лет рекомендуется только по назначению врача.",
      "Хранить в сухом, прохладном, защищенном от солнечных лучей, недоступном для детей месте. Срок годности: 2 года.",
      "Производитель: ООО “Kamafarm Healthcare” Узбекистан"
    ]
  }
];

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const nefIndex = content.indexOf('"id": "nefrokulir"');
  if (nefIndex !== -1) {
    const uzStr = `"leaflet_uz": ${JSON.stringify(leaflet_uz, null, 4)}`;
    const ruStr = `"leaflet_ru": ${JSON.stringify(leaflet_ru, null, 4)}`;
    
    let before = content.substring(0, nefIndex);
    let after = content.substring(nefIndex);
    
    after = after.replace(/"leaflet_uz":\s*\[\s*\]/, uzStr);
    after = after.replace(/"leaflet_ru":\s*\[\s*\]/, ruStr);
    
    fs.writeFileSync(filePath, before + after);
    console.log('Updated leaflets for nefrokulir in', filePath);
  } else {
    console.log('nefrokulir not found in', filePath);
  }
}

updateFile('./src/lib/constants.ts');
updateFile('./seed-products.js');
