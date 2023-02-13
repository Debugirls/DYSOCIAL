<template>
  <div class="createpubl">
    <h3> Crear una nueva publicación</h3>
    <form @submit.prevent="submit" class="form">
      <label class="form-label" for="title">Título:</label>
      <input v-model="title" class="form-input" type="text" style="width : 50%" id="title"
        placeholder=" Puedes poner un título" />
      <label class="form-label" for="text">Texto:</label>
      <textarea v-model="text" class="form-input" id="text" rows="12" maxlength="256"
        placeholder=" Puedes introducir un texto con un máximo de 256 caracteres"></textarea>
      <label class="form-label" for="start">Fecha de tu publicación</label>
      <input v-model="date" type="date" id="start" name="publicationDate" min="2023-01-15">
      <br><br>
      <label class="form-label" for="image">Foto de tu publicación:</label>
      <input @change="insertImage" type="file" name="image" accept="image/*">
      <br><br>
      <input class="btn-style follow-button" type="submit" value="PUBLICAR" />
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
    }
  },

  setup() {
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

    submit(){
      this.createNew()
      this.$router.push({ name: "homeUser"});
    },

    async createNew() {
      const author = this.author
      const json = new FormData()
      json.append('title', this.title)
      json.append('image', (this.image as any).name.slice((this.image as any).name.lastIndexOf('.')).toLowerCase())
      json.append('text', this.text)
      json.append('author', author.userLogin.value?.username)
      json.append('date', this.date)
      json.append('likes', this.likes.toString())

      try {
        if (this.text === "" && this.image === "") {
          alert("Para hacer una nueva publicación has de introducir, al menos, un texto o una foto.")
          this.error = true;
        } else {
          const newComment = await dysocialApi.post<unknown, AxiosResponse<Publication>>(
            '/publications', json);

          const fileData = new FormData();
          fileData.append('image', this.image);
          await dysocialApi.post<unknown, AxiosResponse<Publication[]>>(
            `/uploadFile?publicationId=${newComment.data.id}`, fileData,
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );
          console.log("Se ha creado una nueva publicación");
        }
      } catch (err) {
        console.log(err);
        alert(err)
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
  font-family: 'Source Code Pro';
  color: var(--color-violet700);
  margin-top: 2%;
  font-size: 2.5rem;
  font-weight: bold;
}

.form {
  display: flexbox;
  align-items: initial;
  background-color: #c7d2fe;
  margin: 2% 20% 2% 20%;
  padding: 2%;
  border: 1px var(--color-violet900);
  border-radius: 20px;
  flex-wrap: wrap;
}

.form-label {
  font-family: 'Gentium Book Plus', serif;
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

</style>


