import type { VercelRequest, VercelResponse } from '@vercel/node'

const symbols = new Set(['2330', '2454', '0050', '00878', '00919'])
interface Row { Date: string; Code: string; Name: string; ClosingPrice: string; Change: string; TradeVolume: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  try {
    const response = await fetch('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL', { signal: AbortSignal.timeout(6500) })
    if (!response.ok) throw new Error('TWSE unavailable')
    const rows = await response.json() as Row[]
    const quotes = rows.filter(row => symbols.has(row.Code) && /^\d{7}$/.test(row.Date)).map(row => ({
      symbol: row.Code, name: row.Name, close: row.ClosingPrice, change: row.Change, volume: row.TradeVolume,
      date: (1911 + Number(row.Date.slice(0, 3))) + '-' + row.Date.slice(3, 5) + '-' + row.Date.slice(5),
    }))
    if (!quotes.length) throw new Error('TWSE empty')
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=120')
    return res.json(quotes)
  } catch {
    return res.status(502).json({ message: '證交所行情暫時無法載入。' })
  }
}
