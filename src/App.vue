<script setup>
import { ref } from "vue";

import TarotCard from "./components/TarotCard.vue";

import { drawRandom } from "./data/tarot.js";
import { useShake } from "./composables/useShake.js";

const drawnCard = ref(null);
const drawCount = ref(0);
const isAnimating = ref(false);

async function draw() {
  // iOS: 첫 탭에서 모션 권한 요청 (유저 제스처 안에서만 호출 가능)
  if (needsPermission && !isGranted.value) {
    await requestPermission();
  }
  if (isAnimating.value) return;
  isAnimating.value = true;
  drawnCard.value = drawRandom();
  drawCount.value++;
  setTimeout(() => {
    isAnimating.value = false;
  }, 750);
}

const { isGranted, needsPermission, requestPermission } = useShake(draw);
</script>

<template>
  <main>
    <header class="header">
      <h1 class="title">✦ TEST ✦</h1>
    </header>

    <section class="stage" @click="draw">
      <!-- 카드 미뽑힌 상태: 덱 시각화 -->
      <div v-if="!drawnCard" class="deck-container">
        <div class="container-inner">
          <div
            v-for="i in 6"
            :key="i"
            class="deck-stack-card"
            :style="{
              transform: `rotate(${(i - 3.5) * 2}deg) translateY(${(i - 3.5) * 2}px)`,
              zIndex: i,
              '--glow-delay': `${-((i - 1) * 3.5)}s`,
            }"
          ></div>
        </div>
      </div>

      <!-- 뽑힌 카드 -->
      <TarotCard v-else :card="drawnCard" :key="drawCount" />
    </section>

    <div class="controls">
      <p class="draw-hint">탭하거나 흔들어서 카드 뽑기</p>
      <button class="btn-draw" @click.stop="draw" :disabled="isAnimating">
        {{ drawnCard ? "다시 테스트" : "테스트" }}
      </button>

      <!-- iOS: 흔들기 권한 버튼 -->
      <button
        v-if="needsPermission && !isGranted"
        class="btn-shake"
        @click.stop="requestPermission"
      >
        흔들기 활성화
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "./assets/scss/abstracts/index" as *;

main {
  @include flexbox();
  flex-direction: column;
  padding: 0 16px 40px;
  background: color("dark-navy");
  .header {
    margin-bottom: 18px;
    padding: 32px 0 16px;
    .title {
      font-size: rem(24);
      color: color("gold");
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
      letter-spacing: 0.3em;
    }
  }
  .stage {
    @include flexbox(center);
    width: 100%;
    margin-bottom: 16px;
    .deck-container {
      @include flexbox(center);
      flex-direction: column;
      width: 100%;
      .container-inner {
        position: relative;
        @include flexbox(center);
        width: 100%;
        height: 420px;
        max-height: 420px;
        .deck-stack-card {
          position: absolute;
          width: 200px;
          height: 340px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          // 카드 대각선 ≈ 395px → 420px 정사각형을 중앙에 두고 회전
          // overflow: hidden 이 카드 모양으로 클리핑 → border 위를 쓸고 지나가는 효과
          &::before {
            content: "";
            position: absolute;
            width: 420px;
            height: 420px;
            top: 50%;
            left: 50%;
            margin: -210px 0 0 -210px;
            background: conic-gradient(
              from 0deg,
              color("gold-darkest") 0deg,
              color("gold-dark") 60deg,
              color("gold-muted") 100deg,
              color("gold") 130deg,
              color("gold-muted") 160deg,
              color("gold-dark") 200deg,
              color("gold-darkest") 260deg,
              color("gold-darkest") 360deg
            );
            animation: rotate 6s linear var(--glow-delay, 0s) infinite;
          }
          // 카드 이미지로 내부를 덮어 3px 테두리 ring만 노출
          &::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: 10px;
            background: url("/card-back.jpg") center / cover rgba(0, 0, 0, 0.36);
            background-blend-mode: darken;
          }
          // 각 카드 방향 믹스
          &:nth-child(2)::before,
          &:nth-child(3)::before,
          &:nth-child(5)::before {
            animation-direction: reverse;
          }
        }
      }
    }
  }
  .controls {
    @include flexbox(center, center, 12px);
    flex-direction: column;
    .draw-hint {
      font-family: $font-family-kr;
      font-size: rem(14);
      color: color("gold-muted");
    }
    .btn-draw {
      @include flexbox(center);
      width: 120px;
      height: 40px;
      border-radius: 20px;
      border: 1px solid color("gold");
      background: transparent;
      font-family: $font-family-kr;
      color: color("gold");
      cursor: pointer;
      transition:
        background 0.2s,
        box-shadow 0.2s;
      &:hover:not(:disabled) {
        background: rgba(212, 175, 55, 0.1);
        box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
      }
      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
    .btn-shake {
      font-size: rem(12);
      color: color("gold-dark");
      text-decoration: underline;
      transition: color 0.2s;
      cursor: pointer;
      &:hover {
        color: color("gold");
      }
    }
  }
}
</style>
