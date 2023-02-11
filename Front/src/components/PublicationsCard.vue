<template>
  <div class="publication">
    <div class="public-img">
      <img src="publication.image" alt="Imagen de la publicación" />
    </div>
    <div class="public-info">
      <div class="public-title">{{ publication.title }}</div>
      <div class="public-text">{{ publication.text }} </div>
      <div class="public-data">
        <div class="public-date">{{ publication.date }}</div>
        <div class="public-author">{{ publication.author }}</div>      
        <div class="public-likes">{{ publication.likes }} <img height="40" width="40" src="../assets/logo-eye.png"/></div>
      </div>
      <div class="buttons" v-if="isAuthenticated">
          <button class="follow-button" @click="$emit('follow', publication.author)">Seguir / Dejar de seguir</button>
          <div class="like-buttons">
            <button class="like-button" @click="$emit('like', publication)" > <img height="30" width="30" src="../assets/karmaPositive.png"/></button>
            <button class="dislike-button" @click="$emit('dislike', publication)"> <img height="30" width="30" src="../assets/karmaNegative.png"/></button>
          </div>
        </div>
      <div v-else>Lógate para poder seguir a este usuario y darle Karma</div>
      <router-link class="link" to="/login">INICIAR SESIÓN</router-link>
    </div>
  </div>
</template>

<script lang="ts">
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
  data(){
    return {
      isAuthenticated: false,
    }
  },
  watch: {
    $route(){
      this.isAuthenticated = localStorage.token !== undefined && localStorage.token !== null
    }
  },
});
</script>

<style scoped>
    .publication {
      width: 75%px;
      display: flex;
      border: 2.5px dotted var(--color-violet300);
      border-radius: 10px;
      background-color: var(--color-violet10);
      margin: 2%;
    }
    .public-img > img {
      width: 100%;
      height: 100%;
      border-start-start-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .public-info {
      display: flexbox;
      padding-top: 2%;  
      font-size: 20px;
      line-height: 84%;
      padding-left: 1%;
    } 
    .public-title {
      margin-bottom: 2%;
      font-size: 40px;
      font-family: 'Source Code pro';
      padding-left: 7px;
      color: var(--color-violet700);
      text-shadow: 3px 3px 3px var(--color-green100);
    }
    .public-text {
      text-align: justify;
      padding: 5%;
      color: var(--color-violet600)
    }
    .public-data {
      color: var(--color-success300);
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
      padding: 0 2% 3% 0;
    }
    .follow-button {
      border-radius: 5px;
      background: linear-gradient(
      90deg,
      var(--color-violet500),
      var(--color-violet400),
      var(--color-violet300),
      var(--color-violet200),
      var(--color-green100));
      color: var(--color-violet100);
      font-size: small;
    }
    .follow-button:hover {
      padding: 0.5% 3% 0.5% 3%;
      border-radius: 12px;
      border-color: var(--color-violet400) ;
      background: var(--color-violet10);
      color: var(--color-black100);      
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
 </style>
    