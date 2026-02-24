<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
})

const flipped = ref(false)

// 마운트 후 짧은 딜레이로 플립 트리거
onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => { flipped.value = true }, 80)
  })
})

const SUIT_SYMBOL = {
  major:    '✦',
  wands:    '△',
  cups:     '∪',
  swords:   '✕',
  pentacles: '⬡',
}

const SUIT_COLOR = {
  major:    '#d4af37',
  wands:    '#e07040',
  cups:     '#5bc0eb',
  swords:   '#9ab0c0',
  pentacles: '#7ec98a',
}
</script>

<template>
  <div class="card-scene" :class="{ flipped }">
    <div class="card-inner">

      <!-- 뒷면 -->
      <div class="card-face card-back">
        <div class="back-border">
          <div class="back-pattern">
            <span class="back-symbol">✦</span>
          </div>
        </div>
      </div>

      <!-- 앞면 -->
      <div
        class="card-face card-front"
        :style="{ '--suit-color': SUIT_COLOR[card.suit] }"
      >
        <div class="front-border">
          <div class="card-top">
            <span class="suit-symbol">{{ SUIT_SYMBOL[card.suit] }}</span>
            <span class="card-number" v-if="card.suit === 'major'">{{ card.number }}</span>
          </div>

          <div class="card-center">
            <div class="center-symbol">{{ SUIT_SYMBOL[card.suit] }}</div>
          </div>

          <div class="card-name-area">
            <p class="card-name">{{ card.name }}</p>
            <p class="card-suit-label">{{ card.suit.toUpperCase() }}</p>
          </div>

          <div class="card-bottom">
            <span class="suit-symbol rotated">{{ SUIT_SYMBOL[card.suit] }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card-scene {
  width: 200px;
  height: 340px;
  perspective: 1200px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-scene.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* 뒷면 */
.card-back {
  background: #1a0e2e;
  border: 2px solid #d4af37;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 16px rgba(212, 175, 55, 0.15);
}

.back-border {
  margin: 8px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 8px;
  height: calc(100% - 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(212, 175, 55, 0.04) 10px,
    rgba(212, 175, 55, 0.04) 20px
  );
}

.back-symbol {
  font-size: 4rem;
  color: rgba(212, 175, 55, 0.5);
}

/* 앞면 */
.card-front {
  background: #0f0a1e;
  border: 2px solid var(--suit-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px color-mix(in srgb, var(--suit-color) 20%, transparent);
  transform: rotateY(180deg);
}

.front-border {
  margin: 8px;
  border: 1px solid color-mix(in srgb, var(--suit-color) 40%, transparent);
  border-radius: 8px;
  height: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  box-sizing: border-box;
}

.card-top,
.card-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.suit-symbol {
  font-size: 1.1rem;
  color: var(--suit-color);
}

.card-number {
  font-size: 0.75rem;
  color: var(--suit-color);
  opacity: 0.8;
}

.rotated {
  transform: rotate(180deg);
  display: inline-block;
}

.card-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-symbol {
  font-size: 3.5rem;
  color: var(--suit-color);
  opacity: 0.6;
}

.card-name-area {
  text-align: center;
}

.card-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f0e6cc;
  letter-spacing: 0.03em;
  margin: 0 0 2px;
}

.card-suit-label {
  font-size: 0.6rem;
  color: var(--suit-color);
  letter-spacing: 0.15em;
  opacity: 0.7;
  margin: 0;
}
</style>
