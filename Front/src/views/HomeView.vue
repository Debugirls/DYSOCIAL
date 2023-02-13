<template> 
  <div>
    <NavigationButtons @previous="showPrevious" @next="showNext"/>
    <div class="publication-list">
      <PublicationsCard v-for="publication in publicationsFiltered"
      :key="publication.id"
      :publication="publication"
      />
    </div>
    <NavigationButtons @previous="showPrevious" @next="showNext"/>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PublicationsCard from '../components/PublicationsCard.vue';
//import { Publication } from '../models/publications';
import usePublications from '../composables/usePublications';
import NavigationButtons from '../components/NavigationButtons.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    PublicationsCard,
    NavigationButtons,
  },
  
  setup() {
    const { publications, publicationsFiltered, fetchPublications, publicationsLength, fetchPublicationByTitle, fetchPublicationByPagination, totalPages } = usePublications();
    fetchPublications();
    let inputFilter = ref("");
    const limitShow = 8;
    const showAllPublications = () => {
      fetchPublicationByPagination({offset: 0, limit: limitShow});
      }
    fetchPublicationByPagination({offset: 0, limit: limitShow});

    //Evento que se lanza al hacer click en 'See previous' para mostrar los anteriores productos. 
  let offset = 0;
    const showPrevious = () =>{
      if (offset == 0){
        alert('No hay publicaciones previas')
      }else{
        offset = offset - 1;
        fetchPublicationByPagination({offset: offset, limit: limitShow});
      }
    }
  
    //Evento que se lanza al hacer click en 'See next' para mostrar los siguientes productos. 
    const showNext = () =>{
      if (offset >= publicationsLength.value){
        alert('No hay más publicaciones')
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