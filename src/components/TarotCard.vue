<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  card: { type: Object, required: true },
});

const flipped = ref(false);
const imageError = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      flipped.value = true;
    }, 80);
  });
});
</script>

<template>
  <div class="card-scene" :class="{ flipped }">
    <div class="card-inner">
      <!-- 뒷면 -->
      <div class="card-face card-back"></div>

      <!-- 앞면 -->
      <div class="card-face card-front">
        <img
          v-if="!imageError"
          :src="card.image"
          :alt="card.name"
          class="card-img"
          @error="imageError = true"
        />
        <div v-else class="card-placeholder">
          <p class="placeholder-suit">{{ card.suit.toUpperCase() }}</p>
          <p class="placeholder-name">{{ card.name }}</p>
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
  background-image: url("/card-back.jpg");
  background-size: cover;
  background-position: center;
  border: 2px solid #d4af37;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

/* 앞면 */
.card-front {
  background: #0f0a1e;
  border: 2px solid #d4af37;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  transform: rotateY(180deg);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* 이미지 없을 때 placeholder */
.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  box-sizing: border-box;
}

.placeholder-suit {
  margin: 0;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: #d4af37;
  opacity: 0.7;
}

.placeholder-name {
  margin: 0;
  font-size: 1rem;
  color: #e8dcc8;
  text-align: center;
  letter-spacing: 0.05em;
}
</style>
