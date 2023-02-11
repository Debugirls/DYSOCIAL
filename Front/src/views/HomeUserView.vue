<template> 
  <div>
    <div class="publication-list">
      <PublicationsCard v-for="publication in publicationsFiltered"
      :key="publication.id"
      :publication="publication"
      @like="like"
      @dislike="dislike"
      @follow="follow"
      />
    </div>
    <NavigationButtons @previous="showPrevious" @next="showNext"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PublicationsCard from '../components/PublicationsCard.vue';
import { Publication } from '../models/publications';
import usePublications from '../composables/usePublications';
import NavigationButtons from '../components/NavigationButtons.vue'
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'HomeUserView',
  components: {
    PublicationsCard,
    NavigationButtons
  },
  
  setup() {
    const { publications, publicationsFiltered, fetchPublications, publicationsLength, fetchPublicationByTitle, fetchPublicationByPagination, totalPages } = usePublications();
    const route = useRoute()
    const titleQuery = route.query.titleQuery ? String(route.query.titleQuery) : "";
    const authorQuery = route.query.authorQuery ? String(route.query.authorQuery) : "";
    fetchPublications();
    let inputFilter = ref("");
    const limitShow = 10;
    const showAllPublications = () => {
      fetchPublicationByPagination({offset: 0, limit: limitShow, title: titleQuery, author: authorQuery});
      }
    fetchPublicationByPagination({offset: 0, limit: limitShow, title: titleQuery, author: authorQuery});

    //Evento que se lanza al hacer click en 'See previous' para mostrar los anteriores productos. 
  let offset = 0;
    const showPrevious = () =>{
      if (offset == 0){
        alert('There are no more previous products')
      }else{
        offset = offset - 1;
        fetchPublicationByPagination({offset: offset, limit: limitShow, title: titleQuery, author: authorQuery});
      }
    }
  
    //Evento que se lanza al hacer click en 'See next' para mostrar los siguientes productos. 
    const showNext = () =>{
      if (offset >= totalPages.value){
        alert('There are no more products')
      }else{
        offset = offset + 1;
        fetchPublicationByPagination({offset: offset, limit: limitShow, title: titleQuery, author: authorQuery});
      }
    }
    
    return { 
      publications, 
      publicationsFiltered, 
      inputFilter,
      showAllPublications,
      showPrevious,
      showNext,
      like: (publication: Publication) => publication.likes += 1,
      dislike: (publication: Publication) => publication.likes -=1,
      follow: (publication: Publication) => publication ,//TODO:botón de seguir
    }
  }
});
</script>
<style scoped>
.publication-list{
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: 1rem 1rem;
}
</style>