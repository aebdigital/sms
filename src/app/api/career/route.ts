import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const experience = formData.get("experience") as string;
    const file = formData.get("file") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Meno a e-mail sú povinné." },
        { status: 400 }
      );
    }

    const apiKey = process.env.SMTP2GO_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;
    const emailTo = process.env.EMAIL_TO;

    if (!apiKey || !emailFrom || !emailTo) {
      console.error("Missing SMTP2GO environment variables");
      return NextResponse.json(
        { error: "Chyba konfigurácie servera." },
        { status: 500 }
      );
    }

    const htmlBody = `
      <h2>Nová žiadosť o prácu — SMS Kariéra</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Meno</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefón</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(phone || "—")}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">E-mail</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Skúsenosti</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(experience || "—")}</td></tr>
      </table>
    `;

    const attachments: { filename: string; fileblob: string; mimetype: string }[] = [];

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        fileblob: buffer.toString("base64"),
        mimetype: file.type || "application/pdf",
      });
    }

    const payload: Record<string, unknown> = {
      api_key: apiKey,
      to: [`SMS Kariéra <${emailTo}>`],
      sender: `SMS Web <${emailFrom}>`,
      subject: `Žiadosť o prácu — ${name}`,
      html_body: htmlBody,
      text_body: `Meno: ${name}\nTelefón: ${phone || "—"}\nE-mail: ${email}\nSkúsenosti: ${experience || "—"}`,
    };

    if (attachments.length > 0) {
      payload.attachments = attachments;
    }

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.data?.error) {
      console.error("SMTP2GO error:", result);
      return NextResponse.json(
        { error: "Nepodarilo sa odoslať e-mail. Skúste to znova." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career form error:", error);
    return NextResponse.json(
      { error: "Nastala neočakávaná chyba." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
