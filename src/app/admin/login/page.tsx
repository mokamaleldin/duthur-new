'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

export default function AdminLogin() {
  const supabase = useMemo(() => createClient(), []);
  const [message, setMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') || '').trim();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '');

    setMessage('Sending…');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/admin`,
      },
    });

    setMessage(error ? error.message : 'Check your email for the secure login link.');
  }

  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <div className="admin-mark">دُثُر</div>
        <h1>DUTHUR Admin</h1>
        <p>Use the approved store admin email.</p>
        <input required type="email" name="email" placeholder="Admin email" />
        <button className="primary">Send login link</button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
