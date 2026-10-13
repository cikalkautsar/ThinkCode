'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  async function handleResetPassword(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!email) {
      setErrorMsg('Harap masukkan alamat email Anda!')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const redirectUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/update-password`
          : undefined

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) {
        setErrorMsg(error.message)
        return
      }

      setSuccessMsg(
        'Tautan pemulihan kata sandi telah dikirim ke email Anda! Silakan periksa kotak masuk atau folder spam.'
      )
    } catch {
      setErrorMsg('Terjadi kesalahan. Periksa koneksi internet dan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-stone-100 flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-56 sm:w-64 h-auto object-contain mb-3 drop-shadow-sm"
          src="/logo.png"
          alt="ThinkCode Logo"
        />
        <h1 className="text-stone-900 text-3xl sm:text-5xl font-bold font-mono tracking-widest text-center">
          FORGOT PASSWORD
        </h1>
      </div>

      <div className="w-full max-w-[512px] bg-stone-50 shadow-[6px_6px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex flex-col">
        {/* Window Title Bar */}
        <div className="h-9 px-3 bg-blue-800 border-b-2 border-stone-900 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-3.5 bg-cyan-300" />
            <div className="text-stone-50 text-xs font-bold font-mono uppercase tracking-wide">
              thinkcode - recovery
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-gray-200 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-stone-900 text-xs font-mono leading-none select-none">
              _
            </div>
            <div className="w-5 h-5 bg-gray-200 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-stone-900 text-xs leading-none select-none">
              □
            </div>
            <div
              onClick={() => router.push('/login')}
              className="w-5 h-5 bg-orange-700 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-white text-xs leading-none select-none cursor-pointer hover:bg-orange-600"
            >
              ✕
            </div>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleResetPassword} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="pb-2 border-b border-stone-200 flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-sky-800 rounded-full" />
                <div className="text-gray-700 text-xs font-bold font-mono tracking-wide">
                  PORTAL PEMULIHAN AKSES
                </div>
              </div>
            </div>

            <p className="text-stone-700 text-xs font-mono leading-relaxed bg-amber-50/60 p-2.5 border border-stone-300">
              Masukkan alamat email yang terdaftar. Sistem akan mengirimkan instruksi dan tautan pemulihan untuk mengatur ulang kata sandi akun Anda.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="forgot-email"
                  className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                >
                  <span className="text-blue-900">&gt;</span> EMAIL PENGGUNA
                </label>
                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                  [WAJIB]
                </span>
              </div>
              <input
                id="forgot-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com..."
                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-100 border-2 border-red-800 text-red-900 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(153,27,27,1.00)] flex items-start gap-2">
                <span className="font-bold">⚠️ ERROR:</span>
                <span className="flex-1 break-words">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-2.5 bg-emerald-100 border-2 border-emerald-800 text-emerald-900 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(6,95,70,1.00)] flex items-start gap-2">
                <span className="font-bold">✓ SUKSES:</span>
                <span className="flex-1 break-words">{successMsg}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-cyan-300 hover:bg-cyan-200 active:translate-x-0.5 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex justify-center items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <span className="text-center text-cyan-800 text-xs font-bold font-mono tracking-wide">
                  {loading ? 'MENGIRIMKAN TAUTAN...' : 'KIRIM TAUTAN PEMULIHAN'}
                </span>
                <img
                  src="/icons/tandaPanah.svg"
                  alt="icon"
                  className="w-3.5 h-3 object-contain"
                />
              </button>
            </div>
          </div>

          {/* Back to Login Option */}
          <div className="p-3 bg-stone-100 border border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex flex-col">
              <div className="text-gray-700 text-[10px] font-mono uppercase leading-4">
                INGAT KREDENSIAL ANDA?
              </div>
              <div className="text-stone-900 text-sm font-semibold">
                Kembali ke halaman masuk
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="px-3 py-1.5 bg-stone-50 hover:bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 text-xs font-bold font-mono tracking-wide cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              LOGIN / MASUK →
            </button>
          </div>
        </form>

        {/* Window Footer Status Bar */}
        <div className="px-3 py-1.5 bg-stone-200 border-t-2 border-stone-900 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
            <div className="text-stone-900 text-[10px] font-mono leading-4">
              BUILD: v1.1.1-ThinkCode
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sky-800 text-xs font-bold font-mono tracking-wide">
              READY
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}