import React from 'react';
import { ShieldCheck, Truck, Store, CreditCard, AlertTriangle } from 'lucide-react';

export default function PrivacyandPolicy() {
  const sections = [
    {
      icon: <CreditCard className="text-brand-rose" />,
      title: "Payments & Validation",
      content: "Only full payment validates an order. We do not begin production until payment proof has been verified. Once payment is made, the deal is considered sealed."
    },
    {
      icon: <AlertTriangle className="text-brand-rose" />,
      title: "Refund Policy",
      content: "We operate a strict NO REFUND policy. Please ensure you are 100% certain of your order before making a payment."
    },
    {
      icon: <Store className="text-brand-rose" />,
      title: "Store Pickup",
      content: "There is no 'meet-up' service. Customers choosing pickup must come directly to the provided store address. Store hours must be respected."
    },
    {
      icon: <Truck className="text-brand-rose" />,
      title: "Delivery Policy",
      content: "Delivery is not free. For covered cakes (like Bento cakes), delivery fees cover a round-trip (to and fro) as a handler must travel with the cake to ensure its safety."
    },
    {
      icon: <ShieldCheck className="text-brand-rose" />,
      title: "Damage Liability",
      content: "Miwa Cakes & Treats is NOT liable for any damage that occurs after the cake leaves our premises, whether via customer pickup or third-party riders."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-cream/10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display text-brand-dark mb-4 uppercase tracking-tighter">
            Store <span className="text-brand-rose">Policies</span>
          </h1>
          <div className="w-20 h-1 bg-brand-rose mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[35px] shadow-sm border border-brand-pink/20 flex gap-6 items-start">
              <div className="bg-brand-pink/10 p-4 rounded-2xl shrink-0">
                {s.icon}
              </div>
              <div>
                <h3 className="font-bold text-brand-dark text-lg uppercase mb-2">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{s.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm italic">
          Last Updated: December 2025. By ordering, you agree to these terms.
        </div>
      </div>
    </div>
  );
}