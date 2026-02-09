import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Gift, Coffee } from "lucide-react";
import Review from "../components/cards/Review";
// import heroImage from "../../public/images/hero2.jpg";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-20 bg-brand-pink/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-display text-brand-dark leading-tight mb-6">
              Making your moments{" "}
              <span className="text-brand-rose italic">sweeter.</span>
            </h1>
            <p className="text-lg text-brand-dark/70 mb-8 max-w-lg">
              From luxury celebration cakes to nice treats and surprise
              packages, we bring premium treats straight to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/treats"
                className="bg-brand-rose text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors shadow-lg"
              >
                Browse Menu <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-brand-rose text-brand-rose px-8 py-4 rounded-full font-bold hover:bg-brand-rose hover:text-white transition-all"
              >
                Custom Orders
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[400px] md:h-[600px] bg-brand-rose/10 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img
  src="/images/hero2.jpg"
  alt="Signature Miwa Cake"
  className="w-full h-full object-cover"
/>

            </div>

            <div className="absolute -bottom-6 -left-10 bg-brand-gold text-white p-6 rounded-2xl hidden md:block shadow-xl">
              <p className="font-display text-2xl">100% Fresh</p>
              <p className="text-sm opacity-90">
                Baked daily in <br />
                Ogbomosho
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display text-brand-dark mb-16">
            What We Do Best
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center p-8 rounded-3xl bg-brand-cream hover:shadow-xl transition-shadow border border-brand-pink">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Utensils className="text-brand-rose w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display mb-4">Cakes & Treats</h3>
              <p className="text-brand-dark/60 leading-relaxed">
                Delicious slices, parfaits, and whole cakes tailored for
                birthdays and anniversaries.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-3xl bg-brand-cream hover:shadow-xl transition-shadow border border-brand-pink">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Coffee className="text-brand-rose w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display mb-4">Zobo & Yogurt</h3>
              <p className="text-brand-dark/60 leading-relaxed">
                Naturally brewed Zobo and thick, creamy yogurt to keep you
                refreshed.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-3xl bg-brand-cream hover:shadow-xl transition-shadow border border-brand-pink">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Gift className="text-brand-rose w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display mb-4">Surprise Packages</h3>
              <p className="text-brand-dark/60 leading-relaxed">
                Complete gift boxes curated to make your loved ones feel truly
                special.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Review />
    </div>
  );
}
