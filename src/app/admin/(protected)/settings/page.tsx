import { createClient } from '@/lib/supabase/server';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { PasswordForm } from '@/components/admin/PasswordForm';

export default async function Page() {
  const s = await createClient();
  const { data } = await s.from('store_settings').select('*').single();

  return (
    <>
      <div className="admin-title">
        <div>
          <p>Configuration</p>
          <h1>Settings</h1>
        </div>
      </div>
      {data && <SettingsForm initial={data} />}
      <PasswordForm />
    </>
  );
}
