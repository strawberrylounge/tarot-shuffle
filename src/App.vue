<script setup>
import { ref } from "vue";
import TarotCard from "./components/TarotCard.vue";
import { drawRandom } from "./data/tarot.js";
import { useShake } from "./composables/useShake.js";

const drawnCard = ref(null);
const drawCount = ref(0);
const isAnimating = ref(false);

function draw() {
  if (isAnimating.value) return;
  isAnimating.value = true;
  drawnCard.value = drawRandom();
  drawCount.value++;
  // 플립 애니메이션 시간(650ms)만큼 잠금
  setTimeout(() => {
    isAnimating.value = false;
  }, 750);
}

const { isGranted, needsPermission, requestPermission } = useShake(draw);
</script>

<template>
  <main>
    <header class="app-header">
      <h1 class="app-title">✦ Tarot ✦</h1>
    </header>

    <section class="stage" @click="draw">
      <!-- 카드 미뽑힌 상태: 덱 시각화 -->
      <div v-if="!drawnCard" class="deck-container">
        <div
          v-for="i in 6"
          :key="i"
          class="deck-stack-card"
          :style="{
            transform: `rotate(${(i - 3.5) * 2}deg) translateY(${(i - 3.5) * 2}px)`,
            zIndex: i,
          }"
        ></div>
        <p class="draw-hint">탭하거나 흔들어서 카드 뽑기</p>
      </div>

      <!-- 뽑힌 카드 -->
      <TarotCard v-else :card="drawnCard" :key="drawCount" />
    </section>

    <footer class="controls">
      <button class="btn-draw" @click.stop="draw" :disabled="isAnimating">
        {{ drawnCard ? "다시 뽑기" : "카드 뽑기" }}
      </button>

      <!-- iOS: 흔들기 권한 버튼 -->
      <button
        v-if="needsPermission && !isGranted"
        class="btn-shake"
        @click.stop="requestPermission"
      >
        흔들기 활성화
      </button>
    </footer>
  </main>
</template>

<style scoped>
main {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.app-header {
  padding: 32px 0 16px;
}

.app-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #d4af37;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
}

/* 덱 */
.deck-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: relative;
}

.deck-stack-card {
  position: absolute;
  width: 200px;
  height: 340px;
  border-radius: 12px;
  background: #1a0e2e;
  border: 2px solid #d4af37;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

/* 덱 높이 확보용 빈 박스 */
.deck-container::before {
  content: "";
  display: block;
  width: 200px;
  height: 340px;
}

.draw-hint {
  position: relative;
  font-size: 0.85rem;
  color: rgba(212, 175, 55, 0.5);
  letter-spacing: 0.05em;
  margin: 0;
  margin-top: 360px;
}

/* 컨트롤 */
.controls {
  padding: 24px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.btn-draw {
  padding: 14px 40px;
  border-radius: 50px;
  border: 1px solid #d4af37;
  background: transparent;
  color: #d4af37;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}

.btn-draw:hover:not(:disabled) {
  background: rgba(212, 175, 55, 0.1);
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
}

.btn-draw:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-shake {
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.btn-shake:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.8);
}
</style>
