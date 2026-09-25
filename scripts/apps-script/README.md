# Lead endpoint (Google Apps Script)

This script receives every website form submission (`src/components/ContactUs.tsx` on `/`, `/contact-us/` and `/nft-brochure/`). It writes each one to a Google Sheet and emails the clinic.

## First-time setup
1. Create a Google Sheet, for example "Neo Follicle Website Leads". Then open **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with this folder's `Code.gs`, and save.
3. Optional: under **Project Settings → Script Properties**, add `NOTIFY_TO`. It takes a comma-separated list of the addresses that should get lead emails, and defaults to `info@neofollicletransplant.com`.
4. Select `testDoPost` and click **Run**. Grant the permissions it asks for (Sheets and Mail). The check passes when a `Leads` tab appears with one row and the notification email arrives.
5. Go to **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and *Who has access* to **Anyone**. Copy the `/exec` URL.
6. Paste that URL into `FORMS.leadEndpoint` in `src/config/site.ts`, then rebuild and deploy the site.

Check that the endpoint responds:
```sh
curl -L -H 'Content-Type: text/plain;charset=utf-8' \
  -d '{"name":"Curl Test","phone":"9999999999","form":"curl"}' '<exec-url>'
# → {"ok":true}
```

## Changing the script
Edit this repo's `Code.gs` first, then paste the new version into the editor. Then go to **Deploy → Manage deployments → ✎ → Version: New version → Deploy**. This keeps the same `/exec` URL. A *New deployment* would create a new URL, and the site would keep calling the old one.

Errors appear under **Executions** in the Apps Script editor.

## Sheet columns
Timestamp (IST), Form (`home` / `contact` / `brochure`), Name, Phone, Email, Country, Service, Message, Page URL, Referrer, utm_source/medium/campaign/term/content, gclid, fbclid, Status. The clinic team fills in Status; the script leaves it blank.
