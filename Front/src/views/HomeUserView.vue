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
import dysocialApi from '../api/dysocialApi';
import { AxiosResponse } from 'axios';

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
      follow: (publication: Publication) => publication ,//TODO:botón de seguir
    }
  },
  methods: {
    //Evento que se lanza al hacer click en 'Like' para añadir karma
    async like() {
      const likeIt = (publication: Publication) => {
      publication.likes += 1};
      try{
        await dysocialApi.put<unknown, AxiosResponse<Publication[]>>('/publications', likeIt) 
        console.log("Update SUCCESS!")
      } catch(error) {
        console.log(error)
        alert('404 not found')
      }
    },
    //Evento que se lanza al hacer click en 'Dislike' para quitar karma
    async dislike() {
      const dislikeIt = (publication: Publication) => {
      publication.likes -= 1};
      try{
        await dysocialApi.put<unknown, AxiosResponse<Publication[]>>('/publications', dislikeIt) 
        console.log("Update SUCCESS!")
      } catch(error) {
        console.log(error)
        alert('404 not found')
      }
    }
   },
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