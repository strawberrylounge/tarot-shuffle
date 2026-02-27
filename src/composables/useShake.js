import { ref, onMounted, onUnmounted } from "vue";

const SHAKE_THRESHOLD = 20; // m/s² 총 변화량
const SHAKE_COOLDOWN = 1200; // ms, 연속 트리거 방지

export function useShake(callback) {
  const isGranted = ref(false);
  // iOS인지 판별 (DeviceMotionEvent.requestPermission 존재 여부)
  const needsPermission =
    typeof DeviceMotionEvent?.requestPermission === "function";

  let lastX = null,
    lastY = null,
    lastZ = null;
  let lastShakeAt = 0;

  function handleMotion(e) {
    const accel = e.accelerationIncludingGravity;
    if (!accel || accel.x == null) return;

    const { x, y, z } = accel;

    if (lastX !== null) {
      const delta =
        Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
      const now = Date.now();

      if (delta > SHAKE_THRESHOLD && now - lastShakeAt > SHAKE_COOLDOWN) {
        lastShakeAt = now;
        callback();
      }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  }

  function startListening() {
    window.addEventListener("devicemotion", handleMotion);
    isGranted.value = true;
  }

  async function requestPermission() {
    if (needsPermission) {
      try {
        const result = await DeviceMotionEvent.requestPermission();
        if (result === "granted") startListening();
      } catch {
        // 사용자가 거부하거나 에러
      }
    } else {
      startListening();
    }
  }

  onMounted(() => {
    // Android 등 권한 불필요한 경우 자동 시작
    if (!needsPermission) startListening();
  });

  onUnmounted(() => {
    window.removeEventListener("devicemotion", handleMotion);
  });

  return { isGranted, needsPermission, requestPermission };
}
