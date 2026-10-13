'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [role, setRole] = useState<'student' | 'facilitator'>('student')
  const [rememberMe, setRememberMe] = useState(false)

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!email || !password) {
      setErrorMsg('Harap isi email/username dan kata sandi!')
      return
    }

    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="w-full min-h-screen bg-stone-100 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-56 sm:w-64 h-auto object-contain mb-3 drop-shadow-sm"
          src="/logo.png"
          alt="ThinkCode Logo"
        />
        <h1 className="text-stone-900 text-4xl sm:text-5xl font-bold font-mono tracking-widest">
          LOG IN
        </h1>
      </div>

      <div className="w-full max-w-[512px] bg-stone-50 shadow-[6px_6px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex flex-col">
        <div className="h-9 px-3 bg-blue-800 border-b-2 border-stone-900 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <div className="text-stone-50 text-xs font-bold font-mono uppercase tracking-wide">
              thinkcode
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-gray-200 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-stone-900 text-xs font-mono leading-none select-none">
              _
            </div>
            <div className="w-5 h-5 bg-gray-200 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-stone-900 text-xs leading-none select-none">
              □
            </div>
            <div className="w-5 h-5 bg-orange-700 outline outline-1 outline-offset-[-1px] outline-stone-900 flex justify-center items-center text-white text-xs leading-none select-none">
              ✕
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="pb-2 border-b border-stone-200 flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-sky-800 rounded-full" />
                <div className="text-gray-700 text-xs font-bold font-mono tracking-wide">
                  PORTAL AKSES INVESTIGASI
                </div>
              </div>
            </div>

            <div className="p-1 bg-stone-200 outline outline-2 outline-offset-[-2px] outline-stone-900 flex gap-1">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2 flex justify-center items-center gap-1.5 transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-cyan-300 shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-1 outline-offset-[-1px] outline-stone-900 text-cyan-800'
                    : 'text-gray-700 hover:bg-stone-300/50'
                }`}
              >
                <img
                  src="/icons/siswa.svg"
                  alt="Ikon siswa"
                  className="w-3.5 h-3 object-contain"
                />
                <span className="text-xs font-bold font-mono tracking-wide">SISWA (STUDENT)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('facilitator')}
                className={`flex-1 py-2 flex justify-center items-center gap-1.5 transition-all cursor-pointer ${
                  role === 'facilitator'
                    ? 'bg-cyan-300 shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-1 outline-offset-[-1px] outline-stone-900 text-cyan-800'
                    : 'text-gray-700 hover:bg-stone-300/50'
                }`}
              >
                <img
                  src="/icons/guru.svg"
                  alt="Ikon guru"
                  className="w-3 h-3.5 object-contain"
                />
                <span className="text-xs font-bold font-mono tracking-wide">GURU (FACILITATOR)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="login-email"
                  className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                >
                  <span className="text-blue-900">&gt;</span> EMAIL / ID PENGGUNA
                </label>
                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                  [WAJIB]
                </span>
              </div>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan email..."
                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="login-password"
                  className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                >
                  <span className="text-blue-900">&gt;</span> PASSWORD / KATA SANDI
                </label>
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-blue-900 text-[10px] font-mono hover:underline cursor-pointer"
                >
                  LUPA KATA SANDI?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="masukkan kata sandi..."
                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
              />
            </div>

            <div className="pt-1 flex justify-between items-center">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-white rounded-sm border border-neutral-500 accent-blue-900 cursor-pointer"
                />
                <span className="text-stone-900 text-xs font-bold font-mono tracking-wide">
                  INGAT SESI INVESTIGASI INI
                </span>
              </label>
              <span className="text-gray-500 text-[10px] font-mono">[24 JAM]</span>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-100 border-2 border-red-800 text-red-900 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(153,27,27,1.00)] flex items-start gap-2">
                <span className="font-bold">⚠️ ERROR:</span>
                <span className="flex-1 break-words">{errorMsg}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-cyan-300 hover:bg-cyan-200 active:translate-x-0.5 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex justify-center items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <span className="text-center text-cyan-800 text-xs font-bold font-mono tracking-wide">
                  {loading ? 'MEMVERIFIKASI...' : 'MASUK KE SISTEM'}
                </span>
                <img
                  src="/icons/tandaPanah.svg"
                  alt="icon"
                  className="w-3.5 h-3 object-contain"
                />
              </button>
            </div>
          </div>

          <div className="p-3 bg-stone-100 border border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex flex-col">
              <div className="text-gray-700 text-[10px] font-mono uppercase leading-4">
                BELUM MEMILIKI KREDENSIAL?
              </div>
              <div className="text-stone-900 text-sm font-semibold">
                Daftarkan akun Anda
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="px-3 py-1.5 bg-stone-50 hover:bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 text-xs font-bold font-mono tracking-wide cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              DAFTAR AKUN BARU →
            </button>
          </div>
        </form>

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
