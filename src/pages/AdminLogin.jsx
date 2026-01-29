// import React, { useState } from "react";
// import { Cake, Loader, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { adminAPI } from "../data/api";

// const AdminLogin = () => {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       setIsLoading(true);
//       setError("");
//       const response = await adminAPI.login(password);

//       if (response.data.token) {
//         localStorage.setItem("adminToken", response.data.token);
//         navigate("/admin");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Invalid password. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 shadow-lg">
//             <Cake className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//             Miwa Cakes Admin
//           </h1>
//           <p className="text-gray-500 mt-2">Enter admin password to continue</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
//               <AlertCircle className="w-5 h-5" />
//               {error}
//             </div>
//           )}

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Admin Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter admin password"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
//                 onKeyPress={(e) => e.key === "Enter" && handleLogin()}
//               />
//             </div>

//             <button
//               onClick={handleLogin}
//               disabled={isLoading}
//               className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <Loader className="w-5 h-5 animate-spin" />
//                   Verifying...
//                 </div>
//               ) : (
//                 "Access Dashboard"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;import React, { useState } from "react";
import { Cake, Loader, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../data/api";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await adminAPI.login(password);

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 shadow-lg">
            <Cake className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Miwa Cakes Admin
          </h1>
          <p className="text-gray-500 mt-2">Enter admin password to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading || !password}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
