export interface StockAnalysisResult {
  symbol: string
  name: string
  direction: '偏多' | '偏空' | '中性'
  probability: number
  reasons: string[]
  risks: string[]
  etfFlow: string
  marketContext: string
  disclaimer: string
}

const STOCK_DB: Record<string, Omit<StockAnalysisResult, 'symbol'>> = {
  '0050': {
    name: '元大台灣50',
    direction: '偏多',
    probability: 62,
    reasons: [
      '法人連續三日買超，半導體權重對指數支撐明顯',
      '美債殖利率回落，風險資產偏好回升',
      '技術面守穩月線，短線震盪偏多整理',
    ],
    risks: ['美國 CPI 公布前波動加大', '台幣急升壓縮外資買盤', '電子權值高檔獲利了結'],
    etfFlow: '近 5 日淨流入約 8.4 億，持股調整幅度溫和，金融股小幅增碼。',
    marketContext: '大盤量縮價穩，資金輪動至權值與高股息標的。',
    disclaimer: '本分析為 AI Demo 模擬格式，非投資建議。',
  },
  '00919': {
    name: '群益台灣精選高息',
    direction: '中性',
    probability: 54,
    reasons: [
      '高股息策略受存股族關注，殖利率具吸引力',
      '近期換股聚焦金融與傳產，防禦性配置增加',
      '除息行情將至，短線留意填息參與度',
    ],
    risks: ['利率政策轉折影響高股息族群', '成分股獲利下修風險', '大盤回檔時 Beta 相對低但仍受拖累'],
    etfFlow: '主動換股比例較上週上升約 12%，金融股為主要增碼方向。',
    marketContext: '資金尋求收益，高股息 ETF 吸金但漲幅溫和。',
    disclaimer: '本分析為 AI Demo 模擬格式，非投資建議。',
  },
  '2330': {
    name: '台積電',
    direction: '偏多',
    probability: 68,
    reasons: [
      '法說釋出先進製程進度優於市場預期',
      'AI 相關訂單能見度延續，外資調升目標價',
      'ADR 相對強勢，帶動台股權值信心',
    ],
    risks: ['地緣政治與出口管制不確定性', '資本支出高峰壓抑短期本益比', '580–600 區間壓力帶賣壓'],
    etfFlow: '0050、0056 等權值 ETF 持續增持台积电比重。',
    marketContext: '半導體為盤面核心，個股表現牽動指數方向。',
    disclaimer: '本分析為 AI Demo 模擬格式，非投資建議。',
  },
}

export function analyzeStock(symbol: string): StockAnalysisResult {
  const key = symbol.trim().toUpperCase()
  const base = STOCK_DB[key]
  if (base) {
    return { symbol: key, ...base }
  }
  const hash = key.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  const prob = 45 + (hash % 30)
  return {
    symbol: key,
    name: `${key}（Demo）`,
    direction: prob >= 58 ? '偏多' : prob <= 42 ? '偏空' : '中性',
    probability: prob,
    reasons: [
      `AI 掃描 ${key} 相關新聞與籌碼，短線動能中性`,
      '正式版將串接即時行情、法人買賣超與事件日曆',
    ],
    risks: ['資料覆蓋不足時分析信心度下降', '請以正式版晨報為準'],
    etfFlow: 'ETF 成分調整與資金流將於正式版提供。',
    marketContext: '此為 Product Hub Demo API 回應格式展示。',
    disclaimer: '本分析為 AI Demo 模擬格式，非投資建議。',
  }
}
