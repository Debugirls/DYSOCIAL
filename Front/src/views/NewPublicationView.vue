<template>
    <div class="createpubl">
        <h3>¿Quieres crear una nueva publicación?</h3>
    <form @submit.prevent="createNew" class="form">
      <label class="form-label" for="title">Título:</label>
      <input
        v-model="title"
        class="form-input"
        type="text"
        style="width : 50%"
        id="title"
        placeholder=" Puedes poner un título"
      />
      <label class="form-label" for="text">Texto:</label>
      <textarea
        v-model="text"
        class="form-input"
        id="text"
        rows="12"
        maxlength="256"
        placeholder=" Puedes introducir un texto con un máximo de 256 caracteres"
        ></textarea>
      <label class="form-label" for="start">Fecha de tu publicación</label>
      <input v-model="date" type="date" id="start" name="publicationDate" min="2023-01-15">
      <br><br>
      <label class="form-label" for="image">Foto de tu publicación:</label>
      <input @change="insertImage" type="file" name="image" accept="image/*" >
      <br><br>
      <input class="form-submit" type="submit" value="PUBLICAR" />
    </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Publication } from '../models/publications';
import dysocialApi from '../api/dysocialApi';
import { AxiosResponse } from 'axios';
import useUserLogin from "../composables/useUserLogin";

export default defineComponent({
  name: 'newPublication',

  data() {
    return { 
      image: "", 
      title: "",
      text: "",
      date: "",
      likes: 0,
      error: false,
    }},

  setup(){
    const author = useUserLogin()
    return {
      author
    }
  },

  methods: {    
    insertImage(event: any) {
      console.log(event.target.files);
      this.image = event.target.files[0]
    },
  
    async createNew() {
      const author = this.author
      const json = new FormData ()
      json.append('title', this.title)  
      json.append('text', this.text)
      json.append('author', author.userLogin.value?.username) 
      json.append('date', this.date)
      json.append('likes', this.likes.toString())
      
      try {
        if (this.text === "" && this.image === "") {
          alert("Para hacer una nueva publicación has de introducir, al menos, un texto o una foto.")
          this.error = true;
        } else {
          await dysocialApi.post<unknown, AxiosResponse<Publication[]>>(
            '/publications', json);

          const fileData = new FormData();
          fileData.append('image', this.image);
          await dysocialApi.post<unknown, AxiosResponse<Publication[]>>(
            '/uploadFile', fileData, 
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );        
          console.log("Se ha creado una nueva publicación");   
        }
      } catch (err) {
        console.log(err);
        alert('404 not found')
      }
    }
  }
});
</script>

<style scoped>
  body {
    background-color: antiquewhite;
    margin: 2%;
    color: var(--color-black100);
    font-size: 16px;
  }
  h3 {  
    color: var(--color-violet700);
    margin-top: 2%;
    font-size: 2.5rem;
    font-family: 'Source Code Pro';
    text-align: center;
    text-shadow: 3px 3px 3px var(--color-green100);
  }
  .form {
    display: flexbox;
    align-items: initial;
    background-color: var(--color-violet10);
    margin: 2% 20% 2% 20%;
    padding: 2%;
    border: 1px dotted var(--color-violet700);
    border-radius: 20px;
    flex-wrap: wrap;
  }
  .form-label {
    margin-top: 1%;
    padding: 10px;
    width: 100%;
    font-size: 1.3rem;
    color: var(--color-violet700);
  }
  .form-input {
    color: var(--color-violet700);
    border-radius: 16px;
    width: 70%;
  }
  .form-submit {
    padding: 0.5% 3% 0.5% 3%;
    border-radius: 8px;
      background: linear-gradient(
      0deg,
      var(--color-violet500),
      var(--color-violet400),
      var(--color-violet300),
      var(--color-violet200),
      var(--color-green100));
      color: var(--color-violet100);
  }
  .form-submit:hover {
    padding: 0.5% 3% 0.5% 3%;
    border-radius: 12px;
    border-color: var(--color-violet400) ;
      background: var(--color-violet10);
      color: var(--color-black100);      
  }
</style>