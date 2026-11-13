import os
import re
import smtplib
from email.message import EmailMessage
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024

PORTFOLIO_EMAIL = os.getenv("PORTFOLIO_EMAIL", "ethantech17@gmail.com")
GMAIL_ADDRESS = os.getenv("GMAIL_ADDRESS", "")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")

@app.get("/")
def home():
    return render_template("index.html")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/googlee03837756975f3c6.html")
def google_site_verification():
    return send_from_directory(
        app.static_folder,
        "googlee03837756975f3c6.html",
        mimetype="text/html",
    )

@app.get("/robots.txt")
def robots():
    from flask import Response
    body = f"User-agent: *\nAllow: /\nSitemap: {request.url_root.rstrip('/')}/sitemap.xml\n"
    return Response(body, mimetype="text/plain")

@app.get("/sitemap.xml")
def sitemap():
    from flask import Response
    from datetime import date
    url = request.url_root.rstrip("/") + "/"
    body = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{url}</loc><lastmod>{date.today().isoformat()}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>"""
    return Response(body, mimetype="application/xml")

@app.post("/contact")
def contact():
    data = request.get_json(silent=True) or request.form
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    subject = str(data.get("subject", "Portfolio enquiry")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify(ok=False, message="Please complete your name, email and message."), 400
    if len(name) > 100 or len(email) > 254 or len(subject) > 160 or len(message) > 5000:
        return jsonify(ok=False, message="One of the fields is too long. Please shorten it and try again."), 400
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify(ok=False, message="Please enter a valid email address."), 400
    if not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD:
        return jsonify(ok=False, message="The email service has not been configured yet. Please contact Ethan on WhatsApp."), 503

    mail = EmailMessage()
    mail["Subject"] = f"[Portfolio] {subject}"
    mail["From"] = GMAIL_ADDRESS
    mail["To"] = PORTFOLIO_EMAIL
    mail["Reply-To"] = email
    mail.set_content(
        f"New message from your portfolio website\n\n"
        f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}\n"
    )
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=20) as smtp:
            smtp.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD.replace(" ", ""))
            smtp.send_message(mail)
        return jsonify(ok=True, message="Your message has been sent to Ethan. Thank you!")
    except Exception:
        app.logger.exception("Portfolio email delivery failed")
        return jsonify(ok=False, message="Sorry, the email could not be sent right now. Please try WhatsApp instead."), 502

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))