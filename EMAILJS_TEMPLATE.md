# EmailJS Template for Custom Verification

Gunakan template ini di dashboard EmailJS untuk fitur verifikasi guru.

## Required variables

Pastikan template menggunakan variabel berikut:
- {{to_email}}
- {{user_email}}
- {{verify_link}}
- {{verification_link}}
- {{app_name}}
- {{support_email}}
- {{expires_minutes}}

## Suggested Subject

Verifikasi Email Akun Guru - {{app_name}}

## Suggested Email Body (HTML)

```html
<div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px;">
  <div style="max-width:560px;margin:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
    <h2 style="margin:0 0 12px;color:#0f172a;">Verifikasi Email Akun Guru</h2>
    <p style="margin:0 0 10px;color:#334155;line-height:1.6;">
      Halo, akun guru dengan email <strong>{{user_email}}</strong> telah didaftarkan pada sistem <strong>{{app_name}}</strong>.
    </p>
    <p style="margin:0 0 14px;color:#334155;line-height:1.6;">
      Klik tombol berikut untuk memverifikasi email Anda. Link berlaku selama {{expires_minutes}} menit.
    </p>
    <p style="margin:18px 0;">
      <a href="{{verify_link}}" style="display:inline-block;background:#0891b2;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;">
        Verifikasi Email
      </a>
    </p>
    <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.6;">
      Jika tombol tidak berfungsi, salin dan buka link berikut di browser:
    </p>
    <p style="margin:0 0 12px;word-break:break-all;color:#0f172a;font-size:13px;">
      {{verification_link}}
    </p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;">
      Jika Anda tidak merasa mendaftar, abaikan email ini.
      <br />
      Bantuan: {{support_email}}
    </p>
  </div>
</div>
```

## Config to fill in project

Isi di file js/firebase-init.js pada object EMAILJS_CONFIG:
- publicKey
- serviceId
- templateId
