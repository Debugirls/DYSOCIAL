<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-prev" href="#" @click="$emit('previous')">« Anterior</a></li>
        <li class="page-item"><a class="page-next" href="#" @click="$emit('next')">Siguiente »</a></li>
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
</style>