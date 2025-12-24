'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { setToken, setUser } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;

      setToken(token);
      setUser(user);

      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 animate-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
      </div>

      {/* Welcome Assistant - Soma */}
      <div className="absolute top-10 left-10 animate-float-character">
        <div className="relative">
          {/* Soma Character */}
          <div className="relative w-28 h-40">
            {/* Head */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full shadow-xl border-3 border-white/50">
              {/* Elegant Hair Bun */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-br from-amber-900 to-amber-800 rounded-t-full shadow-md">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gradient-to-br from-amber-800 to-amber-700 rounded-full"></div>
                {/* Hair clip accent */}
                <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-sm">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Professional Face */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                {/* Elegant Eyes */}
                <div className="flex gap-3 justify-center items-center mb-1">
                  <div className="relative group">
                    <div className="w-2.5 h-3 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full animate-blink-elegant"></div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full animate-shimmer"></div>
                    {/* Eyebrow */}
                    <div className="absolute -top-1.5 left-0 w-3 h-0.5 bg-amber-900 rounded-full"></div>
                  </div>
                  <div className="relative group">
                    <div className="w-2.5 h-3 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full animate-blink-elegant"></div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full animate-shimmer"></div>
                    {/* Eyebrow */}
                    <div className="absolute -top-1.5 left-0 w-3 h-0.5 bg-amber-900 rounded-full"></div>
                  </div>
                </div>
                
                {/* Refined nose */}
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-amber-200/50 rounded-full"></div>
                
                {/* Elegant smile */}
                <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-5 h-2 border-b-2 border-amber-300 rounded-b-full opacity-70"></div>
                
                {/* Subtle blush */}
                <div className="absolute top-7 left-2 w-2 h-1.5 bg-rose-200/40 rounded-full blur-[2px]"></div>
                <div className="absolute top-7 right-2 w-2 h-1.5 bg-rose-200/40 rounded-full blur-[2px]"></div>
              </div>
            </div>
            
            {/* Neck */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gradient-to-b from-amber-100 to-amber-50 shadow-inner"></div>
            
            {/* Professional Body/Dress */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-t-3xl rounded-b-2xl shadow-xl border-2 border-white/30">
              {/* Collar */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-white/20 rounded-t-2xl"></div>
              {/* Badge/ID - organized professional */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-white/90 rounded-lg shadow-md flex flex-col items-center justify-center">
                <div className="text-[8px] font-bold text-indigo-700">SOMA</div>
                <div className="w-6 h-4 bg-indigo-100 rounded mt-0.5 flex items-center justify-center">
                  <div className="text-[6px] text-indigo-600">✓</div>
                </div>
              </div>
              {/* Belt */}
              <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 to-amber-500 shadow-inner">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full border border-amber-700"></div>
              </div>
            </div>
            
            {/* Arms - professional pose */}
            <div className="absolute top-20 -left-3 w-3 h-12 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-full shadow-lg transform rotate-12"></div>
            <div className="absolute top-20 -right-3 w-3 h-12 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-full shadow-lg transform -rotate-12 animate-wave-elegant"></div>
            
            {/* Hands */}
            <div className="absolute top-30 -left-4 w-2.5 h-2.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full shadow-md"></div>
            <div className="absolute top-30 -right-4 w-2.5 h-2.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full shadow-md"></div>
            
            {/* Legs */}
            <div className="absolute top-31 left-5 w-3.5 h-10 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-b-lg shadow-lg">
              {/* Shoe */}
              <div className="absolute -bottom-1 -left-0.5 w-4 h-2 bg-amber-900 rounded-full shadow"></div>
            </div>
            <div className="absolute top-31 right-5 w-3.5 h-10 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-b-lg shadow-lg">
              {/* Shoe */}
              <div className="absolute -bottom-1 -left-0.5 w-4 h-2 bg-amber-900 rounded-full shadow"></div>
            </div>
            
            {/* Clipboard - organized detail */}
            <div className="absolute top-22 -left-5 w-5 h-6 bg-amber-100 rounded shadow-lg border border-amber-300 animate-clipboard">
              <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-amber-900/20"></div>
              <div className="absolute top-1.5 left-0.5 right-0.5 h-0.5 bg-amber-900/20"></div>
              <div className="absolute top-2.5 left-0.5 right-0.5 h-0.5 bg-amber-900/20"></div>
            </div>
          </div>
          
          {/* Professional Welcome Speech Bubble */}
          <div className="absolute -right-48 top-12 bg-gradient-to-br from-white via-indigo-50 to-purple-50 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-2xl border-2 border-indigo-200 animate-fade-in-elegant">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow"></div>
              <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
                Hello, I'm Soma
              </p>
            </div>
            <p className="text-xs text-gray-600 font-medium">Your organized assistant ✨</p>
            <p className="text-[10px] text-indigo-500 mt-1 italic">Ready to help you today!</p>
            {/* Arrow */}
            <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-indigo-200"></div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1.5 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-r-[7px] border-transparent border-r-indigo-50"></div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20">
        {/* Logo and Title */}
        <div className="text-center mb-8">
                <div className="w-10 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-full"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-md">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Face */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                {/* Eyes */}
                <div className="flex gap-3 justify-center mb-2">
                  <div className="relative">
                    <div className="w-3 h-4 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full animate-blink"></div>
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full animate-shimmer"></div>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-4 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full animate-blink"></div>
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Eyelashes */}
                <div className="absolute top-4 left-5 flex gap-3">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-2 bg-purple-800 rounded -rotate-45"></div>
                    <div className="w-0.5 h-2 bg-purple-800 rounded -rotate-12"></div>
                  </div>
                  <div className="flex gap-0.5 ml-1">
                    <div className="w-0.5 h-2 bg-purple-800 rounded rotate-12"></div>
                    <div className="w-0.5 h-2 bg-purple-800 rounded rotate-45"></div>
                  </div>
                </div>
                
                {/* Nose */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-300 rounded-full"></div>
                
                {/* Smile */}
                <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-pink-400 rounded-b-full"></div>
                
                {/* Blush */}
                <div className="absolute top-8 left-2 w-3 h-2 bg-pink-300/60 rounded-full blur-sm"></div>
                <div className="absolute top-8 right-2 w-3 h-2 bg-pink-300/60 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Body */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-14 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl shadow-lg border-4 border-white">
              {/* Heart on body */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-pink-500 text-xl animate-pulse">💝</div>
              </div>
            </div>
            
            {/* Arms */}
            <div className="absolute top-20 -left-2 w-3 h-8 bg-gradient-to-b from-pink-200 to-pink-100 rounded-full shadow animate-wave"></div>
            <div className="absolute top-20 -right-2 w-3 h-8 bg-gradient-to-b from-pink-200 to-pink-100 rounded-full shadow"></div>
            
            {/* Legs */}
            <div className="absolute top-28 left-4 w-3 h-6 bg-gradient-to-b from-purple-300 to-purple-400 rounded-b-full shadow"></div>
            <div className="absolute top-28 right-4 w-3 h-6 bg-gradient-to-b from-purple-300 to-purple-400 rounded-b-full shadow"></div>
          </div>
          
          {/* Welcome Speech Bubble */}
          <div className="absolute -right-40 top-8 bg-gradient-to-r from-pink-50 to-purple-50 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border-2 border-pink-200 animate-fade-in">
            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
              Welcome! I'm Sara �
            </p>
            <p className="text-xs text-gray-600 mt-0.5">Your assistant today!</p>
            <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-pink-200"></div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1.5 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-r-[7px] border-transparent border-r-pink-50"></div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-white/20">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.jpg" 
              alt="Fcilite Electro" 
              className="w-32 h-32 object-contain rounded-2xl shadow-lg animate-float-gentle hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Fcilite Electro
          </h1>
          <p className="text-gray-600 text-lg font-medium">For Installments</p>
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 px-5 py-4 rounded-xl animate-shake">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
            <input
              type="email"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100">
          <p className="font-bold text-indigo-900 mb-3 text-center">📋 Demo Credentials</p>
          <div className="space-y-2 text-sm">
            <div className="bg-white/70 px-4 py-2 rounded-lg">
              <span className="font-semibold text-indigo-700">Admin:</span>
              <span className="text-gray-700 ml-2">admin@fcilite.com / admin123</span>
            </div>
            <div className="bg-white/70 px-4 py-2 rounded-lg">
              <span className="font-semibold text-purple-700">POS:</span>
              <span className="text-gray-700 ml-2">pos@fcilite.com / pos123</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(20deg); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 15s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2.5s ease-in-out infinite; }
        .animate-blink { animation: blink 4s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-wave { animation: wave 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
