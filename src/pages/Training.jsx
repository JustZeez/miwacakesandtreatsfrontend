import React from "react";
import { trainingData } from "../data/training";
import {
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Info,
  Phone,
  Users,
  Clock,
  Award,
  Star,
  ChevronRight,
  BookOpen,
  Sparkles,
  Trophy,
  GraduationCap,
  Zap,
  Heart,
  Target,
  ShieldCheck,
  Gift,
  TrendingUp,
  Coffee,
  Camera,
  ChefHat,
} from "lucide-react";

export default function Training() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white via-rose-50/30 to-pink-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-rose-100 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-100 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-bold text-sm mb-6 animate-bounce shadow-lg shadow-rose-500/25">
            <Sparkles size={16} />
            <span>NEXT SESSION STARTS: {trainingData.startDate}</span>

          </div>

          <h1 className="text-5xl md:text-7xl font-display text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Master the Art
            </span>
            <br />
            <span className="text-gray-800">of Baking Excellence</span>
          </h1>

          <div className="flex flex-col items-center gap-3">
            <p className="text-xl text-gray-600 max-w-3xl">
              Transform your passion into profit with our comprehensive 8-week
              intensive training
            </p>
            <div className="flex items-center gap-3 text-rose-600 font-semibold">
              <ChefHat className="animate-pulse" />
              <span>Led by Miwa CakesAndTreats</span>
              <Award className="animate-bounce" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Users, label: "Students Trained", value: "500+" },
            { icon: Clock, label: "Hours of Training", value: "120+" },
            { icon: Trophy, label: "Success Rate", value: "98%" },
            { icon: Star, label: "Satisfaction", value: "4.9★" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg">
                  <stat.icon className="text-rose-600" size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What You'll Learn
              </h2>
              <p className="text-gray-600">
                Comprehensive curriculum covering all aspects of professional
                baking
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-rose-600 font-semibold">
              <BookOpen size={20} />
              <span>8 Modules • 32 Lessons</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingData.curriculum.map((section, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-b from-white to-rose-50 p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-bl-full"></div>

                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
                  {[ChefHat, Camera, Gift, TrendingUp][idx] &&
                    React.createElement(
                      [ChefHat, Camera, Gift, TrendingUp][idx],
                      {
                        size: 24,
                        className: "text-white",
                      }
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
                  {section.category}
                </h3>

                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mt-2"></div>
                      <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-rose-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full -translate-y-32 translate-x-32"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
                    <Target size={24} />
                  </div>
                  <span>Why Choose This Training?</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {trainingData.notes.map((note, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="p-2 bg-gradient-to-r from-rose-600/20 to-pink-600/20 rounded-lg">
                        <CheckCircle size={20} className="text-rose-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">{note}</p>
                        <p className="text-rose-200/70 text-sm">
                          Hands-on practice with expert guidance
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-rose-800">
                  <a
                    href="https://wa.me/2348156686247"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <Phone size={20} />
                    <span>Book Your Spot Now</span>
                    <Zap size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border-2 border-rose-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full opacity-50"></div>

            <div className="relative z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2"></div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-6">
                  <GraduationCap size={16} className="text-rose-600" />
                  <span className="text-sm font-semibold text-rose-700">
                    Professional Certification
                  </span>
                </div>

                <p className="text-gray-500 uppercase font-bold tracking-widest text-xs mb-4">
                  Investment for Your Future
                </p>
                <div className="relative">
                  <div className="text-6xl font-bold text-gray-900 mb-2">
                    ₦{trainingData.fee}
                  </div>
                  <div className="text-rose-600 font-semibold flex items-center justify-center gap-2">
                    <Heart size={16} className="animate-pulse" />
                    <span>One-time payment • Lifetime access</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={20} className="text-rose-600" />
                    <span className="font-semibold">
                      {trainingData.location}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={20} className="text-rose-600" />
                    <span className="font-semibold">
                      8 Weeks • Flexible Schedule
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <ShieldCheck size={20} />
                    <span className="font-semibold">Money-back guarantee</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/2348156686247"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group/btn"
                >
                  <Phone size={20} />
                  <span>Enroll via WhatsApp</span>
                  <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-white to-rose-50 p-10 rounded-[40px] shadow-2xl border border-rose-100 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full translate-x-32 translate-y-32"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl shadow-2xl shadow-rose-500/30 mx-auto mb-6">
                <CreditCard size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Secure Your Spot
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Make a deposit to reserve your place in the next session.
                Contact us on WhatsApp after payment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-rose-300 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                      <p className="text-xl font-bold text-gray-900">
                        {trainingData.payment.bank}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Account Number
                      </p>
                      <p className="text-3xl font-mono font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                        {trainingData.payment.account}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Name</p>
                      <p className="text-lg font-semibold text-gray-800 italic">
                        {trainingData.payment.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <a
                    href="https://wa.me/2348156686247"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Phone size={16} />
                    <span>Confirm Payment</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-rose-100">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-amber-500" />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-500" />
                    <span>Certificate Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl shadow-rose-500/30 animate-pulse">
            <Sparkles size={20} />
            <span>Don't Miss This Opportunity!</span>
            <Sparkles size={20} />
          </div>
          <p className="text-gray-600 mt-4">
            Limited spots available. Join hundreds of successful bakers today!
          </p>
        </div>
      </div>
    </div>
  );
}
