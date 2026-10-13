
import { createClient } from '@/utils/supabase/server'

export default async function SupabaseTestPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  // Supabase mengembalikan error jika session cookies kosong (belum login).
  // Ini adalah perilaku normal, bukan kesalahan koneksi.
  const isSessionMissing = error?.message?.toLowerCase().includes('auth session missing') || error?.name === 'AuthSessionMissingError'
  const isActualError = error && !isSessionMissing

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Supabase Connection Test</h1>

      {isActualError ? (
        <p style={{ color: 'red' }}>Koneksi Error: {error.message}</p>
      ) : (
        <div style={{ color: 'green', marginTop: '1rem' }}>
          <p><strong>Status:</strong> Koneksi ke Supabase berhasil!</p>
          <p>
            {user
              ? `Pengguna login: ${user.email ?? user.id}`
              : 'Belum ada pengguna yang login (Sesi kosong).'}
          </p>
        </div>
      )}
    </main>
  )
}
