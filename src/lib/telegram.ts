// lib/telegram.ts
export async function sendTelegramMessage(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[Telegram] Not configured — message would be:', message);
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );
    const data = await response.json();
    return data.ok === true;
  } catch (err) {
    console.error('[Telegram] Failed to send message:', err);
    return false;
  }
}

export function formatLeadMessage(lead: {
  name: string;
  phone: string;
  company?: string;
  source?: string;
}) {
  const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
  return `🌿 <b>Kamafarm Healthcare — Yangi ariza!</b>

👤 <b>Ism:</b> ${lead.name}
📞 <b>Telefon:</b> ${lead.phone}
🏢 <b>Kompaniya:</b> ${lead.company || '—'}
📋 <b>Manba:</b> ${lead.source || 'Sayt'}
🕐 <b>Vaqt:</b> ${timestamp}

<i>Admin panelda ko'rish uchun: /admin/leads</i>`;
}
