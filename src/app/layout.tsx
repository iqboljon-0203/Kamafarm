import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kamafarm.uz'),
  title: {
    default: 'Kamafarm Healthcare — Premium Vitaminlar va Ozuqaviy Qo\'shimchalar',
    template: '%s | Kamafarm Healthcare',
  },
  description:
    'Kamafarm Healthcare — premium klassdagi tabiiy vitaminlar va biologik faol qo\'shimchalar ishlab chiqaruvchi O\'zbekiston-Hindiston hamkorligi asosidagi kompaniya. GMP sertifikatlangan mahsulotlar.',
  keywords: 'kamafarm, healthcare, vitamin, BAA, biologik qo\'shimcha, DHA, fiziobrain, ferro-glob, samarqand, uzbekiston',
  authors: [{ name: 'Kamafarm Healthcare' }],
  creator: 'Kamafarm Healthcare',
  publisher: 'Kamafarm Healthcare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Kamafarm Healthcare — Premium Vitaminlar',
    description: 'Kamafarm Healthcare — premium klassdagi tabiiy vitaminlar va biologik faol qo\'shimchalar ishlab chiqaruvchi kompaniya. GMP sertifikatlangan.',
    url: 'https://kamafarm.uz',
    siteName: 'Kamafarm Healthcare',
    images: [
      {
        url: '/hero-product.png',
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
    images: ['/hero-product.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Kamafarm Healthcare',
  url: 'https://kamafarm.uz',
  logo: 'https://kamafarm.uz/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+998-90-603-14-28',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
