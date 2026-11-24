<script setup lang="ts">
import { ref } from 'vue'
import { trackEvent } from '@/composables/useAnalytics'
import { frontendWorks, workPaths, type WorkSlug } from '@/data/frontendWorks'
import HomeProfileSections from '@/components/sections/HomeProfileSections.vue'
import ProfileSnow from '@/components/sections/ProfileSnow.vue'
import { siteConfig } from '@/config/site'
import { blogPosts } from '@/data/blog'

const gitVersion = __GIT_VERSION__
const heroHovered = ref(false)

const featuredWorks = frontendWorks.slice(0, 2)
const otherWorks = frontendWorks.slice(2)
const details: Record<WorkSlug, string> = {
  'patient-journey': '把治療時間軸、檢驗與影像放進同一個病患工作台。四格影像視窗可獨立切換，便於並排查看。',
  hms: '切換病區與班次，床位表與排班合計同步更新。',
  iboxpost: '從會員登入、地址驗證到寄件查詢，以及營運人員使用的後台。',
  'maia-inference': '模型選擇、檔案上傳與影像預覽。',
  'gene-rule': '病患資料查詢與規則瀏覽。',
  'demi-studio': '攝影品牌網站、作品集與內容管理。',
  dayform: '居家選物電商、優惠活動與展示結帳。',
}
</script>

<template>
  <div class="home-surface">
  <section id="home" class="masthead">
    <div aria-hidden="true" class="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px] animate-float"></div>
    <div aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[100px] animate-float-delayed"></div>
    <div aria-hidden="true" class="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px] animate-pulse-glow"></div>
    <ProfileSnow :paused="heroHovered" />
    <div class="home-frame masthead-grid">
      <div class="masthead-copy">
        <h1>JR JIM <span>許智鈞</span></h1>
        <ul class="hero-roles" aria-label="專業角色">
          <li v-for="role in siteConfig.roles" :key="role">{{ role }}</li>
        </ul>
        <p v-if="gitVersion" class="git-version">Git 版號 <code>{{ gitVersion }}</code></p>
        <div class="masthead-actions">
          <RouterLink to="/resume" class="hero-button">看完整履歷 <span aria-hidden="true">↗</span></RouterLink>
          <RouterLink to="/works" class="hero-contact">看作品案例 <span aria-hidden="true">→</span></RouterLink>
        </div>
      </div>

      <div class="hero-orbit" aria-hidden="true">
        <span class="hero-monogram"
          @pointerenter="heroHovered = true" @pointerleave="heroHovered = false" @pointercancel="heroHovered = false">JR.</span>
      </div>
    </div>
  </section>

  <nav class="home-frame profile-nav" aria-label="首頁內容">
    <RouterLink to="/#career">職涯時間軸</RouterLink>
    <RouterLink to="/#skills">技能專區</RouterLink>
    <RouterLink to="/#testimonials">合作方式</RouterLink>
  </nav>
  <HomeProfileSections>
    <template #career-card>
        <div class="profile-board" aria-labelledby="profile-title">
          <div class="profile-monogram" aria-hidden="true">JR.</div>
          <div class="profile-board-copy">
            <h2 id="profile-title">Jr Jim <span>Frontend Engineer × AI Product Builder</span></h2>
            <dl>
              <div><dt>開發領域</dt><dd>醫療、物流與企業系統</dd></div>
              <div><dt>主要技術</dt><dd>Vue、TypeScript、REST API</dd></div>
              <div><dt>近期方向</dt><dd>前端重構與 AI 工具開發</dd></div>
            </dl>
          </div>
        </div>
    </template>
  </HomeProfileSections>

  <section id="enterprise" class="home-frame work-section">
    <header class="section-header">
      <h2>精選作品</h2>
      <RouterLink to="/works" class="text-link">更多案例 <span aria-hidden="true">↗</span></RouterLink>
    </header>

    <div class="work-grid">
      <article v-for="work in featuredWorks" :key="work.slug" class="work-card" :class="'card-' + work.slug">
        <div class="card-media">
          <img :src="'/case-previews/' + work.slug + '.jpg'" :alt="work.title + '展示畫面'" width="1440" height="810" loading="lazy">
        </div>
        <div class="card-body">
          <p class="work-area">{{ work.area }}</p>
          <h3>{{ work.title }}</h3>
          <p class="work-description">{{ details[work.slug] }}</p>
          <div class="card-links">
            <a :href="workPaths(work.slug).fullDemo" target="_blank" rel="noopener" :aria-label="'查看專案：' + work.title + '（另開分頁）'" class="text-link" @click="trackEvent('project_open', { project_slug: work.slug })">查看專案 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </article>
    </div>

    <ul class="work-index">
      <li v-for="work in otherWorks" :key="work.slug">
        <a :href="workPaths(work.slug).fullDemo" target="_blank" rel="noopener" :aria-label="'查看專案：' + work.title + '（另開分頁）'" class="index-row" @click="trackEvent('project_open', { project_slug: work.slug })">
          <span class="index-title">{{ work.title }}</span>
          <span class="index-description">{{ details[work.slug] }}</span>
          <span class="index-arrow" aria-hidden="true">↗</span>
        </a>
      </li>
    </ul>
  </section>

  <div class="home-frame profile-grid">
    <section id="about">
      <h2>關於與履歷</h2>
      <p>查看個人介紹、工作經歷與學歷。</p>
      <RouterLink to="/resume" class="text-link">看工作經歷 <span aria-hidden="true">↗</span></RouterLink>
    </section>
    <section id="ai-products">
      <h2>AI 產品</h2>
      <p>查看我獨立開發的 AI 工具，以及各產品目前的功能與體驗方式。</p>
      <RouterLink to="/products" class="text-link">瀏覽 AI 產品 <span aria-hidden="true">↗</span></RouterLink>
    </section>
  </div>
  <section id="contact" class="home-frame contact-section">
    <div class="contact-band">
      <h2>有前端專案想討論？</h2>
      <RouterLink to="/contact" class="hero-button">聯絡合作 <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </section>
  <section id="blog" class="home-frame work-section">
    <header class="section-header">
      <h2>相關筆記</h2>
      <RouterLink to="/articles" class="text-link">全部筆記 <span aria-hidden="true">↗</span></RouterLink>
    </header>
    <ul class="work-index">
      <li v-for="post in blogPosts.slice(0, 4)" :key="post.id">
        <RouterLink :to="'/articles/' + post.id" class="index-row">
        <div>
          <p class="work-area">{{ post.category }}</p>
          <h3 class="index-title">{{ post.title }}</h3>
        </div>
        <p class="index-description">{{ post.excerpt }}</p>
          <span class="index-arrow" aria-hidden="true">↗</span>
        </RouterLink>
      </li>
    </ul>
  </section>
  </div>
</template>

<style scoped>
.home-frame { width: min(100% - 3rem, 80rem); margin-inline: auto; }
.home-surface { background: #f7f7f5; color: #171925; }
:global(.dark .home-surface) { background: #0b0b0d; color: #f4f3f6; }
.masthead {
  position: relative;
  overflow: hidden;
  background: #0b0b0d;
  color: #f7f7fa;
}
.masthead-grid {
  position: relative;
  display: grid;
  grid-template-columns: .92fr 1.08fr;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-block: clamp(2.6rem, 4.7vw, 5.25rem);
}
.masthead h1 { font-size: clamp(3.6rem, 7vw, 7.3rem); font-weight: 850; line-height: 1.06; letter-spacing: -.065em; }
.masthead h1 span { display: block; margin-top: .23em; color: #f7f7fa; font-size: .76em; letter-spacing: -.04em; }
.hero-roles { display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 1.5rem; }
.hero-roles li { padding: .43rem .85rem; color: #f5e9cb; border: 1px solid #d4af3763; border-radius: 99rem; font-size: 1rem; font-weight: 650; }
.git-version { margin-top: .8rem; color: #d3cfe2; font-size: .95rem; }
.git-version code { margin-left: .35rem; color: #f2db9a; }
.masthead-actions, .card-links { display: flex; flex-wrap: wrap; align-items: center; gap: .8rem 1.4rem; }
.masthead-actions { margin-top: 1.75rem; }
.hero-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .86rem 1.25rem; border-radius: 99rem; background: #e6c776; color: #1b1710; font-weight: 800; transition: background .2s, transform .2s; }
.hero-button:hover { background: #f4db9a; transform: translateY(-2px); }
.hero-contact { color: #fff; font-weight: 650; padding-block: .8rem; }
.hero-contact:hover { text-decoration: underline; text-underline-offset: .27em; }
.hero-orbit, .profile-monogram {
  background-image: radial-gradient(circle at 15% 27%, #d4af37 0 2px, transparent 3px), radial-gradient(circle at 78% 19%, #d4af37 0 2px, transparent 3px), radial-gradient(circle at 83% 70%, #d4af37 0 2px, transparent 3px), repeating-linear-gradient(26deg, transparent 0 62px, #d4af3726 63px, transparent 64px), repeating-linear-gradient(115deg, transparent 0 77px, #d4af3729 78px, transparent 79px);
}
.hero-orbit { position: relative; display: grid; place-items: center; width: min(100%, 29rem); aspect-ratio: 1.5; justify-self: center; mask-image: radial-gradient(ellipse, #000 40%, #0008 65%, transparent 78%); }
.hero-orbit::after { content: ''; position: absolute; inset: 0 25%; border-right: 1px solid #e3bd63; border-radius: 50%; transform: rotate(22deg); pointer-events: none; }
.hero-monogram, .profile-monogram { color: #e6c776; font-family: Georgia, serif; font-weight: 700; letter-spacing: -.1em; }
.hero-monogram { display: block; font-size: clamp(5rem, 13vw, 12rem); line-height: 1; padding-right: .1em; }
.profile-monogram { display: grid; place-items: center; border-right: 1px solid #d4af3770; font-size: clamp(2.9rem, 8vw, 6rem); padding-right: .12em; }
@media (prefers-reduced-motion: no-preference) {
  .hero-monogram {
    background: linear-gradient(112deg, #e6c776 36%, #fff9df 48%, #fff 51%, #e6c776 64%);
    background-size: 300% 100%;
    background-clip: text;
    color: transparent;
    animation: monogram-flash 3s ease-out infinite;
  }
  @keyframes monogram-flash {
    0%, 73.333% { background-position: 100% 0; filter: drop-shadow(0 0 0 transparent); }
    85% { filter: drop-shadow(0 0 14px #fff0ab80); }
    to { background-position: 0 0; filter: drop-shadow(0 0 0 transparent); }
  }
}
.profile-board { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); max-width: 39rem; margin: 2rem auto 0; overflow: hidden; border-radius: 1.45rem; background: #0d1117; color: #f7f7f5; border: 1px solid #d4af3759; box-shadow: 0 14px 35px #0d111730; }
.profile-board-copy { padding: clamp(1rem, 2.5vw, 2rem); }
.profile-board h2 { font-size: clamp(1.35rem, 3vw, 2.5rem); font-weight: 800; }
.profile-board h2 span { display: block; color: #e6c776; font-size: .82rem; }
.profile-board dl { margin-top: 1.15rem; }
.profile-board dl > div { border-top: 1px solid #d4af3750; padding-block: .63rem; }
.profile-board dt { color: #d5bd86; font-size: .75rem; }
.profile-board dd { margin: .18rem 0 0; font-size: .88rem; }
.card-media img { display: block; width: 100%; height: auto; }
.profile-nav { display: flex; flex-wrap: wrap; gap: .4rem 1.5rem; padding-block: 1.35rem .65rem; }
.profile-nav a { font-size: 1.05rem; font-weight: 700; padding-block: .55rem; }
.profile-nav a:hover { text-decoration: underline; text-underline-offset: .3em; }
.work-section { padding-block: clamp(2.75rem, 5vw, 5.25rem); }
.section-header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: .6rem 1rem; padding-bottom: 1.1rem; border-bottom: 1px solid var(--home-line); }
.section-header h2, .contact-band h2 { font-size: clamp(1.8rem, 3.5vw, 3.2rem); font-weight: 800; letter-spacing: -.055em; }
.work-section, .profile-grid { --home-line: #30244838; --home-muted: #555264; --home-link: #443797; }
:global(.dark .work-section), :global(.dark .profile-grid) { --home-line: #baa9ef35; --home-muted: #cbc5d8; --home-link: #c6baf8; }
.text-link { color: var(--home-link); font-weight: 750; }
.text-link:hover { text-decoration: underline; text-underline-offset: .25em; }
.work-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2.8vw, 2.5rem); align-items: start; margin-top: 1.6rem; }
.work-card { min-width: 0; }
.card-media { display: block; overflow: hidden; padding: clamp(.8rem, 2.1vw, 1.85rem); background: #e8e6f2; border-radius: 1.35rem; border: 1px solid #4a39682b; }
.card-iboxpost .card-media { background: #eeeaf6; }
:global(.dark .card-demi-studio .card-media) { background: #252334; }
:global(.dark .card-iboxpost .card-media) { background: #302741; }
.card-media img { border-radius: .35rem; box-shadow: 0 10px 23px #1c213335; transition: transform .25s; }
.work-card:focus-within .card-media img { transform: scale(1.025); }
.card-body { padding-block: 1rem 1.5rem; }
.work-area { color: var(--home-muted); font-size: .82rem; font-weight: 650; }
.work-card h3 { margin-top: .3rem; font-size: clamp(1.4rem, 2.2vw, 2rem); font-weight: 800; }
.work-description { color: var(--home-muted); line-height: 1.65; margin-block: .4rem .8rem; }
.card-links { font-size: .9rem; }
.work-index { border-top: 1px solid var(--home-line); }
.index-row { display: grid; grid-template-columns: minmax(10rem, .62fr) 1.38fr auto; align-items: center; gap: .8rem 1.25rem; padding: 1rem .4rem; border-bottom: 1px solid var(--home-line); transition: background .2s; }
.index-row:hover { background: #8193ff20; }
.index-title { font-size: 1.05rem; font-weight: 800; }
.index-description { color: var(--home-muted); font-size: .88rem; line-height: 1.65; }
.index-arrow { color: var(--home-link); font-size: 1.3rem; }
.profile-grid { display: grid; grid-template-columns: 1fr 1fr; border-block: 1px solid var(--home-line); }
.profile-grid section { padding: 1.75rem clamp(0rem, 2.5vw, 2.1rem) 1.75rem 0; }
.profile-grid section + section { padding-left: clamp(1rem, 2.5vw, 2.1rem); border-left: 1px solid var(--home-line); }
.profile-grid h2 { font-size: 1.4rem; font-weight: 800; }
.profile-grid p { margin-block: .4rem .8rem; color: var(--home-muted); line-height: 1.75; }
.contact-section { padding-block: clamp(2.75rem, 5vw, 5rem); }
.contact-band { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; padding: clamp(1.35rem, 4vw, 3.5rem); border-radius: 1.6rem; background: #201b37; color: #f7f7fa; }
@media (max-width: 800px) {
  .masthead-grid { grid-template-columns: 1fr; }
  .hero-orbit { display: none; }
}
@media (max-width: 600px) {
  .home-frame { width: calc(100% - 2rem); }
  .masthead h1 { font-size: clamp(3.3rem, 12vw, 4.5rem); }
  .work-grid, .profile-grid { grid-template-columns: 1fr; }
  .profile-grid section + section { padding-left: 0; border-top: 1px solid var(--home-line); border-left: 0; }
  .index-row { grid-template-columns: 1fr auto; gap: .25rem .6rem; }
  .index-description { grid-row: 2; }
  .index-arrow { grid-column: 2; grid-row: 1 / span 2; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-button, .card-media img, .index-row { transition: none; }
}
</style>
