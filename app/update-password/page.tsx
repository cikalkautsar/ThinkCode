'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasValidSession, setHasValidSession] = useState(true)

  useEffect(() => {
    async function initSession() {
      try {
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search)
          const code = params.get('code')
          if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession(code)
            if (error) {
              setErrorMsg('Tautan verifikasi telah kedaluwarsa atau tidak valid. Silakan minta tautan baru.')
              setHasValidSession(false)
            }
          }
        }

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          const hasHashToken = typeof window !== 'undefined' && window.location.hash.includes('access_token')
          if (!hasHashToken) {
            setHasValidSession(false)
          }
        }
      } catch {
      } finally {
        setCheckingSession(false)
      }
    }

    initSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setHasValidSession(true)
        setErrorMsg('')
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase])

  async function handleUpdatePassword(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!password || !confirmPassword) {
      setErrorMsg('Harap isi semua kolom kata sandi!')
      return
    }

    if (password.length < 8) {
      setErrorMsg('Kata sandi minimal harus 8 karakter!')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok!')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setErrorMsg(error.message)
        return
      }

      setSuccessMsg('Kata sandi berhasil diperbarui! Mengalihkan ke halaman login...')

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch {
      setErrorMsg('Terjadi kesalahan saat memperbarui kata sandi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-stone-100 flex flex-col items-center justify-center py-10 px-4 sm:px-6 overflow-y-auto">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-56 sm:w-64 h-auto object-contain mb-3 drop-shadow-sm"
          src="/logo.png"
          alt="ThinkCode Logo"
        />
        <h1 className="text-stone-900 text-3xl sm:text-5xl font-bold font-mono tracking-widest text-center">
          UPDATE PASSWORD
        </h1>
      </div>

      <div className="w-full max-w-[512px] bg-stone-50 shadow-[6px_6px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex flex-col">
        <div className="h-9 px-3 bg-blue-800 border-b-2 border-stone-900 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-3.5 bg-cyan-300" />
            <div className="text-stone-50 text-xs font-bold font-mono uppercase tracking-wide">
              thinkcode - credential override
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

        <form onSubmit={handleUpdatePassword} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="pb-2 border-b border-stone-200 flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-sky-800 rounded-full" />
                <div className="text-gray-700 text-xs font-bold font-mono tracking-wide">
                  PORTAL PEMBARUAN KREDENSIAL
                </div>
              </div>
            </div>

            <p className="text-stone-700 text-xs font-mono leading-relaxed bg-amber-50/60 p-2.5 border border-stone-300">
              Buat kata sandi baru untuk mengamankan kembali akun investigasi Anda. Pastikan kata sandi baru Anda kuat dan mudah diingat.
            </p>
          </div>

          {!hasValidSession && !checkingSession && (
            <div className="p-2.5 bg-amber-100 border-2 border-amber-800 text-amber-900 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(180,83,9,1.00)] flex items-start gap-2">
              <span className="font-bold"> PERINGATAN:</span>
              <span className="flex-1">
                Sesi pemulihan tidak terdeteksi atau tautan telah kedaluwarsa. Jika tombol simpan gagal, silakan minta tautan baru melalui{' '}
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="underline font-bold text-blue-900 cursor-pointer"
                >
                  Lupa Kata Sandi
                </button>
                .
              </span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="new-password"
                  className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                >
                  <span className="text-blue-900">&gt;</span> KATA SANDI BARU
                </label>
                <span className="text-gray-700 text-[10px] font-mono">
                  MIN. 8 KARAKTER
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="masukkan kata sandi baru..."
                  className="w-full px-3 py-2.5 pr-20 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 px-2 py-1 bg-stone-200 border border-stone-800 text-[10px] font-mono font-bold text-stone-800 hover:bg-stone-300 transition-colors select-none cursor-pointer"
                >
                  {showPassword ? 'TUTUP' : 'LIHAT'}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="confirm-password"
                  className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                >
                  <span className="text-blue-900">&gt;</span> KONFIRMASI KATA SANDI
                </label>
                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                  [WAJIB COCOK]
                </span>
              </div>
              <input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="ulangi kata sandi baru..."
                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-100 border-2 border-red-800 text-red-900 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(153,27,27,1.00)] flex items-start gap-2">
                <span className="font-bold">ERROR:</span>
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
                  {loading ? 'MEMPERBARUI KATA SANDI...' : 'SIMPAN KATA SANDI BARU'}
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
                BATALKAN PEMBARUAN?
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
        <div className="px-3 py-1.5 bg-stone-200 border-t-2 border-stone-900 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
            <div className="text-stone-900 text-[10px] font-mono leading-4">
              BUILD: v1.1.1-ThinkCode
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sky-800 text-xs font-bold font-mono tracking-wide">
              SECURITY-OK
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
