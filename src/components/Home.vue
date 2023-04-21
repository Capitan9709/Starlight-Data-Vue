<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getAPOD } from '../nasaApi.js';
import { ref } from 'vue';
import { db, useCollection } from '@/firebase.js';

const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const currentDate = `${year}-${month}-${day}`

const imagenDia = ref('');

const fechaColeccion = db.collection('APODs').doc(fecha);

fechaColeccion.get().then((doc) => {
  if (doc.exists) {
    // El documento ya existe, obtenemos los datos
    console.log('El documento ya existe');
    const data = doc.data();
    imagenDia.value = data.hdurl;
  } else {
    // El documento no existe, llamamos a getAPOD para obtener los datos
    console.log('El documento no existe');
    getAPOD()
      .then((data) => {
        imagenDia.value = data.hdurl;
        // Guardamos los datos en Firebase
        const apodData = {
          date: data.date,
          explanation: data.explanation,
          hdurl: data.hdurl,
          title: data.title
        };
        db.collection('APODs').doc(fecha).set(apodData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}).catch((error) => {
  console.error(error);
});


</script>

<template>
  <Head />
  <div class="home">
    <p>Esto es una prueba</p>
    <div class="flex justify-center my-4 w-screen">
        <img class="w-40" alt="imagen astronomica del dia" :src="imagenDia">
    </div>
    {{ currentDate }}
  </div>
  <Foot />
</template>

<style scoped>

</style>