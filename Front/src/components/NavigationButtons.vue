<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"><a class="button" href="#" @click="$emit('previous')">« Anterior</a></li>
        <li class="page-item"><a class="button" href="#" @click="$emit('next')">Siguiente »</a></li>
      </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'PublicationsCard',
})
</script>

<style scoped>
a{
  width: 250px;
  border-radius: 5px;   
  color: var(--color-violet100);
  font-size: medium;
  margin: 10px;
  padding: 12px;
  text-decoration: none;
}
.page-prev {
  background: linear-gradient(
      90deg,
      var(--color-violet500),
      var(--color-violet400),
      var(--color-violet300),
      var(--color-violet200),
      var(--color-green100));
}
.page-next {
  background: linear-gradient(
      270deg,
      var(--color-violet500),
      var(--color-violet400),
      var(--color-violet300),
      var(--color-violet200),
      var(--color-green100));
}

.button, .button:after {
  width: 150px;
  height: 76px;
  line-height: 78px;
  font-size: 20px;
  font-family: 'Bebas Neue', sans-serif;
  background-color: var(--color-green100);
  border: 0;
  color: var(--color-violet700);
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px var(--color-violet500);
  outline: transparent;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'ALWAYS WATCHING';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%,  var(--color-violet500)6 3%,  var(--color-violet500) 5%, var(--color-green100) 5%);
  text-shadow: -3px -3px 0px var(--color-grey200), 3px 3px 0px var(--color-green100);
  clip-path: var(--slice-0);
}

.button:hover:after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}

@media (min-width: 768px) {
  .button,
  .button:after {
    width: 200px;
    height: 86px;
    line-height: 88px;
  }
}
</style>