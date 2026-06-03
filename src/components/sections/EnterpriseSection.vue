<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import EnterpriseProjectCard from '@/components/ui/EnterpriseProjectCard.vue'
import { enterpriseProjects } from '@/data/enterprise'
</script>

<template>
  <section id="enterprise" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Enterprise"
          title="Enterprise Solutions"
          subtitle="企業級醫療、物流與 AI 分析平台 — 展現大型系統前端開發能力。"
          align="center"
        />
      </ScrollReveal>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <ScrollReveal
          v-for="(project, i) in enterpriseProjects"
          :key="project.id"
          :delay="i * 80"
        >
          <EnterpriseProjectCard :project="project" />
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
