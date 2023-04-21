<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getAPOD } from '../nasaApi.js';
import { ref } from 'vue';

const imagenDia = ref('');

getAPOD()
  .then((data) => {
    console.log(data);
    imagenDia.value = data.hdurl;
  })
  .catch((error) => {
    console.error(error);
  });

</script>

<template>
  <Head />
  <div class="home">
    <p>Esto es una prueba</p>
    <div class="inputQuery">
        <img class="w-20" alt="imagen astronomica del dia" :src="imagenDia">
    </div>
  </div>
  <Foot />
</template>

<style scoped>

</style>