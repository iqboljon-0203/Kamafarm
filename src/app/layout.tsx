import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ui/ScrollToTop';
import VisitTracker from '@/components/ui/VisitTracker';

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamafarm.uz'),
  title: {
    default: 'Kamafarm Healthcare — Premium Vitaminlar va BAA',
    template: '%s | Kamafarm Healthcare',
  },
  description: 'Kamafarm Healthcare — premium klassdagi tabiiy vitaminlar va biologik faol qo\'shimchalar ishlab chiqaruvchi kompaniya. GMP sertifikatlangan, ishonchli va xavfsiz mahsulotlar.',
  keywords: ['Kamafarm', 'Kamafarm Healthcare', 'vitaminlar', 'biologik faol qo\'shimchalar', 'BAA', 'DHA', 'Fiziobrain', 'Ferro-Glob', 'bolalar vitaminlari', 'Samarqand', 'O\'zbekiston'],
  authors: [{ name: 'Kamafarm Healthcare', url: 'https://kamafarm.uz' }],
  creator: 'Kamafarm Healthcare',
  publisher: 'Kamafarm Healthcare',
  alternates: {
    canonical: '/',
    languages: {
      'uz-UZ': '/uz',
      'ru-RU': '/ru',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Kamafarm Healthcare — Premium Vitaminlar',
    description: 'Tabiiy vitaminlar va biologik faol qo\'shimchalar ishlab chiqaruvchi kompaniya. O\'zbekiston-Hindiston hamkorligi.',
    url: 'https://kamafarm.uz',
    siteName: 'Kamafarm Healthcare',
    images: [
      {
        url: '/hero-product-new.png',
        width: 1200,
        height: 630,
        alt: 'Kamafarm Healthcare Premium Products',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kamafarm Healthcare — Premium Vitaminlar',
    description: 'O\'zbekiston-Hindiston hamkorligi asosidagi premium tabiiy vitaminlar ishlab chiqaruvchi kompaniya.',
    images: ['/hero-product-new.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'health',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': 'https://kamafarm.uz/#organization',
      name: 'Kamafarm Healthcare',
      url: 'https://kamafarm.uz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kamafarm.uz/logo-v2.png'
      },
      description: 'Premium klassdagi tabiiy vitaminlar va biologik faol qo\'shimchalar ishlab chiqaruvchi O\'zbekiston-Hindiston hamkorligi.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+998906031428',
        contactType: 'customer service',
        areaServed: 'UZ',
        availableLanguage: ['Uzbek', 'Russian']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Zarafshon ko\'chasi, Qozio\'riq MFY',
        addressLocality: 'Samarqand',
        addressCountry: 'UZ'
      },
      sameAs: [
        'https://www.instagram.com/kamafarm.healthcare/'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kamafarm.uz/#website',
      url: 'https://kamafarm.uz',
      name: 'Kamafarm Healthcare',
      publisher: {
        '@id': 'https://kamafarm.uz/#organization'
      },
      inLanguage: 'uz-UZ'
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning className={`${inter.variable} ${inter.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <VisitTracker />
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
