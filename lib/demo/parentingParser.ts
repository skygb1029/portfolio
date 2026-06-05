export interface ParentingParseResult {
  input: string
  type: string
  record: Record<string, string | number>
  reminder: string
  reminderAt: string
  confidence: number
}

export function parseParentingInput(input: string): ParentingParseResult {
  const text = input.trim()
  const now = new Date()
  const reminderAt = new Date(now.getTime() + 3 * 60 * 60 * 1000)

  const feeding = text.match(/喝奶|喝\s*(\d+)/)
  if (feeding) {
    const ml = parseInt(text.match(/(\d+)/)?.[1] ?? '120', 10)
    return {
      input: text,
      type: '喝奶紀錄',
      record: {
        category: 'feeding',
        amount_ml: ml,
        logged_at: now.toISOString(),
      },
      reminder: `已排程 ${reminderAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })} 喝奶提醒`,
      reminderAt: reminderAt.toISOString(),
      confidence: 0.94,
    }
  }

  if (/睡著|睡了|入睡/.test(text)) {
    return {
      input: text,
      type: '睡眠紀錄',
      record: {
        category: 'sleep',
        status: 'asleep',
        started_at: now.toISOString(),
      },
      reminder: '將追蹤睡眠時長，醒來後可輸入「醒了」結束紀錄',
      reminderAt: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      confidence: 0.91,
    }
  }

  const temp = text.match(/([\d.]+)\s*度/)
  if (temp) {
    const c = parseFloat(temp[1] ?? '37')
    const high = c >= 38
    return {
      input: text,
      type: '體溫紀錄',
      record: {
        category: 'temperature',
        celsius: c,
        logged_at: now.toISOString(),
      },
      reminder: high
        ? '體溫偏高，建議 30 分鐘後複測並留意活動力'
        : '體溫正常範圍，已記錄於今日曲線',
      reminderAt: new Date(now.getTime() + (high ? 30 : 180) * 60 * 1000).toISOString(),
      confidence: 0.96,
    }
  }

  if (/尿布|換尿布/.test(text)) {
    return {
      input: text,
      type: '尿布紀錄',
      record: { category: 'diaper', logged_at: now.toISOString() },
      reminder: '已記錄，下次建議間隔約 2–3 小時',
      reminderAt: reminderAt.toISOString(),
      confidence: 0.88,
    }
  }

  return {
    input: text,
    type: '未辨識',
    record: { raw: text },
    reminder: '請試試：喝奶120、睡著了、38.2度、換尿布',
    reminderAt: reminderAt.toISOString(),
    confidence: 0.35,
  }
}
