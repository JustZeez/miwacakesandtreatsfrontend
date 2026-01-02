import React from "react";
import { Star, Quote, MessageCircle } from "lucide-react";
import { reviews } from "../../data/reviews";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Review() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-brand-cream/20 to-white px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-rose font-bold tracking-widest uppercase text-sm"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display text-brand-dark mt-2 mb-4">
            Love Letters from{" "}
            <span className="text-brand-rose">Our Clients</span>
          </h2>
          <div className="flex justify-center gap-1 text-brand-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="currentColor" size={20} />
            ))}
          </div>
          <p className="mt-4 text-brand-dark/60 italic font-medium">
            Over 500+ happy celebrations served across the city.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid bg-white p-8 rounded-3xl shadow-sm border border-brand-pink/30 relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <Quote
                className="absolute top-6 right-8 text-brand-pink/20 group-hover:text-brand-pink transition-colors"
                size={32}
              />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-brand-pink overflow-hidden border-2 border-brand-rose/20">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">{review.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                    {review.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              <p className="text-gray-600 italic leading-relaxed text-sm">
                "{review.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center bg-brand-rose/5 p-10 rounded-[40px] border border-brand-rose/10"
        >
          <h3 className="text-2xl font-display text-brand-dark mb-4">
            Want to be our next happy story?
          </h3>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Join our community of dessert lovers and let us make your next
            occasion unforgettable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2348156686247?text=Hi%20Miwa%20I%20love%20your%20reviews%20and%20your%20brand%20keep%20it%20up"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg hover:scale-105"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <Link
              to="/treats"
              className="bg-brand-rose text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg hover:scale-105"
            >
              Order Your Treat
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
