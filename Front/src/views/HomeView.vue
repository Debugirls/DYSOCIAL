<template> 
  <div>
    <NavigationButtons @previous="showPrevious" @next="showNext"/>
    <div class="publication-list">
      <PublicationsCard v-for="publication in publicationsFiltered"
      :key="publication.id"
      :publication="publication"
      @like.once="like"
      @dislike.once="dislike"
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
import NavigationButtons from '../components/NavigationButtons.vue';
import dysocialApi from '../api/dysocialApi';
import { AxiosResponse } from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {
    PublicationsCard,
    NavigationButtons,
  },
  
  setup() {
    const { publications, publicationsFiltered, fetchPublications, publicationsLength, fetchPublicationByTitle, fetchPublicationByPagination, totalPages, setCurrentPage } = usePublications();
    const route = useRoute()
    setCurrentPage(0);
    const titleQuery = route.query.titleQuery ? String(route.query.titleQuery) : "";
    const authorQuery = route.query.authorQuery ? String(route.query.authorQuery) : "";
    
    fetchPublications();
    let inputFilter = ref("");
    const limitShow = 8;
    const showAllPublications = () => {
      fetchPublicationByPagination({offset: 0, limit: limitShow, title: titleQuery, author: authorQuery});
      }
    fetchPublicationByPagination({offset: 0, limit: limitShow, title: titleQuery, author: authorQuery});
    //Evento que se lanza al hacer click en 'See previous' para mostrar los anteriores productos. 
  let offset = 0;
    const showPrevious = () =>{
      if (offset == 0){
        alert('Otra cosa')
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
    
    //Evento que se lanza al hacer click en 'Like' para añadir karma
    async function like(publication: Publication) {
      console.log(publication)
      publication.likes += 1;
      try{
        await dysocialApi.put<unknown, AxiosResponse<Publication[]>>('/publications/' + publication.id , publication ) 
        console.log("Update SUCCESS!")
      } catch(error) {
        console.log(error)
        alert('404 not found')
      }
    }

    //Evento que se lanza al hacer click en 'disLike' para añadir karma
    async function dislike(publication: Publication) {
      console.log(publication)
      publication.likes -= 1;
      try{
        await dysocialApi.put<unknown, AxiosResponse<Publication[]>>('/publications/' + publication.id , publication ) 
        console.log("Update SUCCESS!")
      } catch(error) {
        console.log(error)
        alert('404 not found')
      }
    }

    return { 
      like,
      dislike,
      follow: (publication: Publication) => publication ,//TODO:botón de seguir
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