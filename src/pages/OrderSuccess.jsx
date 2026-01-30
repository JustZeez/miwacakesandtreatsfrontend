// import React, { useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import {
//   MessageCircle,
//   Copy,
//   ArrowLeft,
//   ExternalLink,
//   PartyPopper,
// } from "lucide-react";
// import { toast } from "react-toastify";

// export default function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state ?? {};

//   const orderId = state.orderId;
//   const customerName = state.customerName || "Sweet Tooth";

//   useEffect(() => {
//     if (!orderId) {
//       const timer = setTimeout(() => {
//         navigate("/treats");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [orderId, navigate]);

//   const whatsappNumber = "2348156686247";
//   const whatsappMessage = encodeURIComponent(
//     `Hello Miwa! 🎂\n\nMy name is ${customerName}.\nMy Order ID is: ${orderId}\n\nI've completed my payment and uploaded the receipt. Please confirm my order!`,
//   );

//   const copyToClipboard = () => {
//     if (orderId) {
//       navigator.clipboard.writeText(orderId);
//       toast.success("Order ID copied to clipboard!");
//     }
//   };

//   if (!orderId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
//         <div className="text-center p-8 bg-white rounded-[40px] shadow-xl border border-brand-pink/20">
//           <h2 className="text-2xl font-display text-brand-dark mb-4">
//             No Order Found
//           </h2>
//           <p className="text-gray-500 mb-6">
//             Redirecting you back to treats...
//           </p>
//           <Link to="/treats" className="text-brand-rose font-bold underline">
//             Go now
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-12 bg-white flex items-center justify-center px-4">
//       <div className="max-w-2xl w-full text-center">
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="absolute inset-0 bg-brand-rose/20 rounded-full blur-3xl transform scale-150 animate-pulse"></div>
//             <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-cream border-4 border-white shadow-xl flex items-center justify-center">
//               <PartyPopper size={64} className="text-brand-rose" />
//             </div>
//             <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-2xl shadow-lg border-4 border-white transform rotate-12">
//               <span className="text-2xl">✅</span>
//             </div>
//           </div>
//         </div>

//         <h1 className="text-4xl md:text-5xl font-display text-brand-dark mb-2 tracking-tight">
//           Sweet Success, {customerName.split(" ")[0]}!
//         </h1>
//         <p className="text-gray-600 mb-10 text-lg">
//           Your order has been logged in our system. Now, let's get it verified!
//         </p>

//         <div className="bg-brand-cream/30 border-2 border-dashed border-brand-rose/40 p-8 rounded-[40px] mb-10 relative overflow-hidden">
//           <div className="absolute top-0 right-0 bg-brand-rose text-white px-6 py-1 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
//             Official Receipt
//           </div>

//           <p className="text-sm text-brand-dark/60 mb-2 font-bold uppercase tracking-wider">
//             Order Reference
//           </p>
//           <div className="flex items-center justify-center gap-4">
//             <code className="text-3xl md:text-5xl font-mono font-black text-brand-dark tracking-tighter">
//               {orderId}
//             </code>
//             <button
//               onClick={copyToClipboard}
//               className="p-3 bg-white hover:bg-brand-rose hover:text-white rounded-2xl transition-all text-brand-rose shadow-md border border-brand-pink/20"
//             >
//               <Copy size={24} />
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-between max-w-md mx-auto mb-10 relative">
//           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
//           <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-brand-rose -translate-y-1/2 z-0"></div>

//           {[
//             { label: "Submitted", done: true },
//             { label: "Verifying", done: true },
//             { label: "Baking", done: false },
//           ].map((step, i) => (
//             <div key={i} className="relative z-10 flex flex-col items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
//                   step.done
//                     ? "bg-brand-rose text-white"
//                     : "bg-gray-200 text-gray-400"
//                 }`}
//               >
//                 {step.done ? "✓" : i + 1}
//               </div>
//               <span className="text-[10px] uppercase font-bold mt-2 text-gray-500">
//                 {step.label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4">
//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full bg-[#25D366] text-white px-8 py-6 rounded-[30px] font-bold flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-all shadow-xl hover:scale-[1.02] active:scale-95 text-lg"
//           >
//             <MessageCircle size={28} />
//             Message Miwa to Confirm Order
//           </a>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link
//               to="/treats"
//               className="flex-1 bg-brand-dark text-white px-8 py-5 rounded-[25px] font-bold flex items-center justify-center gap-3 hover:bg-brand-rose transition-all shadow-lg"
//             >
//               <ArrowLeft size={20} />
//               Back to Menu
//             </Link>
//             <button
//               onClick={() => window.print()}
//               className="flex-1 bg-white border-2 border-brand-dark text-brand-dark px-8 py-5 rounded-[25px] font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-lg"
//             >
//               Save as PDF
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Copy,
  ArrowLeft,
  ExternalLink,
  PartyPopper,
  PackageSearch, // Add this icon
} from "lucide-react";
import { toast } from "react-toastify";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state ?? {};

  const orderId = state.orderId;
  const customerName = state.customerName || "Sweet Tooth";
  const customerPhone = state.phone || ""; // Get phone from state if available

  useEffect(() => {
    if (!orderId) {
      const timer = setTimeout(() => {
        navigate("/treats");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orderId, navigate]);

  const whatsappNumber = "2348156686247";
  const whatsappMessage = encodeURIComponent(
    `Hello Miwa! 🎂\n\nMy name is ${customerName}.\nMy Order ID is: ${orderId}\n\nI've completed my payment and uploaded the receipt. Please confirm my order!`,
  );

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      toast.success("Order ID copied to clipboard!");
    }
  };

  const handleTrackOrder = () => {
    // Navigate to track page with order ID
    if (orderId) {
      navigate("/trackorder", { 
        state: { 
          preFilledOrderId: orderId,
          preFilledPhone: customerPhone 
        } 
      });
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
        <div className="text-center p-8 bg-white rounded-[40px] shadow-xl border border-brand-pink/20">
          <h2 className="text-2xl font-display text-brand-dark mb-4">
            No Order Found
          </h2>
          <p className="text-gray-500 mb-6">
            Redirecting you back to treats...
          </p>
          <Link to="/treats" className="text-brand-rose font-bold underline">
            Go now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-rose/20 rounded-full blur-3xl transform scale-150 animate-pulse"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-cream border-4 border-white shadow-xl flex items-center justify-center">
              <PartyPopper size={64} className="text-brand-rose" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-2xl shadow-lg border-4 border-white transform rotate-12">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-display text-brand-dark mb-2 tracking-tight">
          Sweet Success, {customerName.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Your order has been logged in our system. Now, let's get it verified!
        </p>

        <div className="bg-brand-cream/30 border-2 border-dashed border-brand-rose/40 p-8 rounded-[40px] mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-rose text-white px-6 py-1 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
            Official Receipt
          </div>

          <p className="text-sm text-brand-dark/60 mb-2 font-bold uppercase tracking-wider">
            Order Reference
          </p>
          <div className="flex items-center justify-center gap-4">
            <code className="text-3xl md:text-5xl font-mono font-black text-brand-dark tracking-tighter">
              {orderId}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-3 bg-white hover:bg-brand-rose hover:text-white rounded-2xl transition-all text-brand-rose shadow-md border border-brand-pink/20"
            >
              <Copy size={24} />
            </button>
          </div>
        </div>

        <div className="flex justify-between max-w-md mx-auto mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-brand-rose -translate-y-1/2 z-0"></div>

          {[
            { label: "Submitted", done: true },
            { label: "Verifying", done: true },
            { label: "Baking", done: false },
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.done
                    ? "bg-brand-rose text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.done ? "✓" : i + 1}
              </div>
              <span className="text-[10px] uppercase font-bold mt-2 text-gray-500">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white px-8 py-6 rounded-[30px] font-bold flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-all shadow-xl hover:scale-[1.02] active:scale-95 text-lg"
          >
            <MessageCircle size={28} />
            Message Miwa to Confirm Order
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Track Your Order Button - NEW */}
            <button
              onClick={handleTrackOrder}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-5 rounded-[25px] font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <PackageSearch size={20} />
              Track Your Order
            </button>

            <Link
              to="/treats"
              className="bg-brand-dark text-white px-8 py-5 rounded-[25px] font-bold flex items-center justify-center gap-3 hover:bg-brand-rose transition-all shadow-lg"
            >
              <ArrowLeft size={20} />
              Back to Menu
            </Link>
          </div>

          {/* Save as PDF Button (optional - moved to separate row) */}
          <button
            onClick={() => window.print()}
            className="w-full bg-white border-2 border-brand-dark text-brand-dark px-8 py-5 rounded-[25px] font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-lg"
          >
            <ExternalLink size={20} />
            Save Receipt as PDF
          </button>
        </div>
      </div>
    </div>
  );
}