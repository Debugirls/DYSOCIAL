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
  name: 'HomeView',
  components: {
    PublicationsCard,
    NavigationButtons
  },
  
  setup() {
    const { publications, publicationsFiltered, fetchPublications, publicationsLength, fetchPublicationByTitle, fetchPublicationByPagination, totalPages } = usePublications();
    const route = useRoute()
    if(route.query.titleQuery) {
      console.log("---We got a query! title=", String(route.query.titleQuery))
      fetchPublicationByTitle(String(route.query.titleQuery))
    }
    fetchPublications();
    let inputFilter = ref("");
    const limitShow = 10;
    const showAllPublications = () => {
      fetchPublicationByPagination({offset: 0, limit: limitShow});
      }
    fetchPublicationByPagination({offset: 0, limit: limitShow});

    //Evento que se lanza al hacer click en 'See previous 2' para mostrar los anteriores 2 productos. 
    let offset = 0;
    const showPrevious = () =>{
      if (offset == 0){
        alert('There are no more previous products')
      }else{
        offset = offset - 1;
        fetchPublicationByPagination({offset: offset, limit: limitShow});
      }
    }
  
    //Evento que se lanza al hacer click en 'See next 2' para mostrar los siguientes 2 productos. 
    const showNext = () =>{
      if (offset >= totalPages.value){
        alert('There are no more products')
      }else{
        offset = offset + 1;
        fetchPublicationByPagination({offset: offset, limit: limitShow});
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