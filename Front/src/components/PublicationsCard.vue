<template>
  <div class="card card w-25 mt-2 publication">

  <div class="card-header">
    <span class="public-author">
      {{ publication.author }}
    </span>
    <span class="public-date">
      {{ publication.date }}
    </span>
  </div>
  <ul class="list-group list-group-flush" v-if="isAuth">
    <li class="list-group-item">
      <button class="follow-button btn-style" @click="$emit('dislike', publication)">
        <img height="15" width="15" src="../assets/karmaNegative.png"/>
      </button>
      <button class="follow-button btn-style" style="margin-left: 2%; margin-right: 2%;" @click="$emit('follow', publication.author)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
        </svg>
      </button>
      <button class="follow-button btn-style" @click="$emit('like', publication)">
        <img height="15" width="15" src="../assets/karmaPositive.png"/>
      </button>
    </li>
  </ul>
  <ul class="list-group list-group-flush" v-else>
    <li class="list-group-item">
      <router-link class="link" to="/login">Lógate</router-link> para poder seguir a este usuario y darle Karma
    </li>
  </ul>
  <div class="img-cont">
    <img class="public-img"  :src= "`http://localhost:8081/images/${publication.id}${publication.image}`" alt="Imagen de la publicación" />
  </div>
  <div class="card-body">
    <h5 class="card-title">{{ publication.title }}</h5>
    <p class="card-text">{{ publication.text }}</p>
  </div>
  <div class="card-footer text-muted">
    {{ publication.likes }}
    <img height="40" width="40" src="../assets/logo-eye.png"/>
  </div>
</div>
</template>

<script lang="ts">
//import publicationsModule from '@/store/publications';
import { defineComponent, PropType } from 'vue';
import { Publication } from "../models/publications";

export default defineComponent({
  name: 'PublicationsCard',

  props: {
    publication: {
      type: Object as PropType<Publication>,
      required: true,
    },
  },
  
  setup() {
    let isAuth = localStorage.token !== undefined && localStorage.token !== null;
    return {
      isAuth
    }
  },
});
</script>

<style scoped>
.img-cont{
  align-content: center;
}
  .publication {
    margin: 2%;
  }
  .card {
    background-color: #f8fafc !important;
    border-color: #d1d5db;
    border-style: 2px dotted;
    display: flex;
    
  }
  .list-group-item{
    background-color: var(--color-violet10color) !important;
  }
  .public-img {
    width: fit-content;
    max-width: 16rem;
    padding: 5px; 
    max-height: 10rem;
    border-radius: 10px;
  }
  .public-author{
    font-family: 'Source Serif Pro', serif;
    color: var(--color-violet700);
    font-weight: 700;
    margin-left: 2%;
    margin-right: 5%;
  }
  .public-date{
    color: var(--color-violet400);
    font-size: 90%;
    margin-left: 5%;
    margin-right: 2%;
    font-style: italic;
  }
  .public-info {
    display: flexbox;
    padding-top: 2%;  
    font-size: 20px;
    line-height: 84%;
    padding-left: 1%;
  } 
  .card-title{
    font-family: 'Playfair Display', serif;
    color: var(--color-violet700);
    font-weight: 700;
  }
  .public-text {
    font-family: 'Assistant', sans-serif;
    text-align: justify;
    padding: 5%;
    color: var(--color-violet600)
  }
  .public-data {
    color: var(--color-grey200);
    padding-right: 2%;
  }
  .public-data, .buttons {
    display: flex;
    justify-content: space-between;
  }
  .public-likes {
    font-size: x-large;
    margin-right: 10px;
  }
  .buttons {
    padding: 0 1% 1% 0;
  }
  .follow-button {
    border-radius: 5px;
    font-size: small;

  }
  button.like-button, button.dislike-button {
    border-color: var(--color-violet100);
    border-radius: 50%;
    padding: 2px;   
    margin-right: 6px; 
  }
  .link{
    color: var(--color-violet600);
    font-weight: 800;
    text-shadow: var(--color-green100) 1px 0 2px;
  }
  .link:hover, link:active {
    color: var(--color-violet700)
  }
  .msg {
    font-size: 13px;
  }

  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital@1&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tagbanwa&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=Raleway:ital@1&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200&display=swap');
 </style>
    