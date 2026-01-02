import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function Contact() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    inquiryType: "Cake Order",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (location.state?.fromProduct) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in customizing the ${location.state.productName}... `,
      }));
    }
  }, [location]);

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const phoneNumber = "2348156686247";
    const text = `Hello Miwa! %0A%0A*New Website Inquiry*%0A*Name:* ${formData.name}%0A*Type:* ${formData.inquiryType}%0A*Date/Timeframe:* ${formData.date}%0A*Message:* ${formData.message}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-brand-rose mb-4">
            Let's Connect
          </h1>
          <p className="text-brand-dark/70 max-w-xl mx-auto">
            Whether you want to order a cake, book a surprise package, or join
            our professional baking masterclass, we are here for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-pink">
              <h2 className="text-2xl font-display text-brand-dark mb-6">
                Contact Details
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-brand-rose shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call/WhatsApp</p>
                    <p className="font-bold text-brand-dark">
                      +234 815 668 6247
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-brand-rose shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-bold text-brand-dark">
                      Ogbomosho, Oyo, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-rose p-8 rounded-3xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={32} />
                <h2 className="text-2xl font-display">Baking Training</h2>
              </div>
              <p className="opacity-90 mb-6">
                Ready to bake like a pro? We offer 1-on-1 and group classes for
                beginners and advanced bakers.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ Fundamental Baking Techniques</li>
                <li>✓ Luxury Cake Decoration</li>
                <li>✓ Business of Baking Coaching</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-pink">
            <h3 className="text-xl font-display mb-6 text-brand-dark flex items-center gap-2">
              <HelpCircle className="text-brand-rose" /> Send an Inquiry
            </h3>
            <form onSubmit={handleWhatsApp} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  className="w-full p-4 rounded-xl border border-brand-pink focus:outline-none focus:border-brand-rose"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  Inquiry For?
                </label>
                <select
                  value={formData.inquiryType}
                  className="w-full p-4 rounded-xl border border-brand-pink focus:outline-none focus:border-brand-rose"
                  onChange={(e) =>
                    setFormData({ ...formData, inquiryType: e.target.value })
                  }
                >
                  <option>Cake Order</option>
                  <option>Surprise Package</option>
                  <option>Professional Training</option>
                  <option>Bulk Treats Order</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  {formData.inquiryType === "Professional Training"
                    ? "Preferred Start Month"
                    : "Event Date"}
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  className="w-full p-4 rounded-xl border border-brand-pink focus:outline-none focus:border-brand-rose"
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  placeholder="Tell us more details..."
                  className="w-full p-4 rounded-xl border border-brand-pink focus:outline-none focus:border-brand-rose"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-rose text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg"
              >
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
