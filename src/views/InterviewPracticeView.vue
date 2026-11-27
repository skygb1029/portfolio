<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { practiceCounts, practiceTopics } from '@/data/interviewPractice'

const activeTopic = ref('all')
const search = ref('')
const audioModes = [
  { value: 'answers', label: '題目與解答' },
  { value: 'questions', label: '只有題目' },
] as const
const audioMode = ref<(typeof audioModes)[number]['value']>('answers')
const audioLabel = computed(() => audioModes.find(mode => mode.value === audioMode.value)!.label)
const allPrompts = practiceTopics.flatMap(topic => topic.questions.map(question => question.prompt))
const expandedAnswers = ref(new Set<string>())
let playing: HTMLAudioElement | null = null

const shownTopics = computed(() => {
  const terms = search.value.trim().toLocaleLowerCase()
  return practiceTopics
    .filter(topic => activeTopic.value === 'all' || topic.id === activeTopic.value)
    .map(topic => ({
      ...topic,
      questions: terms
        ? topic.questions.filter(question => (topic.title + ' ' + question.prompt).toLocaleLowerCase().includes(terms))
        : topic.questions,
    }))
    .filter(topic => topic.questions.length > 0)
})
const visibleCount = computed(() => shownTopics.value.reduce((sum, topic) => sum + topic.questions.length, 0))

function setAllAnswers(open: boolean) {
  expandedAnswers.value = new Set(open ? allPrompts : [])
}

function trackAnswer(event: Event, prompt: string) {
  const details = event.currentTarget
  if (!(details instanceof HTMLDetailsElement) || !details.isConnected) return
  if (details.open) expandedAnswers.value.add(prompt)
  else expandedAnswers.value.delete(prompt)
}

function audioStarted(event: Event) {
  const player = event.currentTarget
  if (!(player instanceof HTMLAudioElement)) return
  if (playing && playing !== player) playing.pause()
  playing = player
}

function stopAudio() {
  playing?.pause()
  playing = null
}

watch(shownTopics, topics => {
  if (playing && !topics.some(topic => topic.id === playing?.dataset.topic)) stopAudio()
})
watch(audioMode, stopAudio, { flush: 'sync' })
onBeforeUnmount(stopAudio)

const audioUrl = (id: string) => '/interview-audio/' + id + (audioMode.value === 'questions' ? '-questions' : '') + '.mp3'
</script>

<template>
  <div class="practice">
    <header class="practice-hero">
      <div class="practice-frame">
        <RouterLink class="back-link" to="/">← 回作品集</RouterLink>
        <h1>前端面試練習</h1>
        <p>先試著回答，再展開參考答案。每個主題都可直接播放或下載到手機複習。</p>
        <ul class="practice-totals" aria-label="題庫規模">
          <li><strong>{{ practiceCounts.technical }}</strong> 技術題</li>
          <li><strong>{{ practiceCounts.conversation }}</strong> 面談題</li>
          <li><strong>{{ practiceCounts.exercise }}</strong> 實作題</li>
          <li><strong>{{ practiceTopics.length * audioModes.length }}</strong> 支 MP3</li>
        </ul>
      </div>
    </header>

    <div class="practice-frame practice-content">
      <div class="practice-tools">
        <label for="practice-search">搜尋題目<span class="sr-only">或主題</span></label>
        <input id="practice-search" v-model="search" type="search" placeholder="例如 Hydration、Pinia、薪資">
        <label class="practice-topic-select" for="practice-topic">複習主題
          <select id="practice-topic" v-model="activeTopic" aria-label="複習主題">
            <option value="all">全部主題</option>
            <option v-for="topic in practiceTopics" :key="topic.id" :value="topic.id">{{ topic.title }}</option>
          </select>
        </label>
        <div class="practice-filters" role="group" aria-label="選擇複習主題">
          <button type="button" :aria-pressed="activeTopic === 'all'" @click="activeTopic = 'all'">全部主題</button>
          <button v-for="topic in practiceTopics" :key="topic.id" type="button"
            :aria-pressed="activeTopic === topic.id" @click="activeTopic = topic.id">{{ topic.title }}</button>
        </div>
        <fieldset class="practice-audio-modes">
          <legend>MP3 版本</legend>
          <div class="practice-actions">
            <label v-for="mode in audioModes" :key="mode.value" class="audio-mode">
              <input v-model="audioMode" type="radio" name="practice-audio-mode" :value="mode.value">
              {{ mode.label }}
            </label>
          </div>
          <p v-if="audioMode === 'questions'" class="practice-count">每題後停約 8 秒，留時間口頭作答。</p>
        </fieldset>
        <div class="practice-answer-bar">
          <p class="practice-count" role="status">顯示 {{ visibleCount }} 題</p>
          <div class="practice-actions answer-actions" role="group" aria-label="全部文字答案">
            <button type="button" :disabled="expandedAnswers.size === allPrompts.length" @click="setAllAnswers(true)">展開全部答案</button>
            <button type="button" :disabled="!expandedAnswers.size" @click="setAllAnswers(false)">隱藏全部答案</button>
          </div>
        </div>
      </div>

      <p v-if="!shownTopics.length" class="practice-empty">沒有符合的題目。換個關鍵字或切回全部主題。</p>
      <section v-for="topic in shownTopics" :key="topic.id" class="practice-topic" :aria-labelledby="'heading-' + topic.id">
        <div class="topic-heading">
          <h2 :id="'heading-' + topic.id">{{ topic.title }}</h2>
          <span>{{ topic.questions.length }} 題</span>
        </div>
        <div class="topic-audio">
          <audio :key="audioMode" controls preload="none" :src="audioUrl(topic.id)" :data-topic="topic.id"
            :aria-label="topic.title + ' ' + audioLabel" @play="audioStarted"></audio>
          <a :href="audioUrl(topic.id)" download
            :aria-label="'下載 ' + topic.title + ' ' + audioLabel + ' MP3'">下載 MP3 <span class="audio-version">{{ audioLabel }}</span><span aria-hidden="true">↓</span></a>
        </div>
        <ol class="question-list">
          <li v-for="question in topic.questions" :key="question.prompt">
            <details :open="expandedAnswers.has(question.prompt)" @toggle="trackAnswer($event, question.prompt)">
              <summary>{{ question.prompt }}</summary>
              <div class="answer">
                <h3>參考答案</h3>
                <p>{{ question.answer }}</p>
                <pre v-if="question.example" tabindex="0" aria-label="JavaScript 參考程式"><code>{{ question.example }}</code></pre>
              </div>
            </details>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.practice {
  --practice-text: #171925;
  --practice-muted: #50546d;
  --practice-bg: #f7f7f5;
  --practice-card: #fff;
  --practice-border: #dadce5;
  --practice-accent: #4338aa;
  --practice-selected: #eeeafe;
  background: var(--practice-bg);
  color: var(--practice-text);
  min-height: 85vh;
}
:global(.dark .practice) {
  --practice-text: #f0eef5;
  --practice-muted: #babbd0;
  --practice-bg: #0b0b0d;
  --practice-card: #181820;
  --practice-border: #363542;
  --practice-accent: #c2bbff;
  --practice-selected: #302743;
}
.practice-frame { width: min(100% - 2rem, 67rem); margin-inline: auto; }
.practice-hero { padding-block: clamp(2.2rem, 6vw, 5rem); background: #151322; color: #f8f7ff; }
.back-link { color: #d4ccff; font-size: .94rem; }
h1 { font-size: clamp(2.2rem, 6vw, 4.5rem); font-weight: 800; letter-spacing: -.035em; margin-top: 1.5rem; line-height: 1.15; }
.practice-hero p { color: #e0daec; margin-top: .95rem; max-width: 36rem; line-height: 1.8; }
.practice-totals { display: flex; flex-wrap: wrap; gap: .5rem 1.3rem; padding: 0; margin: 1.4rem 0 0; list-style: none; color: #e1daec; }
.practice-totals strong { font-size: 1.2rem; color: #f8f7ff; }
.practice-content { padding-block: 1.8rem 4rem; }
.practice-tools { display: grid; gap: .6rem; margin-bottom: 1.55rem; }
.practice-tools label { font-weight: 700; }
.practice-tools :is(input[type=search], select) { width: min(100%, 29rem); min-height: 44px; padding: .65rem .85rem; border: 1px solid var(--practice-border); border-radius: .55rem; background: var(--practice-card); }
.practice-tools input::placeholder { color: var(--practice-muted); }
.practice-topic-select { display: none; }
.practice-filters { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: .25rem; }
.practice-filters button, .practice-actions :is(button, .audio-mode) { min-height: 44px; border: 1px solid var(--practice-border); padding: .45rem .75rem; border-radius: .55rem; background: var(--practice-card); cursor: pointer; }
.practice-filters button[aria-pressed=true], .audio-mode:has(:checked) { background: var(--practice-selected); color: var(--practice-accent); border-color: var(--practice-accent); font-weight: 650; }
.practice-audio-modes { border: 0; padding: 0; margin: .45rem 0 .25rem; }
.practice-audio-modes legend { font-weight: 700; margin-bottom: .45rem; }
.practice-audio-modes p { margin-top: .4rem; }
.practice-actions, .practice-answer-bar { display: flex; flex-wrap: wrap; align-items: center; gap: .45rem; }
.practice-answer-bar { justify-content: space-between; gap: .55rem 1rem; padding-top: .35rem; }
.practice-actions .audio-mode { display: inline-flex; align-items: center; gap: .4rem; font-weight: 600; }
.audio-mode input { accent-color: var(--practice-accent); }
.practice-actions button:disabled { opacity: .55; cursor: default; }
.practice-count, .practice-empty { color: var(--practice-muted); font-size: .92rem; }
.practice-topic { background: var(--practice-card); border: 1px solid var(--practice-border); border-radius: 1rem; padding: clamp(.85rem, 3vw, 1.7rem); margin-block: 1rem; min-width: 0; }
.topic-heading { display: flex; flex-wrap: wrap; align-items: baseline; gap: .35rem 1rem; }
.topic-heading h2 { font-size: clamp(1.2rem, 4vw, 1.65rem); font-weight: 750; }
.topic-heading span { color: var(--practice-muted); font-size: .86rem; }
.topic-audio { display: flex; flex-wrap: wrap; gap: .45rem .85rem; align-items: center; margin-block: .8rem; }
.topic-audio audio { width: min(100%, 21rem); }
.topic-audio a { display: inline-flex; gap: .4rem; align-items: center; min-height: 44px; color: var(--practice-accent); font-weight: 700; text-decoration: underline; text-underline-offset: .2rem; }
.audio-version { color: var(--practice-muted); font-size: .88rem; font-weight: 500; }
.question-list { list-style: none; padding: 0; margin: 0; }
.question-list li { border-top: 1px solid var(--practice-border); }
.question-list summary { cursor: pointer; padding: .8rem .3rem; line-height: 1.6; font-weight: 650; }
.question-list summary::marker { color: var(--practice-accent); }
.answer { padding: .1rem .4rem 1rem; }
.answer h3 { margin-bottom: .35rem; font-size: .88rem; font-weight: 750; color: var(--practice-accent); }
.answer p { line-height: 1.8; }
.answer pre { max-width: 100%; overflow: auto; background: #171625; color: #f8f5ff; border-radius: .5rem; margin-top: .75rem; padding: .8rem; font-size: .87rem; }
.practice :is(a, button, input, select, summary, pre):focus-visible { outline: 2px solid var(--practice-accent); outline-offset: 3px; }
.practice-hero .back-link:focus-visible { outline-color: #cec8ff; }
@media (max-width: 620px) {
  .practice-filters { display: none; }
  .practice-topic-select { display: grid; gap: .45rem; }
}
</style>
