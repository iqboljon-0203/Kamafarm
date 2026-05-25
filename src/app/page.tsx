import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import PartnersSection from '@/components/sections/PartnersSection';
import AboutSection from '@/components/sections/AboutSection';
import MissionSection from '@/components/sections/MissionSection';
import ProductCatalog from '@/components/sections/ProductCatalog';
import CertificatesSection from '@/components/sections/CertificatesSection';
import B2BSection from '@/components/sections/B2BSection';
import DistributionSection from '@/components/sections/DistributionSection';
import FAQSection from '@/components/sections/FAQSection';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <MissionSection />
      <ProductCatalog />
      <CertificatesSection />
      <B2BSection />
      <DistributionSection />
      <FAQSection />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
