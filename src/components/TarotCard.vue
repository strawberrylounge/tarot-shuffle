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
          class="img img-contain"
          @error="imageError = true"
        />
        <!-- fallback -->
        <div v-else class="card-placeholder">
          <p class="placeholder-suit">{{ card.suit.toUpperCase() }}</p>
          <p class="placeholder-name">{{ card.name }}</p>
        </div>
      </div>
    </div>

    <div class="card-name">{{ card.name }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/abstracts/index" as *;

.card-scene {
  @include flexbox(center, center, 12px);
  flex-direction: column;
  width: 200px;
  height: 420px;
  max-height: 420px;
  perspective: 1200px;
  .card-inner {
    position: relative;
    width: 100%;
    height: 340px;
    max-height: 340px;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      cursor: pointer;

      // 뒷면
      &.card-back {
        background: {
          image: url("/card-back.jpg");
          size: cover;
          position: center;
        }
        border: 2px solid color("gold");
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      }
      // 앞면
      &.card-front {
        border: 2px solid color("gold");
        background: color("dark-navy");
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transform: rotateY(180deg);
        .card-img {
        }
      }
    }

    // img fallback
    .card-placeholder {
      @include flexbox(center, center, 10px);
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 24px;
      .placeholder-suit {
        font-size: rem(14);
        color: color("gold");
        opacity: 0.7;
      }
      .placeholder-name {
        color: #e8dcc8;
        text-align: center;
      }
    }
  }
  .card-name {
    font-size: rem(14);
    color: color("gold");
  }

  // card-flipped
  &.flipped {
    .card-inner {
      transform: rotateY(180deg);
    }
  }
}
</style>
