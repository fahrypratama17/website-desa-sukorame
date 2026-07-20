"use client";

import { useActionState } from 'react';
import { authenticate } from '../../../app/admin/login/actions';
import { FiAtSign, FiLock, FiLoader, FiAlertCircle } from 'react-icons/fi';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-inter-500 text-[#1C3F2D]" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiAtSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@sukorame.desa.id"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] focus:border-transparent font-inter-400 transition"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-inter-500 text-[#1C3F2D]" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285A43] focus:border-transparent font-inter-400 transition"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 px-4 text-white bg-[#0A2615] hover:bg-[#1C3F2D] rounded-xl font-inter-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md flex justify-center items-center gap-2"
      >
        {isPending ? (
          <>
            <FiLoader className="animate-spin h-5 w-5 text-white" />
            Memproses...
          </>
        ) : (
          'Masuk Dashboard'
        )}
      </button>
      
      <div
        className="flex h-8 items-end justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <p className="text-sm text-red-500 font-inter-500 text-center flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
