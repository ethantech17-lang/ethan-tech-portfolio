<<<<<<< HEAD
# Ethan Tech Personal Portfolio

A responsive, animated Flask portfolio for Ethan Tech. Includes project showcase, skills, WhatsApp link, LinkedIn link, FAQ-style portfolio assistant and an email contact form.

## Run locally on Windows PowerShell

```powershell
cd path\to\ethan_tech_portfolio
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

Open http://127.0.0.1:5000

The website runs locally without email credentials, but the contact form will only deliver messages after email is configured.

## Configure email delivery to ethantech17@gmail.com

This app uses Gmail SMTP with a Google App Password. Do not use your normal Gmail password.

1. Turn on 2-Step Verification for the Google account `ethantech17@gmail.com`.
2. Create an App Password in your Google Account security settings (if Google makes the option available).
3. In Render, open your web service → Environment and add:
   - `PORTFOLIO_EMAIL` = `ethantech17@gmail.com`
   - `GMAIL_ADDRESS` = `ethantech17@gmail.com`
   - `GMAIL_APP_PASSWORD` = the generated 16-character Google App Password
4. Save changes and redeploy. Keep the app password private; never commit it to GitHub or paste it into chat.

Messages submitted through the form are sent to the portfolio inbox. The visitor's email is set as Reply-To so Ethan can reply directly.

## Deploy on Render

1. Create a GitHub repository and upload all files in this folder.
2. In Render choose **New + → Web Service**, connect the repository.
3. Render detects `render.yaml`; use the settings below if prompted:
   - Runtime: Python
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
4. Add the three email environment variables listed above.
5. Deploy. The `/health` route is used for health checks.

## Contact details already configured

- Email: ethantech17@gmail.com
- WhatsApp: +254705911157 (Kenya)
- LinkedIn: https://www.linkedin.com/in/ethan-tech-5b4b39445/

## Important

The built-in chat assistant is a lightweight scripted FAQ assistant, not a live generative AI service. It answers common questions about skills, projects and contact details without requiring an API key.

## Google Search visibility (SEO)

Included: search-friendly title and description, Open Graph metadata, Person structured data, `robots.txt`, XML sitemap, custom favicon and canonical URL.

After deploying, verify:
- `https://YOUR-RENDER-DOMAIN/robots.txt`
- `https://YOUR-RENDER-DOMAIN/sitemap.xml`

### Submit to Google

1. Open https://search.google.com/search-console/ and sign in.
2. Add your live Render address as a **URL-prefix property**, including `https://`.
3. Complete Google's ownership verification. If Google provides an HTML meta tag, add it inside `<head>` in `templates/index.html` and redeploy.
4. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
5. Use **URL Inspection** on the homepage and click **Request indexing**.

Google indexing and ranking are not immediate or guaranteed; it can take days to weeks or longer. Try searching `site:YOUR-RENDER-DOMAIN` to check whether Google has indexed the site.


### Google Search Console HTML-file verification

The Google verification file supplied for this website is included and served at:

`https://YOUR-RENDER-DOMAIN/googlee03837756975f3c6.html`

After deploying this version, open that exact URL in a browser. It should display:

`google-site-verification: googlee03837756975f3c6.html`

Then return to Google Search Console and click **Verify** for the matching URL-prefix property. Do not rename or edit the verification file. Keep the verification route and file in the project after verification so Google can re-check ownership.
=======
# ethan-tech-portfolio
>>>>>>> 39b33fc89f76009189ea9f1ecbb6702efd089fb9
