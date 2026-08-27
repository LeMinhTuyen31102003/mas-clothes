import { CountdownBanner } from "@/components/countdown-banner";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ComboPricing } from "@/components/combo-pricing";
import { ProductGallery } from "@/components/product-gallery";
import { TrustBadges } from "@/components/trust-badges";
import { SizeGuide } from "@/components/size-guide";
import { OrderForm } from "@/components/order-form";
import { StickyCta } from "@/components/sticky-cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-paper">
      <CountdownBanner />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ComboPricing />
        <ProductGallery />
        <TrustBadges />
        <SizeGuide />
        <OrderForm />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
