'use client';

import { FormEvent, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

export function PasswordForm() {
  const supabase = useMemo(() => createClient(), []);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');

    const form = new FormData(e.currentTarget);
    const password = String(form.get('password') || '');
    const confirm = String(form.get('confirm') || '');

    if (password.length < 10) {
      setMessage('Use at least 10 characters.');
      return;
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    (e.currentTarget as HTMLFormElement).reset();
    setMessage('Password updated. You can use it on /admin/login from now on.');
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <section className="admin-card">
        <h2>Admin password</h2>
        <p className="muted">Change the password for the currently signed-in admin account.</p>
        <div className="form-grid">
          <label>
            New password
            <input required minLength={10} type="password" name="password" autoComplete="new-password" />
          </label>
          <label>
            Confirm password
            <input required minLength={10} type="password" name="confirm" autoComplete="new-password" />
          </label>
        </div>
        {message && <p>{message}</p>}
        <button className="primary" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</button>
      </section>
    </form>
  );
}
