<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { categories, content, saveContent } from '@/utils/showcaseContent'

const route = useRoute()
const section = computed(() => ({ news: 'news', faq: 'faq', ads: 'home' })[route.path.split('/').at(-1)])
const titles = { news: '最新消息管理', faq: 'Q&A 管理', home: '首頁調整' }
const draft = ref({})
const message = ref('')
const error = ref('')
const rows = computed(() => section.value === 'home' ? [] : content.value[section.value] ?? [])
const preview = computed(() => ({ news: '/news', faq: '/faq', home: '/home' })[section.value])

function edit(item) {
  draft.value = { ...item }
  message.value = ''
  error.value = ''
}

function resetEditor() {
  if (section.value === 'home') edit(content.value.home)
  else edit({ title: '', body: '', date: new Date().toISOString().slice(0, 10), category: '0', visible: false })
}

function save() {
  message.value = ''
  error.value = ''
  if (section.value === 'home') {
    if (!draft.value.newsTitle.trim() || !draft.value.newsIntro.trim()) {
      error.value = '請填寫首頁區塊標題與說明。'
      return
    }
  } else if (!draft.value.title.trim() || !draft.value.body.trim()) {
    error.value = '請填寫標題與內容。'
    return
  }
  try {
    if (section.value === 'home') saveContent('home', { ...draft.value })
    else {
      const saved = { ...draft.value, id: draft.value.id ?? Math.max(0, ...rows.value.map(item => item.id)) + 1 }
      const updated = draft.value.id ? rows.value.map(item => item.id === saved.id ? saved : item) : [saved, ...rows.value]
      saveContent(section.value, updated)
      draft.value = { ...saved }
    }
    message.value = '已儲存。可前往前台查看。'
  } catch {
    error.value = '瀏覽器無法儲存設定，請確認儲存空間與權限後再試。'
  }
}

watch(section, resetEditor, { immediate: true })
</script>

<template>
  <section class="editor">
    <header>
      <div><h1>{{ titles[section] }}</h1><p>修改會儲存在此瀏覽器，並套用至 Demo 前台。</p></div>
      <RouterLink :to="preview">查看前台 →</RouterLink>
    </header>
    <div class="editor-grid">
      <aside v-if="section !== 'home'" class="records">
        <button type="button" @click="resetEditor">＋ 新增{{ section === 'news' ? '消息' : '問答' }}</button>
        <button v-for="row in rows" :key="row.id" type="button" :aria-pressed="draft.id === row.id" @click="edit(row)">
          {{ row.title }} <small>{{ row.visible ? '顯示中' : '已隱藏' }}</small>
        </button>
      </aside>
      <form @submit.prevent="save">
        <template v-if="section === 'home'">
          <label>消息區標題<input v-model.trim="draft.newsTitle" required maxlength="60"></label>
          <label>消息區說明<textarea v-model.trim="draft.newsIntro" required maxlength="300"></textarea></label>
          <label class="check"><input v-model="draft.showNews" type="checkbox"> 顯示首頁最新消息</label>
          <label class="check"><input v-model="draft.rotateBanners" type="checkbox"> 自動播放首頁輪播</label>
        </template>
        <template v-else>
          <label>{{ section === 'news' ? '消息標題' : '問題' }}<input v-model.trim="draft.title" required maxlength="140"></label>
          <label v-if="section === 'news'">公告日期<input v-model="draft.date" type="date" required></label>
          <label v-else>問題分類<select v-model="draft.category"><option v-for="category in categories" :key="category.value" :value="category.value">{{ category.label }}</option></select></label>
          <label>{{ section === 'news' ? '消息內容' : '回答' }}<textarea v-model.trim="draft.body" required maxlength="5000" rows="6"></textarea></label>
          <label class="check"><input v-model="draft.visible" type="checkbox"> 在前台顯示</label>
        </template>
        <button type="submit">儲存變更</button>
        <p v-if="message" role="status">{{ message }}</p>
        <p v-if="error" role="alert">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.editor { padding: clamp(.8rem, 2vw, 1.6rem); max-width: 80rem; }
.editor header { display: flex; justify-content: space-between; align-items: start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.editor h1 { margin: 0; font-size: 1.5rem; font-weight: 700; }
.editor p { margin: .35rem 0; color: #4b566a; }
.editor a { color: #a00061; text-decoration: underline; }
.editor-grid { display: flex; flex-wrap: wrap; align-items: start; gap: 1rem; }
.records { display: grid; gap: .5rem; flex: 1 1 200px; min-width: 0; }
.editor form { flex: 2 1 280px; min-width: 0; display: grid; gap: .9rem; background: white; padding: 1.2rem; border: 1px solid #dfe3e9; border-radius: .85rem; }
.editor label { display: grid; gap: .3rem; font-weight: 600; }
.editor label.check { display: flex; align-items: center; }
.editor input:not([type=checkbox]), .editor select, .editor textarea { display: block; width: 100%; border: 1px solid #aeb7c7; border-radius: .45rem; padding: .55rem; font: inherit; font-weight: 400; }
.editor button { cursor: pointer; border-radius: .45rem; padding: .55rem .72rem; border: 1px solid #d7dce5; background: white; color: #29354a; text-align: left; overflow-wrap: anywhere; }
.editor button:hover, .editor button[aria-pressed=true] { background: #fff0f7; border-color: #b11b76; }
.editor button[type=submit] { width: fit-content; color: white; background: #a00061; }
.editor button[type=submit]:hover { background: #7f004c; }
.editor small { display: block; color: #505d70; }
</style>
