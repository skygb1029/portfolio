<script setup lang="ts">
import { careerTimeline } from '@/data/career'
import { skillGroups } from '@/data/skills'
import { blogPosts } from '@/data/blog'
import { feedbackExamples } from '@/data/feedback'

const career = [...careerTimeline].reverse()
const skillTitles: Record<string, string> = { frontend: '前端開發', backend: '後端與 API', devops: '部署與工具', ai: 'AI 與自動化' }
</script>

<template>
  <div class="profile-sections">
    <section id="career" class="profile-section">
      <header class="profile-heading">
        <h2>職涯時間軸</h2>
        <RouterLink to="/resume" class="profile-link">完整履歷 ↗</RouterLink>
      </header>
      <ol class="timeline">
        <li v-for="entry in career" :key="entry.id">
          <div class="timeline-card">
            <p class="timeline-period">{{ entry.period }}</p>
            <h3>{{ entry.company }} <span>{{ entry.role }}</span></h3>
            <ul v-if="entry.highlights?.length" class="highlights">
              <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
        </li>
      </ol>
      <slot name="career-card" />
    </section>

    <section id="skills" class="profile-section">
      <header class="profile-heading"><h2>技能專區</h2></header>
      <div class="skill-grid">
        <article v-for="group in skillGroups" :key="group.id" class="skill-card">
          <h3>{{ skillTitles[group.id] ?? group.title }}</h3>
          <ul>
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="testimonials" class="profile-section">
      <header class="profile-heading"><h2>評價與回饋</h2></header>
        <p class="feedback-note">以下為版面示例。正式回饋待取得授權後更新。</p>
        <div class="feedback-grid">
          <figure v-for="item in feedbackExamples" :key="item.role">
            <blockquote>「{{ item.text }}」</blockquote>
            <figcaption>{{ item.role }}示例</figcaption>
          </figure>
        </div>
    </section>

    <section id="blog" class="profile-section">
      <header class="profile-heading"><h2>技術文章</h2></header>
      <ul class="article-list">
        <li v-for="post in blogPosts" :key="post.id">
          <span class="article-category">{{ post.category }}</span>
          <div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
          </div>
          <span v-if="post.comingSoon" class="article-status">籌備中</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.profile-sections { width: min(100% - 3rem, 80rem); margin-inline: auto; --rule: #30244838; --muted: #555264; --accent: #55449b; --panel: #ece8f6; --track: #9a761e; --career-card: #fff; }
:global(.dark .profile-sections) { --rule: #baa9ef35; --muted: #cbc5d8; --accent: #c6baf8; --panel: #1f1b2d; --track: #d4af37; --career-card: #15141c; }
.profile-section { padding-block: clamp(1.75rem, 3.4vw, 3.15rem); }
.profile-heading { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: .65rem 1rem; border-bottom: 1px solid var(--rule); padding-bottom: 1rem; }
.profile-heading h2 { font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -.045em; }
.profile-link { color: var(--accent); font-weight: 750; }
.profile-link:hover { text-decoration: underline; text-underline-offset: .25em; }
.timeline { max-width: 62rem; margin: 1.5rem auto 0; list-style: none; }
.timeline > li { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 5rem minmax(0, 1fr); padding-bottom: .45rem; }
.timeline-card { grid-column: 1; min-width: 0; padding: 1rem 1.45rem; border: 1px solid var(--rule); border-radius: 1.45rem; background: var(--career-card); }
.timeline > li:nth-child(even) .timeline-card { grid-column: 3; }
.timeline > li::before { content: ''; position: absolute; width: 1.45rem; inset: 1.65rem auto -1.65rem 50%; border: 2px solid var(--track); border-left: 0; border-radius: 0 100% 100% 0 / 0 50% 50% 0; }
.timeline > li:nth-child(even)::before { transform: translateX(-100%) rotate(180deg); }
.timeline > li:last-child::before { display: none; }
.timeline > li::after { content: ''; position: absolute; z-index: 1; top: 1.65rem; left: 50%; width: .75rem; height: .75rem; transform: translate(-50%, -50%); border: 2px solid var(--track); border-radius: 50%; background: var(--career-card); }
.timeline > li:first-child::after { background: var(--track); }
.timeline-period { color: var(--accent); font-size: 1rem; font-weight: 750; font-variant-numeric: tabular-nums; }
.timeline-card h3 { margin-top: .35rem; }
.timeline h3, .skill-card h3, .article-list h3 { font-size: 1.2rem; font-weight: 800; }
.timeline h3 span { margin-left: .5rem; color: var(--muted); font-size: 1rem; font-weight: 550; }
.highlights { display: grid; gap: .45rem; margin-top: .65rem; color: var(--muted); font-size: 1rem; line-height: 1.75; }
.skill-grid, .feedback-grid { display: grid; gap: .9rem; margin-top: 1rem; }
.skill-grid { grid-template-columns: 1.3fr 1fr; }
.skill-card { padding: clamp(1rem, 2.5vw, 1.6rem); border: 1px solid var(--rule); border-radius: 1.35rem; }
.skill-card:first-child { background: var(--panel); }
.skill-card ul { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: .8rem; }
.skill-card li, .article-status { border: 1px solid var(--rule); padding: .32rem .68rem; border-radius: 1rem; font-size: 1rem; }
.feedback-note { margin-top: 1.25rem; color: var(--muted); line-height: 1.65; }
.feedback-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
.feedback-grid figure { display: grid; grid-template-rows: 1fr auto; margin: 0; }
.feedback-grid blockquote { position: relative; margin: 0; padding: 1.4rem; background: var(--panel); border: 1px solid var(--rule); border-radius: 1.45rem; font-size: 1.12rem; line-height: 1.8; }
.feedback-grid blockquote::after { content: ''; position: absolute; inset: auto auto -.52rem 1.6rem; width: .98rem; height: .98rem; border: inherit; border-width: 0 1px 1px 0; background: inherit; transform: rotate(45deg); }
.feedback-grid figcaption { margin: 1rem 0 .15rem 1.05rem; color: var(--muted); font-size: 1rem; }
.article-list > li { display: grid; grid-template-columns: minmax(6rem, .28fr) 1fr auto; gap: .6rem 1rem; align-items: start; padding: 1rem 0; border-bottom: 1px solid var(--rule); }
.article-category { color: var(--accent); font-size: 1rem; font-weight: 750; }
.article-list p { margin-top: .45rem; color: var(--muted); font-size: 1rem; line-height: 1.7; }
.article-status { color: var(--muted); white-space: nowrap; }
@media (max-width: 650px) {
  .profile-sections { width: calc(100% - 2rem); }
  .timeline > li { grid-template-columns: 2.35rem minmax(0, 1fr); padding-bottom: .65rem; }
  .timeline > li .timeline-card, .timeline > li:nth-child(even) .timeline-card { grid-column: 2; padding-inline: 1rem; }
  .timeline > li::before, .timeline > li::after { left: 1.05rem; }
  .timeline > li::before { width: .8rem; }
  .skill-grid, .feedback-grid { grid-template-columns: 1fr; gap: .5rem; }
  .feedback-grid { gap: 1.35rem; }
  .article-list > li { grid-template-columns: 1fr auto; }
  .article-list > li > div { grid-row: 2; grid-column: 1 / -1; }
  .article-status { grid-column: 2; grid-row: 1; }
}
</style>
