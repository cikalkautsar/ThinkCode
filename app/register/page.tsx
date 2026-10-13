'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
    const router = useRouter()
    const supabase = createClient()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [role, setRole] = useState<'student' | 'facilitator'>('student')

    async function handleSignUp(e?: React.FormEvent) {
        if (e) e.preventDefault()
        if (!name || !email || !username || !password) {
            setErrorMsg('Harap isi semua kolom!')
            return
        }

        if (password.length < 8) {
            setErrorMsg('Password minimal 8 karakter!')
            return
        }

        setLoading(true)
        setErrorMsg('')
        setSuccessMsg('')

        try {
            const {
                data,
                error
            } = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    data: {
                        name, 
                        username, 
                        role
                    }
                }
            })

            if (error) {
                setErrorMsg(error.message)
                return
            }

            if (data.session) {
                router.push('/')
                router.refresh()
                return
            }

            setSuccessMsg('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi atau silakan login.')
        } catch {
            setErrorMsg('Terjadi kesalahan. Periksa koneksi internet dan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-stone-100 flex flex-col items-center py-10 px-4 sm:px-6 overflow-y-auto">
           
            <div className="flex flex-col items-center mb-6">
                <img
                    className="w-56 sm:w-64 h-auto object-contain mb-3 drop-shadow-sm"
                    src="/logo.png"
                    alt="ThinkCode Logo"
                />
                <h1 className="text-stone-900 text-4xl sm:text-5xl font-bold font-mono tracking-widest">
                    SIGN UP
                </h1>
            </div>

            <div className="w-full max-w-[512px] bg-stone-50 shadow-[6px_6px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 flex flex-col mb-10">
                 <div className="h-9 px-3 bg-blue-800 border-b-2 border-stone-900 flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-3.5 bg-cyan-300" />
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

                        <form onSubmit={handleSignUp} className="p-6 flex flex-col gap-5">
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
                                    htmlFor="reg-name"
                                    className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                                >
                                    <span className="text-blue-900">&gt;</span> NAMA LENGKAP
                                </label>
                                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                                    [WAJIB]
                                </span>
                            </div>
                            <input
                                id="reg-name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="masukkan nama lengkap..."
                                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
                            />
                        </div>

                                       <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="reg-email"
                                    className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                                >
                                    <span className="text-blue-900">&gt;</span> EMAIL
                                </label>
                                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                                    [WAJIB]
                                </span>
                            </div>
                            <input
                                id="reg-email"
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
                                    htmlFor="reg-username"
                                    className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                                >
                                    <span className="text-blue-900">&gt;</span> USERNAME / ID PENGGUNA
                                </label>
                                <span className="text-gray-700 text-[10px] font-bold font-mono tracking-wide">
                                    [WAJIB]
                                </span>
                            </div>
                            <input
                                id="reg-username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="masukkan username..."
                                className="w-full px-3 py-2.5 bg-white shadow-[2px_2px_0px_0px_rgba(27,28,25,1.00)] outline outline-2 outline-offset-[-2px] outline-stone-900 text-stone-900 placeholder:text-gray-500 font-mono text-sm focus:bg-amber-50/20 focus:outline-blue-800 transition-colors"
                            />
                        </div>

                                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="reg-password"
                                    className="flex items-center gap-1 text-stone-900 text-xs font-bold font-mono tracking-wide"
                                >
                                    <span className="text-blue-900">&gt;</span> PASSWORD / KATA SANDI
                                </label>
                                <span className="text-gray-700 text-[10px] font-mono">
                                    Minimal 8 karakter
                                </span>
                            </div>
                            <input
                                id="reg-password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="masukkan kata sandi..."
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
                                <span className="font-bold">SUKSES:</span>
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
                                    {loading ? 'MENDAFTARKAN...' : 'DAFTAR KE SISTEM'}
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
                                SUDAH MEMILIKI AKSES?
                            </div>
                            <div className="text-stone-900 text-sm font-semibold">
                                Masuk ke akun Anda
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
                            READY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
