<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-midnight-sky">
    <div class="absolute inset-0 stars-layer stars-layer-one" />
    <div class="absolute inset-0 stars-layer stars-layer-two" />
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,19,0.1),rgba(6,9,19,0.72))]" />
  </div>
</template>

<style scoped>
.stars-layer {
  background-repeat: repeat;
  opacity: 0.78;
}

.stars-layer-one {
  background-image:
    radial-gradient(circle, rgba(231, 237, 248, 0.76) 0 1px, transparent 1px),
    radial-gradient(circle, rgba(214, 189, 123, 0.48) 0 1px, transparent 1px);
  background-size: 72px 72px, 124px 124px;
  background-position: 12px 18px, 44px 32px;
}

.stars-layer-two {
  background-image:
    radial-gradient(circle, rgba(215, 164, 184, 0.42) 0 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 38%, rgba(191, 199, 216, 0.12) 38.2%, transparent 39%);
  background-size: 160px 160px, 420px 420px;
  background-position: 88px 40px, center;
}
</style>
