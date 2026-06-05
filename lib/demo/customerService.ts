export interface CustomerServiceResult {
  input: string
  intent: string
  reply: string
  suggestedActions: string[]
  confidence: number
}

const RULES: { match: RegExp; intent: string; reply: string; actions: string[] }[] = [
  {
    match: /價格|多少錢|費用|方案/,
    intent: 'pricing',
    reply:
      '您好！目前主推方案 NT$ 1,280/月（年繳 8 折 NT$ 12,288）。含 AI 自動回覆、CRM 與 3 個通道串接。需要我傳送方案比較表嗎？',
    actions: ['傳送方案 PDF', '安排業務致電', '加入試用名單'],
  },
  {
    match: /運費|配送|出貨|幾天/,
    intent: 'shipping',
    reply: '全台本島滿 NT$ 1,000 免運，一般 2–3 個工作日出貨。離島與偏遠地區另計，下單後會 Email 通知物流單號。',
    actions: ['查詢訂單', '轉人工客服'],
  },
  {
    match: /退貨|退款|鑑賞/,
    intent: 'return',
    reply:
      '收到商品 7 日內可申請鑑賞期退貨，請保留完整包裝與發票。我可以協助您建立退貨單，約 3–5 個工作天完成退款。',
    actions: ['建立退貨單', '上傳照片'],
  },
  {
    match: /試用|demo|體驗/,
    intent: 'trial',
    reply: '歡迎體驗！您可以前往 Product Hub 的 Demo Center 操作模擬客服，或留下 Email 我們安排 14 天試用帳號。',
    actions: ['發送試用連結', '加入等待名單'],
  },
]

export function analyzeCustomerMessage(input: string): CustomerServiceResult {
  const text = input.trim()
  for (const rule of RULES) {
    if (rule.match.test(text)) {
      return {
        input: text,
        intent: rule.intent,
        reply: rule.reply,
        suggestedActions: rule.actions,
        confidence: 0.89,
      }
    }
  }
  return {
    input: text,
    intent: 'general',
    reply: `感謝您的訊息！關於「${text}」— 我們的 AI 會依商品知識庫與客戶紀錄產生個人化回覆。此為 Jr Jim Product Hub Demo API 展示。`,
    suggestedActions: ['轉接專人', '稍後回覆'],
    confidence: 0.72,
  }
}
