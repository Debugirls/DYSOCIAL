<template>
  <!--TODO: Add each filtter logic"-->
  <div class="input-group mb-3" style="margin-top: 1rem; margin-left: 0.5rem">
    <div class="input-group-prepend">
      <div v-if="!searchinByAuthor">
      <RouterLink to="#" class="btn btn-outline-dark-active" active-class="active" @click="searchinByAuthor = false" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
        </svg>
      </RouterLink>
      <RouterLink to="#" class="btn btn-outline-dark" active-class="active" @click="searchinByAuthor = true" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
          <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
        </svg>
      </RouterLink>
      </div>
      <div v-else>
      <RouterLink to="#" class="btn btn-outline-dark" active-class="active" @click="searchinByAuthor = false" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
        </svg>
      </RouterLink>
      <RouterLink to="#" class="btn btn-outline-dark-active" active-class="active" @click="searchinByAuthor = true" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
          <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
        </svg>
      </RouterLink>
      </div>
    </div>
    <div v-if="!searchinByAuthor">
      <form class="form-group" @submit.prevent="filterByTitle">
        <input v-model="titleQuery" type="search" class="form-control rounded" placeholder="Buscar por titulo" aria-label="Search" />
      </form>
    </div>
    <div v-else>
      <form class="form-group" @submit.prevent="filterByAuthor">
        <input v-model="authorQuery" type="search"  class="form-control rounded" placeholder="Buscar por usuario" aria-label="Search" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
  setup(_, ctx) {

    const title = ref<string>("");
    const author = ref<string>("");
    
    return {
      title,
      author
    };
  },

  name: "FilterBar",

  data() {
    return { 
      searchinByAuthor: false,
      titleQuery: "",
      authorQuery: "",
    }},

    methods: {
      async filterByTitle() {
        if (this.titleQuery.length > 0 ) {
          this.$router.push({ name: "home",  query: { titleQuery: this.titleQuery }})
        }    
      },

      async filterByAuthor() {
        if (this.authorQuery.length > 0 ) {
          this.$router.push({ name: "home",  query: { authorQuery: this.authorQuery }})
        }    
      }
    }
})
</script>

<style scoped>

.form-control:focus {
  border-color: #6af0c6;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(106, 240, 198, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(106, 240, 198, 0.6);
}
.btn-outline-dark{
  color: var(--color-violet500) !important;
  border-color: var(--color-violet500) !important;
  background-color: white !important;
  font-weight: 600;
  font-weight: 600;
}
.btn-outline-dark:hover, .btn-outline-dark:active {
  color: var(--color-green100) !important;
  border-color: white !important;
  background-color: var(--color-violet500) !important;
}

.btn-outline-dark-active {
  color: var(--color-violet500) !important;
  border-color: var(--color-green100) !important;
  background-color: var(--color-violet100) !important;
}


</style>
