import React from 'react';
import { ShieldAlert, Truck, Timer, BadgeCheck, Store } from 'lucide-react';

export default function TermsAndConditions() {
  const policies = [
    {
      icon: <BadgeCheck className="text-brand-rose" />,
      title: "Order Validation",
      text: "Only full payment validates your order. We do not start production on orders without a confirmed payment proof."
    },
    {
      icon: <ShieldAlert className="text-brand-rose" />,
      title: "Refund Policy",
      text: "We have a strict NO REFUND policy. Once ingredients are sourced and production begins, payments are non-refundable."
    },
    {
      icon: <Store className="text-brand-rose" />,
      title: "Store Pickup",
      text: "There is no 'meet-up' point. Customers are required to come directly to the store address provided for all pickups."
    },
    {
      icon: <Truck className="text-brand-rose" />,
      title: "Delivery Logistics",
      text: "Delivery is not free. For celebration cakes (like Bento cakes), the fee covers a round trip (to and fro) as a dedicated handler must accompany the delicate cake."
    },
    {
      icon: <Timer className="text-brand-rose" />,
      title: "Order Changes",
      text: "Please double-check your delivery/pickup date, time, and cake details before sealing the deal. Changes requested less than 48 hours to delivery may not be possible."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-cream/10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-brand-dark mb-4 uppercase tracking-wider">
            Terms & <span className="text-brand-rose">Conditions</span>
          </h1>
          <p className="text-gray-500 italic">Please read our store policies carefully before placing your order.</p>
        </div>

        <div className="grid gap-6">
          {policies.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-brand-pink/20 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Warning Box */}
        <div className="mt-12 p-8 bg-brand-dark rounded-[40px] text-white">
          <h2 className="text-2xl font-display mb-4 text-brand-rose uppercase">Safety & Care Notice</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            Miwa Cakes & Treats is not liable for any damage that occurs to the cake once it has been picked up by the customer or a third-party rider. We strongly recommend AC-equipped transport for all celebration cakes. 
            <br /><br />
            By proceeding with your payment, you agree to all the terms listed above.
          </p>
        </div>

      </div>
    </div>
  );
}