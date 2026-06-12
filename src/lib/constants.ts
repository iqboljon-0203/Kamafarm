import { Product } from './types';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'fiziobrain-dha',
    name_uz: 'Fiziobrain DHA',
    name_ru: 'Fiziobrain DHA',
    description_uz: 'Bolalar miya ozuqasi. Bola miyasi faolligi va intellektual rivojlanishini qo\'llab-quvvatlaydi, aqliy faoliyatni yaxshilaydi.',
    description_ru: 'Детская суспензия для развития мозга. Поддерживает мозговую активность ребенка и его интеллектуальное развитие.',
    composition_uz: 'Dokosaheksayen kislotasi (DHA), Rux, L-Lizin va multivitaminlar.',
    composition_ru: 'Докозагексаеновая кислота (DHA), Цинк, L-Лизин и мультивитамины.',
    usage_uz: '3 yoshdan oshgan bolalar uchun. Kuniga 5 ml (1 o\'lchov qoshig\'i) ovqatdan keyin qabul qilinadi.',
    usage_ru: 'Для детей старше 3 лет. Принимать по 5 мл (1 мерная ложка) в день после еды.',
    category: 'Miya faoliyati',
    image: '/fiziobrain.jpg',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=fiziobrain',
    leaflet_uz: [
      {
        title: '1. Fiziobrain DHA suspenziyasi nima va u nima uchun ishlatiladi?',
        content: [
          'Fiziobrain DHA suspenziyasi tarkibida Dokosaheksayen kislotasi, Rux, L-Lizin va muhim multivitaminlar mavjud.',
          'Dokosaheksayen kislotasi (DHA) — tanamizdagi har bir hujayraning, ayniqsa miya va ko\'z to\'r pardasi rivojlanishi uchun muhim tarkibiy qismdir.',
          'Miyaning rivojlanishi va ishlashi uchun zarur, chunki bu modda asab hujayralarining o\'zaro aloqa tezligi va sifatiga ijobiy ta\'sir qiladi. Bundan tashqari, u ko\'rish qobiliyatini yaxshilaydi, yurak-qon tomir tizimini himoya qiladi va immunitetni mustahkamlaydi.'
        ]
      },
      {
        title: '2. Fiziobrain DHA suspenziyasini qabul qilishdan oldin bilish kerak bo\'lgan ma\'lumotlar',
        content: [
          'Agar Dokosaheksayen kislotasi, Rux, L-Lizin va muhim multivitaminlarga nisbatan allergiyangiz bo\'lsa, Fiziobrain DHA suspenziyasini qabul qilmang.',
          'Ogohlantirishlar va ehtiyot choralari: Boshqa kasalliklar bo\'lsa, shifokor maslahati bilan qabul qiling. Shifokoringizga ushbu vositaga bo\'lgan organizmingizning munosabatini bildiring. Qandli diabetda ehtiyot choralarini ko\'ring.',
          'Boshqa dorilar bilan o\'zaro ta\'siri: Boshqa dori-darmonlar qabul qilayotgan bo\'lsangiz, shifokoringizga xabar bering.'
        ]
      },
      {
        title: '3. Fiziobrain DHA suspenziyasiga ko\'rsatma va uni qabul qilish tartibi',
        content: [
          'Fiziobrain DHA suspenziyasi ovqatdan oldin yoki keyin qabul qilinadi. Har doim ushbu mahsulotni shifokor ko\'rsatmasiga binoan qabul qiling.',
          'Katta yoshdagi bolalar va kattalar uchun: 10 ml dan 1-2 mahal ovqatdan so\'ng 3 oygacha qabul qilish tavsiya etiladi.',
          'Agar tasodifan yuqori doza qabul qilib qo\'ysangiz, shifokor bilan maslahatlashing.'
        ]
      },
      {
        title: '4. Mumkin bo\'lgan nojo\'ya ta\'sirlar',
        content: [
          'Fiziobrain DHA suspenziyasi ko\'pchilik odamlar uchun xavfsizdir.',
          'Ayrim hollarda oshqozon buzilishi, bosh og\'rig\'i, ko\'ngil aynishi, qabziyat yoki diareya kabi holatlar kuzatilishi mumkin. Nojo\'ya ta\'sirlar kuzatilsa shifokorga xabar bering.'
        ]
      },
      {
        title: '5. Fiziobrain DHA suspenziyasini saqlash sharoiti',
        content: [
          'Bolalar qo\'li yetmaydigan joyda saqlang.',
          '25°C dan past haroratda, quruq va yorug\'likdan himoyalangan joyda saqlansin.',
          'Yaroqlilik muddati tugaganidan keyin ishlatmang.'
        ]
      },
      {
        title: '6. Tarkibi va boshqa ma\'lumotlar (Har 10 ml da)',
        content: [
          'Dokosaheksayen kislotasi (DHA) — 50 mg',
          'Rux sulfati — 50 mg (ekv. 20 mg Rux)',
          'L-Lizin Gidroxloridi — 25 mg',
          'Vitamin D3 — 200 XB',
          'Vitamin C — 20 mg',
          'Vitamin A — 2500 XB',
          'Vitamin B1 — 1 mg',
          'Vitamin B6 — 0.5 mg',
          'Vitamin B12 — 2.5 mkg',
          'Vitamin B3 — 10 mg',
          'Kalsiy Pantotenat — 2.5 mg',
          'Fiziobrain DHA suspenziyasi 200 ml qahrabo rangli PET shishada ishlab chiqariladi.',
          'Ishlab chiqaruvchi: ZEON BIOTECH, GIDC, Vatva, Ahmedabad, Hindiston.'
        ]
      }
    ],
    leaflet_ru: [
      {
        title: '1. Что это такое и для чего применяется?',
        content: [
          'Суспензия Fiziobrain DHA содержит докозагексаеновую кислоту, цинк, L-лизин и важные мультивитамины.',
          'Докозагексаеновая кислота (DHA) — важный компонент для развития каждой клетки нашего организма, особенно мозга и сетчатки глаз.',
          'Необходима для развития и функционирования мозга, так как положительно влияет на скорость и качество связи между нервными клетками. Также улучшает зрение, защищает сердечно-сосудистую систему и укрепляет иммунитет.'
        ]
      },
      {
        title: '2. Что нужно знать перед приемом?',
        content: [
          'Не принимайте суспензию Fiziobrain DHA, если у вас есть аллергия на докозагексаеновую кислоту, цинк, L-лизин или другие компоненты.',
          'Предупреждения и меры предосторожности: При наличии других заболеваний проконсультируйтесь с врачом перед приемом. При сахарном диабете соблюдайте осторожность.',
          'Взаимодействие с другими лекарствами: Сообщите врачу, если вы принимаете другие препараты.'
        ]
      },
      {
        title: '3. Способ применения и дозы',
        content: [
          'Суспензию Fiziobrain DHA принимают до или после еды. Всегда принимайте этот продукт по назначению врача.',
          'Для взрослых и детей старшего возраста: по 10 мл 1-2 раза в день после еды. Рекомендуется курс приема до 3 месяцев.',
          'В случае случайной передозировки обратитесь к врачу.'
        ]
      },
      {
        title: '4. Возможные побочные эффекты',
        content: [
          'Суспензия Fiziobrain DHA безопасна для большинства людей.',
          'В редких случаях могут наблюдаться расстройства желудка, головная боль, тошнота, запор или диарея. В случае побочных эффектов сообщите врачу.'
        ]
      },
      {
        title: '5. Условия хранения',
        content: [
          'Хранить в недоступном для детей месте.',
          'Хранить при температуре ниже 25°C в сухом и защищенном от света месте.',
          'Не использовать после истечения срока годности.'
        ]
      },
      {
        title: '6. Состав и прочая информация (в каждых 10 мл)',
        content: [
          'Докозагексаеновая кислота (DHA) — 50 мг',
          'Сульфат цинка — 50 мг (экв. 20 мг цинка)',
          'L-лизина гидрохлорид — 25 мг',
          'Витамин D3 — 200 МЕ',
          'Витамин C — 20 мг',
          'Витамин A — 2500 МЕ',
          'Витамин B1 — 1 мг',
          'Витамин B6 — 0.5 мг',
          'Витамин B12 — 2.5 мкг',
          'Витамин B3 — 10 мг',
          'Пантотенат кальция — 2.5 мг',
          'Суспензия Fiziobrain DHA выпускается во флаконах из янтарного ПЭТ объемом 200 мл.',
          'Производитель: ZEON BIOTECH, GIDC, Ватва, Ахмедабад, Индия.'
        ]
      }
    ]
  },
  {
    id: 'ferro-glob',
    name_uz: 'Ferro-Glob',
    name_ru: 'Ferro-Glob',
    description_uz: 'Almashinmaydigan aminokislotalar va darmondorilardan iborat sirop. Gem va Globin omillari manbai.',
    description_ru: 'Сироп, содержащий незаменимые аминокислоты и витамины. Источник факторов ГЕМ и ГЛОБИН.',
    composition_uz: 'Natriy feredetati (sodium feredetate), L-Metilfolat, Adenozilkobalamin, Rux, Muhim aminokislotalar.',
    composition_ru: 'Натрия фередетат, L-метилфолат, Аденозилкобаламин, Цинк, Незаменимые аминокислоты.',
    usage_uz: 'Kattalarga kuniga 2 marta 10 ml, bolalarga kuniga 1 marta 5 ml ovqatdan oldin qabul qilinadi.',
    usage_ru: 'Взрослым — 2 раза в день по 10 мл, детям — 1 раз в день по 5 мл до еды.',
    category: 'Kamqonlik',
    image: '/ferroglob.jpg',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=ferro-glob',
    leaflet_uz: [
      {
        title: '1. Ferro-Glob suspenziyasi nima va u nima uchun ishlatiladi?',
        content: [
          'Ferro-Glob suspenziyasi tarkibida Natriy Feredetati, L-Metilfolat, Adenozilkobalamin, Rux va Almashinmaydigan aminokislotalar mavjud.',
          'Ushbu vosita organizmda Temir, Vitaminlar va Aminokislotalar tanqisligida yetishmovchilikni to\'ldirish uchun mo\'ljallangan.',
          'Quyidagi holatlarda yordam beradi: Qonda Gemoglobin darajasining pastligi (kamqonlik), Qizil qon hujayralari ishlab chiqarish sustlashganda, homiladorlik va emizish davrida foliy kislotasi yetishmasligi tufayli kamqonlikda, jigar kasalliklarida qo\'shimcha ozuqa sifatida, buyrak dializida, energiyani oshirishda, stress darajasini pasaytirishda va immunitetni kuchaytirishda.'
        ]
      },
      {
        title: '2. Ferro-Glob suspenziyasini qabul qilishdan oldin bilish kerak bo\'lgan ma\'lumotlar',
        content: [
          'Agar faol moddalarga yoki boshqa ingredientlarga nisbatan allergiyangiz bo\'lsa, Ferro-Glob suspenziyasini qabul qilmang.',
          'Ogohlantirishlar va ehtiyot choralari: Agar boshqa kasalliklar bo\'lsa, qabul qilishdan oldin shifokor bilan maslahatlashing. Homiladorlik va laktatsiya davrida shifokor tavsiyasi talab etiladi.',
          'Boshqa dorilar bilan o\'zaro ta\'siri: Antasid vositalar bilan alohida qabul qilinishi lozim. Kofein temir so\'rilishini kamaytirishi sababli, kofeinli ichimliklarni cheklash tavsiya etiladi.'
        ]
      },
      {
        title: '3. Ferro-Glob suspenziyasiga ko\'rsatma va uni qabul qilish tartibi',
        content: [
          'Ferro-Glob suspenziyasi ovqatdan keyin qabul qilinadi, shifokor ko\'rsatmasiga binoan ayrim holatlarda ovqatdan oldin qabul qilish tavsiya etiladi.',
          'Bolalar uchun (2 yoshdan 12 yoshgacha): 5 ml dan 1 yoki 2 mahal ovqatdan oldin.',
          'Katta yoshdagilar va kattalar uchun: 10 ml dan 2 yoki 3 mahal ovqatdan oldin, shifokor tavsiyasiga ko\'ra.',
          'Vaznga nisbatan doza: 0.5 ml/kg.'
        ]
      },
      {
        title: '4. Mumkin bo\'lgan nojo\'ya ta\'sirlar',
        content: [
          'Qabziyat, diareya yoki oshqozon buzilishi, bosh og\'rig\'i, ko\'ngil aynishi, qon bosimining o\'zgarishi kabi nojo\'ya ta\'sirlar kuzatilishi mumkin. Agar nojo\'ya ta\'sirlar kuzatilsa, qabul qilishni to\'xtating va shifokorga murojaat qiling.'
        ]
      },
      {
        title: '5. Ferro-Glob suspenziyasini saqlash sharoiti',
        content: [
          'Bolalar qo\'li yetmaydigan joyda saqlang.',
          '25°C dan past haroratda, quruq, yorug\'likdan himoyalangan joyda saqlansin.',
          'Yaroqlilik muddati tugaganidan keyin ishlatmang.'
        ]
      },
      {
        title: '6. Tarkibi va boshqa ma\'lumotlar (Har 10 ml da)',
        content: [
          'Natriy Feredetati — 231 mg (ekv. 33 mg Fe)',
          'L-Metilfolat — 0.5 mg',
          'Adenozilkobalamin — 50 mkg',
          'Rux sulfati — 25 mg (ekv. 10 mg Zn)',
          'L-fenilalanin — 2.5 mg',
          'L-gistidin — 1.85 mg',
          'L-leytsin — 9.15 mg',
          'L-izoleysin — 2.95 mg',
          'L-lizin — 12.5 mg',
          'L-metionin — 4.6 mg',
          'L-treonin — 2.1 mg',
          'L-triptofan — 2.5 mg',
          'Ferro-Glob suspenziyasi 200 ml PET shishada ishlab chiqariladi. BFQ, dori vositasi emas.',
          'Ishlab chiqaruvchi: ZEON BIOTECH, Vatva, Ahmedabad, Hindiston.'
        ]
      }
    ],
    leaflet_ru: [
      {
        title: '1. Что такое суспензия Ferro-Glob и для чего она применяется?',
        content: [
          'Суспензия Ferro-Glob содержит натрия фередетат, L-метилфолат, аденозилкобаламин, цинк и незаменимые аминокислоты.',
          'Предназначена для восполнения дефицита железа, витаминов и аминокислот в организме.',
          'Показания к применению: Низкий уровень гемоглобина (анемия), замедление выработки эритроцитов, дефицит фолиевой кислоты при беременности и лактации, заболевания печени, почечный диализ, упадок сил, стресс и ослабленный иммунитет.'
        ]
      },
      {
        title: '2. Что необходимо знать перед приемом?',
        content: [
          'Не принимайте Ferro-Glob, если у вас есть аллергия на активные вещества или любые другие ингредиенты.',
          'Предупреждения и меры предосторожности: При наличии сопутствующих заболеваний проконсультируйтесь с врачом. Во время беременности требуется консультация врача.',
          'Взаимодействие с другими лекарствами: Принимать отдельно от антацидов. Рекомендуется ограничить потребление кофеина, так как он снижает всасывание железа.'
        ]
      },
      {
        title: '3. Способ применения и дозы',
        content: [
          'Суспензию Ferro-Glob принимают после еды, но в отдельных случаях по рекомендации врача возможно принимать до еды.',
          'Детям (от 2 до 12 лет): по 5 мл 1-2 раза в день до еды.',
          'Взрослым: по 10 мл 2-3 раза в день до еды по рекомендации врача.',
          'Дозировка по весу: 0.5 мл/кг.'
        ]
      },
      {
        title: '4. Возможные побочные эффекты',
        content: [
          'Возможны запор, диарея, расстройство желудка, головная боль, тошнота, изменение артериального давления. При появлении побочных эффектов прекратите прием и обратитесь к врачу.'
        ]
      },
      {
        title: '5. Условия хранения',
        content: [
          'Хранить в недоступном для детей месте.',
          'Хранить при температуре ниже 25°C в сухом и защищенном от света месте.',
          'Не использовать после истечения срока годности.'
        ]
      },
      {
        title: '6. Состав и прочая информация (в каждых 10 мл)',
        content: [
          'Натрия фередетат — 231 мг (экв. 33 мг Fe)',
          'L-метилфолат — 0.5 мг',
          'Аденозилкобаламин — 50 мкг',
          'Сульфат цинка — 25 мг (экв. 10 мг Zn)',
          'L-фенилаланин — 2.5 мг',
          'L-гистидин — 1.85 мг',
          'L-лейцин — 9.15 мг',
          'L-изолейцин — 2.95 мг',
          'L-лизин — 12.5 мг',
          'L-метионин — 4.6 мг',
          'L-треонин — 2.1 мг',
          'L-триптофан — 2.5 мг',
          'Упаковка: 200 мл в PET флаконах. БАД, не является лекарственным средством.',
          'Производитель: ZEON BIOTECH, Ватва, Ахмедабад, Индия.'
        ]
      }
    ]
  },
  {
    id: 'fiziobrain-kiddrop',
    name_uz: 'Fiziobrain Kid Drop',
    name_ru: 'Fiziobrain Kid Drop',
    description_uz: 'Bolalar aqliy rivoji uchun ozuqa tomchilari. Bola miyasi faolligi va intellektual rivojlanishini qo\'llab-quvvatlaydi.',
    description_ru: 'Капли для умственного развития детей. Поддерживает активность мозга и интеллектуальное развитие ребенка.',
    composition_uz: 'Dokosaheksayen kislotasi (DHA), Biotin, D-Pantenol, L-Lizin va vitaminlar.',
    composition_ru: 'Докозагексаеновая кислота (DHA), Биотин, D-Пантенол, L-Лизин и витамины.',
    usage_uz: 'Bolalar uchun kuniga 1 ml (yoki shifokor ko\'rsatmasi bo\'yicha) tomiziladi. Qulay tomizgich (pipetka) yordamida.',
    usage_ru: 'Принимать детям по 1 мл в день (или по назначению врача) с помощью удобной пипетки.',
    category: 'Bolalar uchun',
    image: '/fiziobrain-kiddrop.jpg',
    badge: 'Uzbekistan-Indian Partnership',
    telegramlink: 'https://t.me/kamafarmhealthcare?start=fiziobrain-kiddrop',
    leaflet_uz: [
      {
        title: '1. Fiziobrain Kid Drop nima va u nima uchun ishlatiladi?',
        content: [
          'Fiziobrain Kid Drop tarkibida Dokosaheksayen kislotasi (DHA), Rux, L-Lizin va muhim multivitaminlar mavjud.',
          'DHA bolalar uchun ayniqsa muhimdir, chunki u bolaning o\'sishi va rivojlanishida asosiy rol o\'ynaydi. Fiziobrain Kid drop bolalarda ko\'rish funksiyasini, miya faoliyati rivojlanishini qo\'llab-quvvatlaydi, diqqatni jamlashni yaxshilaydi, giperaktivlikni kamaytiradi va uyquni yaxshilaydi.'
        ]
      },
      {
        title: '2. Fiziobrain Kid Dropni qabul qilishdan oldin bilish kerak bo\'lgan ma\'lumotlar',
        content: [
          'Agar bolada ushbu vositaning ingredientlaridan biriga allergiya bo\'lsa, Fiziobrain Kid Dropni qabul qilmang.',
          'Ogohlantirishlar va ehtiyot choralari: Agar bolada tibbiy holatlar mavjud bo\'lsa, qabul qilishdan oldin shifokor bilan maslahatlashing. Shifokoringizga bolaning ushbu vositaga bo\'lgan munosabati haqida xabar bering.'
        ]
      },
      {
        title: '3. Fiziobrain Kid Drop vositasiga ko\'rsatma va uni qabul qilish tartibi',
        content: [
          'Fiziobrain Kid Drop tomchisi har doim shifokor ko\'rsatmasiga binoan bolalarga beriladi.',
          'Tavsiya etilgan doza:',
          '1 yoshdan 3 yoshgacha: 1 ml dan kuniga 2-3 mahal ovqatdan so\'ng (3 oy davomida).',
          '4 yoshdan 12 yoshgacha: 1 ml dan kuniga 3-4 mahal ovqatdan so\'ng (3-4 oy davomida).',
          'Agar tasodifan yuqori doza qabul qilinsa, shifokor bilan maslahatlashing.'
        ]
      },
      {
        title: '4. Mumkin bo\'lgan nojo\'ya ta\'sirlar',
        content: [
          'Fiziobrain Kid Drop ko\'pchilik bolalar uchun xavfsizdir.',
          'Ba\'zi nojo\'ya ta\'sirlar sifatida bosh og\'rig\'i, ko\'ngil aynishi, zarda qaynashi, diareya yoki oshqozon buzilishi kuzatilishi mumkin. Bunday hollarda qabul qilishni to\'xtating va shifokoringizga xabar bering.'
        ]
      },
      {
        title: '5. Fiziobrain Kid Drop saqlash sharoiti',
        content: [
          'Bolalar qo\'li yetmaydigan joyda saqlang.',
          '25°C dan past haroratda, quruq joyda, quyosh nurlaridan himoyalangan holda saqlang.',
          'Yaroqlilik muddati tugaganidan keyin ishlatmang.'
        ]
      },
      {
        title: '6. Tarkibi va boshqa ma\'lumotlar (Har 1 ml da)',
        content: [
          'Dokosaheksayen kislotasi (10% DHA) — 2.5 mg',
          'Vitamin B1 — 0.1 mg',
          'Biotin — 2.5 mkg',
          'Vitamin D3 — 40 XB',
          'Vitamin E — 0.15 mg',
          'Vitamin A — 100 XB',
          'Vitamin B2 — 0.1 mg',
          'Vitamin B6 — 0.1 mg',
          'Vitamin C — 2 mg',
          'D-pantenol — 0.15 mg',
          'Rux sulfat — 0.25 mg (ekv. 0.1 mg Zn)',
          'Fiziobrain Kid Drop 15 ml PET shishada ishlab chiqarilgan, amber rangli shishada tomizgich (pipetka) bilan taqdim etiladi. BFQ, dori vositasi emas.'
        ]
      }
    ],
    leaflet_ru: [
      {
        title: '1. Что такое капли Fiziobrain Kid Drop и для чего они применяются?',
        content: [
          'Капли Fiziobrain Kid Drop содержат докозагексаеновую кислоту (DHA), цинк, L-лизин и мультивитамины.',
          'DHA критически важна для детей, так как играет ключевую роль в росте и умственном развитии. Препарат поддерживает функцию зрения, развитие мозговой деятельности, улучшает концентрацию внимания, снижает гиперактивность и улучшает сон ребенка.'
        ]
      },
      {
        title: '2. Что нужно знать перед приемом?',
        content: [
          'Не давайте ребенку Fiziobrain Kid Drop, если у него есть аллергия на любой из компонентов препарата.',
          'Предупреждения и меры предосторожности: При наличии заболеваний проконсультируйтесь с педиатром перед началом приема.'
        ]
      },
      {
        title: '3. Способ применения и дозы',
        content: [
          'Капли Fiziobrain Kid Drop всегда принимаются по назначению врача или согласно рекомендациям.',
          'Рекомендуемая дозировка:',
          'Детям от 1 до 3 лет: по 1 мл 2-3 раза в день после еды (курс 3 месяца).',
          'Детям от 4 до 12 лет: по 1 мл 3-4 раза в день после еды (курс 3-4 месяца).',
          'Для точного дозирования используйте пипетку из комплекта.'
        ]
      },
      {
        title: '4. Возможные побочные эффекты',
        content: [
          'Капли Fiziobrain Kid Drop безопасны для большинства детей.',
          'В редких случаях могут возникнуть головная боль, тошнота, изжога, диарея или дискомфорт в желудке. Прекратите использование при побочных эффектах.'
        ]
      },
      {
        title: '5. Условия хранения',
        content: [
          'Хранить в недоступном для детей месте.',
          'Хранить при температуре ниже 25°C в сухом месте, защищенном от солнечных лучей.',
          'Не использовать после истечения срока годности.'
        ]
      },
      {
        title: '6. Состав и прочая информация (в 1 мл)',
        content: [
          'Докозагексаеновая кислота (10% DHA) — 2.5 мг',
          'Витамин B1 — 0.1 мг',
          'Биотин — 2.5 мкг',
          'Витамин D3 — 40 МЕ',
          'Витамин E — 0.15 мг',
          'Витамин A — 100 МЕ',
          'Витамин B2 — 0.1 мг',
          'Витамин B6 — 0.1 мг',
          'Витамин C — 2 мг',
          'D-пантенол — 0.15 мг',
          'Сульфат цинка — 0.25 мг (экв. 0.1 мг цинка)',
          'Упаковка: Флакон 15 мл с удобной пипеткой. БАД, не является лекарством.'
        ]
      }
    ]
  }
,
  {
  "id": "floraslip",
  "name_uz": "Floraslip",
  "name_ru": "Флораслип",
  "description_uz": "Uyqusizlikka qarshi adaptogen vosita.",
  "description_ru": "Адаптогенное средство от бессонницы.",
  "composition_uz": "Melatonin, Valeriana ildizi ekstrakti, Glitsin.",
  "composition_ru": "Мелатонин, Экстракт корней валерианы, Глицин.",
  "usage_uz": "Uyqudan oldin qabul qilinadi.",
  "usage_ru": "Принимать перед сном.",
  "category": "Kattalar uchun",
  "image": "/floraslip.jpg",
  "badge": "Yangi",
  "telegramlink": "https://t.me/kamafarmhealthcare?start=floraslip",
  "leaflet_uz": [],
  "leaflet_ru": []
},
  {
  "id": "livolola",
  "name_uz": "Livolola",
  "name_ru": "Ливолола",
  "description_uz": "Jigar salomatligi uchun vosita.",
  "description_ru": "Средство для здоровья печени.",
  "composition_uz": "N-Asetiltsistein, Silimarin, L-Ornitin, L-Aspartat, Vitaminlar va minerallar (Mg, Fe, Zn).",
  "composition_ru": "N-Ацетилцистеин, Силимарин, L-Орнитин, L-Аспартат, Витамины и минералы (Кальций, Магний, Железо, Цинк).",
  "usage_uz": "Kattalar uchun.",
  "usage_ru": "Для взрослых.",
  "category": "Kattalar uchun",
  "image": "/livolola.jpg",
  "badge": "Yangi",
  "telegramlink": "https://t.me/kamafarmhealthcare?start=livolola",
  "leaflet_uz": [],
  "leaflet_ru": []
},
  {
  "id": "zoarapid",
  "name_uz": "ZoaRapid",
  "name_ru": "ЗоаРапид",
  "description_uz": "Erkaklar salomatligi uchun vosita.",
  "description_ru": "Средство для мужского здоровья.",
  "composition_uz": "L-Karnitin, Rux sulfat, Koferment Q10, Astaksantin, Likapin, Metilkobalamin, Natriy selenat.",
  "composition_ru": "L-Карнитин, Цинка сульфат, Кофермент Q10, Астаксантин, Ликопин, Метилкобаламин, Селенат натрия.",
  "usage_uz": "Kattalar uchun.",
  "usage_ru": "Для взрослых.",
  "category": "Kattalar uchun",
  "image": "/zoarapid.jpg",
  "badge": "Yangi",
  "telegramlink": "https://t.me/kamafarmhealthcare?start=zoarapid",
  "leaflet_uz": [],
  "leaflet_ru": []
},
  {
  "id": "nefrokulir",
  "name_uz": "Nefrokulir",
  "name_ru": "Нефроклир",
  "description_uz": "Buyraklar va siydik yo'llari sog'ligi uchun.",
  "description_ru": "Средство для почек и мочевыводящих путей.",
  "composition_uz": "O'simliklardan tayyorlangan vosita.",
  "composition_ru": "Средство растительного происхождения.",
  "usage_uz": "Kattalar uchun. 30 kapsula.",
  "usage_ru": "Для взрослых. 30 капсул.",
  "category": "Kattalar uchun",
  "image": "/nefrokulir.jpg",
  "badge": "Yangi",
  "telegramlink": "https://t.me/kamafarmhealthcare?start=nefrokulir",
  "leaflet_uz": [
    {
        "title": "Chiqarish shakli va tarkibi",
        "content": [
            "Chiqarish shakli: kapsulalar, planshetlar 600, 1000 mg.",
            "1 kapsulaning tarkibi:",
            "Dorixona levisti ildizi ekstrakti - 100 mg",
            "Oddiy tillabosh o'ti ekstrakti - 100 mg",
            "Rozmarin barglari ekstrakti - 100 mg",
            "Dala qirqbo'g'imi quruq ekstrakti - 15 mg"
        ]
    },
    {
        "title": "Xususiyatlari",
        "content": [
            "O'simliklardan tayyorlangan buyrak va siydik yo'llari kasalliklari tuzalishiga yordam beradigan vosita. Preparat spazmga, yallig'lanishga qarshi va antimikrobiyal ta'sirga ega bo'lib, yengil diuretik va tuzlarni eritish xususiyati bor.",
            "Dorixona levisti ildizi ekstrakti – antispazmodik, diuretik va antibakterial ta'sirga ega.",
            "Oddiy tillabosh o'ti ekstrakti - ishtahani oshiradi, me'da shirasining sekretsiyasini oshiradi, oshqozon-ichak motorikasini tezlashtiradi, yengil laksatif va antigelmintik ta'sirga ega.",
            "Rozmarin barglari ekstrakti - yallig'lanishga qarshi, diuretik, antispazmodik va antibakterial ta'sirga ega.",
            "Dala qirqbo'g'imi ekstrakti - diuretik va yallig'lanishga qarshi ta'sirga ega. Ushbu vositaning terapevtik ta'siri qabul qilishning birinchi kunidan boshlab namoyon bo'ladi va butun davolanish davrida kuzatiladi."
        ]
    },
    {
        "title": "Foydalanish uchun ko'rsatmalar",
        "content": [
            "Nefroklir biologik faol oziq-ovqat qo'shimchasi o'simlik tarkibiy qismlarining biologik ta'sirining kombinatsiyasi birinchi navbatda siydik hosil bo'lishi va chiqarilishining fiziologik jarayonlarining yaxshilanishi bilan tavsiflanadi.",
            "Bundan tashqari, ular immunitet tizimini mustahkamlash, siydik yo'llarida mikroblarsiz muhitni saqlash, yallig'lanish va spastik jarayonlarni rivojlanish xavfini kamaytirish kabi tananing boshqa turli muhim funktsiyalarini metabolizm va regulatsiyada ham ishtirok etadi; turli tuzlar va MKD hosil bo'lish xavfini kamaytiradi.",
            "Mahsulotning faol komponentlari, shuningdek, qon tomirlari devorlarining metabolizmini, ularning mustahkamligi va elastikligini yaxshilashga yordam beradi. Qon tomirlarining tonusini yaxshilash qon aylanishini va organlarning funktsional faoliyatini faollashtirishga yordam beradi.",
            "Nefroklir tarkibidagi boy vitamin kompleksi ishtahani va umumiy faoliyatni yaxshilaydi, tananing sovuqqa chidamliligini oshiradi, charchoqni yo'q qiladi va siydik yo'llarining yallig'lanish kasalliklarini rivojlanish xavfini kamaytiradi."
        ]
    },
    {
        "title": "Tavsiya etiladi",
        "content": [
            "Kattalar va 12 yoshdan oshgan bolalar: 1 kapsuladan (tabletka) kuniga 2 marta, ovqatdan oldin yoki ovqat vaqtida qabul qilinadi. Davolashning davomiyligi - 1 oy."
        ]
    },
    {
        "title": "Qo'llash mumkin bo'lmagan holatlar va Maxsus ko'rsatmalar",
        "content": [
            "Qo'llash mumkin bo'lmagan holatlar: tarkibiy qismlarga individual yuqori sezuvchanlik.",
            "Maxsus ko'rsatmalar: Biologik faol oziq-ovqat qo'shimchasi. Dori vositasi emas. Ishlatishdan oldin mutaxassis bilan maslahatlashish talab etiladi.",
            "Homilador, emizikli ayollar va 12 yoshgacha bo'lgan bolalarga faqat shifokor ko'rsatmasi bo'yicha tavsiya etiladi.",
            "Quruq, salqin, quyosh nurlaridan himoyalangan, bolalar qo'li etmaydigan joyda saqlang. Yaroqlilik muddati: 3 yil.",
            "Ishlab chiqaruvchi: MChJ \"Kamafarm Healthcare\" Uzbekistan"
        ]
    }
],
  "leaflet_ru": [
    {
        "title": "Форма выпуска и Состав",
        "content": [
            "Форма выпуска: капсулы, таблетки 600, 1000 мг.",
            "Состав 1 таблетки:",
            "Экстракт любистока лекарственного корни - 100 мг",
            "Экстракт золототысячника трава - 100 мг",
            "Экстракт розмарина обыкновенного листья - 100 мг",
            "Сухой экстракт хвоща полевого - 15 мг"
        ]
    },
    {
        "title": "Свойства",
        "content": [
            "Диуретическое средство растительного происхождения. Препарат оказывает мочегонное, спазмолитическое, противовоспалительное, противомикробное действие.",
            "Экстракт любистока лекарственного корни - оказывает диуретическое, спазмолитическое и антибактериальное действие.",
            "Экстракт золототысячника трава - повышает аппетит, повышает секрецию желудочного сока, ускоряет моторику ЖКТ, оказывает легкое слабительное и противогельминтное действие.",
            "Экстракт розмарина обыкновенного листья - оказывает противовоспалительное, диуретическое, спазмолитическое и антибактериальное действие.",
            "Сухой экстракт хвоща полевого - оказывает диуретическое и противовоспалительное действие. Лечебное действие проявляется уже с первого дня приема и наблюдается в течение всего периода лечения."
        ]
    },
    {
        "title": "Показания к применению",
        "content": [
            "Сочетание биологических эффектов растительных компонентов в биодобавке к пище Нефроклир характеризуется преимущественно улучшением физиологических процессов мочеобразования и мочевыделения.",
            "Кроме того, они также участвуют в метаболизме и регуляции различных других важных функций организма, таких как укрепление иммунитета, сохранение в мочевых путях без микробной среды и снижение риска развития воспалительных и спастических процессов; уменьшает риск образование различных солей и МКД.",
            "Активные компоненты продукции способствуют также улучшению обмена веществ стенок кровеносных сосудов, их прочности и эластичности. Улучшение сосудистого тонуса способствует активации кровообращения и функциональной активности органов.",
            "Богатый витаминный комплекс в составе Нефроклир улучшает аппетит и общее самочувствие, повышает устойчивость организма к простудным процессам, устраняет утомляемость, уменьшает риск развития воспалительных заболеваний мочевыводящих путей."
        ]
    },
    {
        "title": "Рекомендуется",
        "content": [
            "Взрослым и детям старше 12 лет по 1 капсуле (таблеток) 2 раза в сутки, вовремя или до еды. Продолжительность приема - 1 месяц."
        ]
    },
    {
        "title": "Противопоказания и Особые указания",
        "content": [
            "Противопоказание: индивидуальная непереносимость компонентов.",
            "Особые указания: Биологически активная добавка к пище. Не является лекарственным средством. Перед применением требуется консультация специалиста.",
            "Беременным, кормящим женщинам и детям до 12 лет рекомендуется только по назначению врача.",
            "Хранить в сухом, прохладном, защищенном от солнечных лучей, недоступном для детей месте. Срок годности: 2 года.",
            "Производитель: ООО “Kamafarm Healthcare” Узбекистан"
        ]
    }
]
}
];
