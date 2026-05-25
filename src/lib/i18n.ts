// lib/i18n.ts
export type Language = 'uz' | 'ru';

export const translations = {
  uz: {
    nav: {
      about: 'Kompaniya haqida',
      mission: 'Maqsadimiz',
      products: 'Mahsulotlar',
      b2b: 'B2B Hamkorlik',
      faq: 'FAQ',
      contacts: 'Kontaktlar',
      phone: '+998 (90) 603-14-28',
    },
    hero: {
      heading1: 'Salomatlik —',
      heading2: 'tabiat va ilm-fan',
      heading3: 'uyg\'unligida.',
      subtitle:
        'Kamafarm — premium klassdagi tabiiy vitaminlar va ozuqaviy qo\'shimchalar ishlab chiqaruvchi ishonchli hamkoringiz.',
      cta1: 'Katalogni ko\'rish',
      cta2: 'Konsultatsiya olish',
    },
    about: {
      sectionLabel: 'Biz haqimizda',
      heading: 'Kamafarm Healthcare',
      description:
        'Kamafarm Healthcare - bu farmatsevtika sohasida faoliyat yuritadigan yosh va dinamik rivojlanayotgan kompaniya. Biz biologik faol qo\'shimchalarni (BAA) ishlab chiqarish va ulgurji savdosi bilan shug\'ullanamiz, shuningdek, farmatsevtik vositalarning to\'g\'ri qabul qilinishini ommaga targ\'ub qilamiz. Kompaniya farmatsevtik sohada ko\'plab tajribaga ega bo\'lgan yuqori malakali mutaxassislar jamoasi tomonidan tashkil etildi.',
      stats: [
        { value: '1200+', label: 'Mamnun mijozlar' },
        { value: '50+', label: 'Premium mahsulotlar' },
        { value: '5 yil', label: 'Kafolatlangan sifat' },
      ],
      values: [
        {
          title: 'Sifat kafolati',
          description: 'Har bir mahsulot xalqaro GMP standartlariga to\'liq mos keladi.',
        },
        {
          title: 'Tabiiy tarkib',
          description: 'Faqat tabiatning eng yaxshi ingredientlaridan foydalanamiz.',
        },
        {
          title: 'Ishonchli hamkor',
          description: '5 yillik tajriba va minglab mamnun mijozlar bilan.',
        },
      ],
    },
    mission: {
      label: 'Bizning maqsadimiz',
      heading: 'Bizning maqsadimiz',
      text:
        'Bizning maqsadimiz - aholining sog\'lig\'ini yaxshilash emas, balki har bir inson uchun uzun va xursand hayot uchun sharoitlar yaratishdir. Biz bu maqsadga hamkorlik qilishimiz bilan erishishimiz mumkin va dunyoni sog\'lik va xursand joyga aylantirishimiz mumkin.',
      stats: [
        { value: '5+', label: 'Yil tajriba' },
        { value: '3', label: 'Davlat' },
        { value: 'GMP', label: 'Sertifikat' },
      ],
    },
    products: {
      sectionLabel: 'Mahsulotlar katalogi',
      heading: 'Bizning mahsulotlarimiz',
      subtitle: 'Barcha mahsulotlar xalqaro sifat standartlariga mos va sertifikatlangan.',
      filters: ['Barchasi', 'Miya faoliyati', 'Kamqonlik', 'Bolalar uchun', 'Kattalar uchun'],
      badge: 'Uzbekistan-Indian Partnership',
      detailsBtn: 'Batafsil',
      orderBtn: 'Telegram\'da buyurtma',
      closeBtn: 'Yopish',
      compositionLabel: 'Tarkibi',
      usageLabel: 'Qo\'llash usuli',
      searchPlaceholder: 'Mahsulot qidirish...',
    },
    certificates: {
      sectionLabel: 'Sifat va sertifikatlar',
      heading: 'Xalqaro standartlar',
      subtitle: 'Barcha mahsulotlarimiz xalqaro va milliy sifat sertifikatlariga ega.',
    },
    b2b: {
      sectionLabel: 'B2B Hamkorlik',
      heading: 'Biznes hamkorlik',
      subtitle: 'Ulgurji narxlar va maxsus hamkorlik shartlari bilan ishlang.',
      benefits: [
        { title: 'Ulgurji narxlar', description: 'Hajmga qarab maxsus chegirmalar va narxlar.' },
        {
          title: 'Yetkazib berish',
          description: "O'zbekiston bo'ylab tez va ishonchli logistika xizmati.",
        },
        {
          title: 'Marketing yordami',
          description: 'Brend materiallari va marketing qo\'llab-quvvatlash.',
        },
        {
          title: 'Eksklyuziv shartlar',
          description: 'Doimiy hamkorlar uchun maxsus imtiyozlar va bonuslar.',
        },
      ],
      form: {
        heading: 'Hamkorlik arizasi',
        namePlaceholder: 'Ismingiz',
        companyPlaceholder: 'Kompaniya / Dorixona nomi',
        phonePlaceholder: 'Telefon raqamingiz',
        submitBtn: 'Hamkorlik arizasini yuborish',
        successMsg: 'Arizangiz muvaffaqiyatli yuborildi! Tez orada aloqaga chiqamiz.',
        errorMsg: 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
      },
    },
    distribution: {
      sectionLabel: 'Distribyutsiya',
      heading: 'Bizni qayerdan topish mumkin?',
      subtitle:
        'Respublika bo\'ylab ishonchli hamkor dorixonalar va distribyutorlar orqali mahsulotlarimizni toping.',
      partners: 'Hamkor dorixonalar',
      mapTitle: 'Samarqand, Zarafshon ko\'chasi',
    },
    faq: {
      sectionLabel: 'Ko\'p so\'raladigan savollar',
      heading: 'FAQ',
      items: [
        {
          q: 'Vitaminlarni qanday buyurtma qilsa bo\'ladi?',
          a: "Saytda ariza qoldirishingiz yoki to'g'ridan-to'g'ri Telegram botimiz orqali aloqaga chiqishingiz mumkin.",
        },
        {
          q: 'Mahsulotlar to\'liq sertifikatlanganmi?',
          a: "Ha, barcha mahsulotlar tegishli xalqaro GMP va milliy vazirlik litsenziyalariga ega.",
        },
        {
          q: 'Minimal buyurtma hajmi qancha?',
          a: "Chakana buyurtma uchun minimal talab yo'q. B2B hamkorlik uchun minimal miqdorlar alohida kelishiladi.",
        },
        {
          q: 'Mahsulotlar qachon yetkazib beriladi?',
          a: "Samarqand shahrida 1-2 ish kuni ichida. Boshqa viloyatlarga 3-5 ish kuni ichida yetkaziladi.",
        },
        {
          q: 'Mahsulotlar bolalarga xavfsizmi?',
          a: "Bolalar uchun mo'ljallangan mahsulotlar maxsus klinik tadqiqotlardan o'tgan va xavfsizdir. Ammo shifokor maslahati tavsiya etiladi.",
        },
        {
          q: 'Qaytarish imkoniyati bormi?',
          a: "Mahsulot qadoqlangan holda va muddati o'tmagan bo'lsa, 14 kun ichida qaytarish mumkin.",
        },
      ],
    },
    instagram: {
      sectionLabel: 'Ijtimoiy tarmoqlar',
      heading: 'Bizni kuzating',
      handle: '@kamafarm.healthcare',
      viewPost: 'Postni ko\'rish',
    },
    footer: {
      about:
        "Premium sifatli biologik faol qo'shimchalar ishlab chiqaruvchi va distribyutori. O'zbekiston-Hindiston hamkorligi.",
      quickLinks: 'Tezkor havolalar',
      links: [
        { label: 'Katalogni yuklash', href: '#products' },
        { label: 'Hamkorlik', href: '#b2b' },
        { label: 'Biz haqimizda', href: '#about' },
        { label: 'Sertifikatlar', href: '#certificates' },
      ],
      contacts: 'Kontaktlar',
      address: 'г. Самарканд, ул. Зарафшон, мсг Казиарик',
      phones: ['+998 (90) 603-14-28', '+998 (93) 720-55-56'],
      copyright: '© 2026 Kamafarm Healthcare. Barcha huquqlar himoyalangan.',
      social: {
        instagram: 'Instagram',
        telegram: 'Telegram',
        channel: 'Kanal',
        facebook: 'Facebook',
      },
    },
  },
  ru: {
    nav: {
      about: 'О компании',
      mission: 'Наша миссия',
      products: 'Продукты',
      b2b: 'B2B Партнёрство',
      faq: 'FAQ',
      contacts: 'Контакты',
      phone: '+998 (90) 603-14-28',
    },
    hero: {
      heading1: 'Здоровье —',
      heading2: 'в гармонии природы',
      heading3: 'и науки.',
      subtitle:
        'Kamafarm — ваш надёжный партнёр по производству натуральных витаминов и пищевых добавок премиум-класса.',
      cta1: 'Смотреть каталог',
      cta2: 'Получить консультацию',
    },
    about: {
      sectionLabel: 'О нас',
      heading: 'Kamafarm Healthcare',
      description:
        'Kamafarm Healthcare — молодая и динамично развивающаяся компания в сфере фармацевтики. Мы занимаемся производством и оптовой продажей биологически активных добавок (БАД), а также продвигаем культуру правильного приёма фармацевтических средств. Компания основана командой высококвалифицированных специалистов с большим опытом в фармацевтической отрасли.',
      stats: [
        { value: '1200+', label: 'Довольных клиентов' },
        { value: '50+', label: 'Премиум продуктов' },
        { value: '5 лет', label: 'Гарантия качества' },
      ],
      values: [
        {
          title: 'Гарантия качества',
          description: 'Каждый продукт полностью соответствует международным стандартам GMP.',
        },
        {
          title: 'Натуральный состав',
          description: 'Используем только лучшие ингредиенты от природы.',
        },
        {
          title: 'Надёжный партнёр',
          description: '5 лет опыта и тысячи довольных клиентов.',
        },
      ],
    },
    mission: {
      label: 'Наша миссия',
      heading: 'Наша миссия',
      text:
        'Наша цель — не просто улучшить здоровье населения, а создать условия для долгой и счастливой жизни каждого человека. Мы можем достичь этой цели вместе и сделать мир более здоровым и счастливым местом.',
      stats: [
        { value: '5+', label: 'Лет опыта' },
        { value: '3', label: 'Страны' },
        { value: 'GMP', label: 'Сертификат' },
      ],
    },
    products: {
      sectionLabel: 'Каталог продуктов',
      heading: 'Наши продукты',
      subtitle: 'Все продукты соответствуют международным стандартам качества и сертифицированы.',
      filters: ['Все', 'Мозговая деятельность', 'Анемия', 'Для детей', 'Для взрослых'],
      badge: 'Uzbekistan-Indian Partnership',
      detailsBtn: 'Подробнее',
      orderBtn: 'Заказать в Telegram',
      closeBtn: 'Закрыть',
      compositionLabel: 'Состав',
      usageLabel: 'Способ применения',
      searchPlaceholder: 'Поиск продуктов...',
    },
    certificates: {
      sectionLabel: 'Качество и сертификаты',
      heading: 'Международные стандарты',
      subtitle: 'Все наши продукты имеют международные и национальные сертификаты качества.',
    },
    b2b: {
      sectionLabel: 'B2B Партнёрство',
      heading: 'Деловое партнёрство',
      subtitle: 'Работайте с нами по оптовым ценам и специальным условиям.',
      benefits: [
        {
          title: 'Оптовые цены',
          description: 'Специальные скидки и цены в зависимости от объёма.',
        },
        {
          title: 'Доставка',
          description: 'Быстрая и надёжная логистика по всему Узбекистану.',
        },
        {
          title: 'Маркетинговая поддержка',
          description: 'Брендовые материалы и маркетинговая поддержка.',
        },
        {
          title: 'Эксклюзивные условия',
          description: 'Специальные привилегии и бонусы для постоянных партнёров.',
        },
      ],
      form: {
        heading: 'Заявка на партнёрство',
        namePlaceholder: 'Ваше имя',
        companyPlaceholder: 'Компания / Аптека',
        phonePlaceholder: 'Номер телефона',
        submitBtn: 'Отправить заявку на партнёрство',
        successMsg: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        errorMsg: 'Произошла ошибка. Пожалуйста, попробуйте ещё раз.',
      },
    },
    distribution: {
      sectionLabel: 'Дистрибуция',
      heading: 'Где нас найти?',
      subtitle:
        'Найдите наши продукты через надёжных партнёров-аптек и дистрибьюторов по всей республике.',
      partners: 'Аптеки-партнёры',
      mapTitle: 'Самарканд, ул. Зарафшон',
    },
    faq: {
      sectionLabel: 'Часто задаваемые вопросы',
      heading: 'FAQ',
      items: [
        {
          q: 'Как заказать витамины?',
          a: 'Вы можете оставить заявку на сайте или напрямую связаться через наш Telegram-бот.',
        },
        {
          q: 'Все ли продукты сертифицированы?',
          a: 'Да, все продукты имеют соответствующие международные лицензии GMP и национальные лицензии министерства.',
        },
        {
          q: 'Каков минимальный объём заказа?',
          a: 'Для розничного заказа минимальных требований нет. Для B2B-партнёрства минимальные объёмы согласовываются отдельно.',
        },
        {
          q: 'Когда доставят продукты?',
          a: 'В г. Самарканд — в течение 1-2 рабочих дней. В другие регионы — в течение 3-5 рабочих дней.',
        },
        {
          q: 'Безопасны ли продукты для детей?',
          a: 'Продукты для детей прошли специальные клинические испытания и безопасны. Однако рекомендуется консультация врача.',
        },
        {
          q: 'Возможен ли возврат?',
          a: 'Если товар в упаковке и срок не истёк, возврат возможен в течение 14 дней.',
        },
      ],
    },
    instagram: {
      sectionLabel: 'Социальные сети',
      heading: 'Следите за нами',
      handle: '@kamafarm.healthcare',
      viewPost: 'Смотреть пост',
    },
    footer: {
      about:
        'Производитель и дистрибьютор биологически активных добавок премиум-класса. Узбекско-индийское партнёрство.',
      quickLinks: 'Быстрые ссылки',
      links: [
        { label: 'Скачать каталог', href: '#products' },
        { label: 'Партнёрство', href: '#b2b' },
        { label: 'О нас', href: '#about' },
        { label: 'Сертификаты', href: '#certificates' },
      ],
      contacts: 'Контакты',
      address: 'г. Самарканд, ул. Зарафшон, мсг Казиарик',
      phones: ['+998 (90) 603-14-28', '+998 (93) 720-55-56'],
      copyright: '© 2026 Kamafarm Healthcare. Все права защищены.',
      social: {
        instagram: 'Instagram',
        telegram: 'Telegram',
        channel: 'Канал',
        facebook: 'Facebook',
      },
    },
  },
};

export type TranslationKey = typeof translations.uz;
