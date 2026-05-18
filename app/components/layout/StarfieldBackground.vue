<template>
  <div aria-hidden="true" class="album-background pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div class="absolute inset-0 stars-layer stars-layer-one" />
    <div class="absolute inset-0 stars-layer stars-layer-two" />
    <div class="absolute inset-0 album-vignette" />
  </div>
</template>

<style scoped>
.album-background {
  background:
    radial-gradient(circle at 20% 12%, color-mix(in srgb, var(--album-accent, #d7a4b8) 22%, transparent), transparent 28%),
    radial-gradient(circle at 82% 18%, color-mix(in srgb, var(--album-accent-2, #d6bd7b) 18%, transparent), transparent 30%),
    linear-gradient(
      145deg,
      var(--album-bg, #060913) 0%,
      var(--album-bg-2, #111936) 45%,
      var(--album-bg-3, #2d244a) 100%
    );
}

.album-vignette {
  background: linear-gradient(180deg, rgba(6, 9, 19, 0.08), rgba(6, 9, 19, 0.72));
}

.stars-layer {
  background-repeat: repeat;
  opacity: 0.62;
}

.stars-layer-one {
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.72) 0 1px, transparent 1px),
    radial-gradient(circle, color-mix(in srgb, var(--album-accent-2, #d6bd7b) 58%, transparent) 0 1px, transparent 1px);
  background-size: 72px 72px, 124px 124px;
  background-position: 12px 18px, 44px 32px;
}

.stars-layer-two {
  background-image:
    radial-gradient(circle, color-mix(in srgb, var(--album-accent, #d7a4b8) 48%, transparent) 0 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 38%, rgba(255, 255, 255, 0.1) 38.2%, transparent 39%);
  background-size: 160px 160px, 420px 420px;
  background-position: 88px 40px, center;
}
</style>
