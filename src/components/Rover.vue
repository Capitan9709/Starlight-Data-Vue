<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getMarsRoverPhotos } from '../nasaApi.js';
import { ref } from 'vue';


const roverData = ref([]);
const selectedRover = ref('Curiosity');
const selectedDate = ref('');
const currentIndex = ref(0);
const selectedImageIndex = ref(0);

function getRoverData(rover, selectedDate) {
    try {
    
    getMarsRoverPhotos(rover, selectedDate)
      .then((data) => {
        roverData.value = data;
        currentIndex.value = 0;
        console.log(roverData.value);
    })
      .catch((error) => {
        console.error(error);
      });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function previousImage() {
  if (selectedImageIndex.value === 0) {
    selectedImageIndex.value = roverData.value.photos.length - 1;
  } else {
    selectedImageIndex.value--;
  }
}

function nextImage() {
  if (selectedImageIndex.value === roverData.value.photos.length - 1) {
    selectedImageIndex.value = 0;
  } else {
    selectedImageIndex.value++;
  }
}

</script>

<template>
    <Head/>
    
    <section id="cuerpo" class="pt-10">
        <div class="rover">
            <section class=" py-12 px-4">
                <div class="max-w-5xl mx-auto">
                    <h2 class="text-4xl font-bold mb-4">Rover</h2>
                    <div class="flex flex-col items-center">
                        <label class="mb-2">Selecciona el rover:</label>
                        <select v-model="selectedRover" class="text-black">
                            <option value="perseverance">Perseverance</option>
                            <option value="curiosity">Curiosity</option>
                            <option value="opportunity">Opportunity</option>
                            <option value="spirit">Spirit</option>
                        </select>
                        <label class="mt-4 mb-2">Selecciona la fecha:</label>
                        <input type="date" v-model="selectedDate" class="text-black"/>
                        <button class="mt-4 py-2 px-4 bg-indigo-950 text-white rounded-md" @click="getRoverData(selectedRover, selectedDate)">
                        Obtener datos del Rover
                        </button>
                    </div>
                    <div class="rover-data">
                        <div v-if="Object.keys(roverData).length > 0">
                            <div class="image-container">
                                <img :src="roverData.photos[selectedImageIndex].img_src" alt="Rover Image" />
                                <div class="camera-name">{{ roverData.photos[selectedImageIndex].camera.full_name }}</div>
                                <div class="image-nav">
                                    <button class="previous-button" :disabled="selectedImageIndex === 0" @click="previousImage">
                                        Anterior
                                    </button>
                                    <button class="next-button" :disabled="selectedImageIndex === roverData.value.photos.length - 1" @click="nextImage">
                                        Siguiente
                                    </button>
                                    
                                </div>
                            </div>
                            <div class="rover-info">
                                <h3 class="text-3xl font-bold mb-4">{{ roverData.photos[0].rover.name }}</h3>
                                <p>Fecha de lanzamiento: {{ roverData.photos[0].rover.launch_date }}</p>
                                <p>Fecha de aterrizaje: {{ roverData.photos[0].rover.landing_date }}</p>
                                <p>Estado: {{ roverData.photos[0].rover.status }}</p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-2xl font-bold">No hay datos disponibles</p>
                        </div>
                    </div>
                      
                </div>
            </section>
        </div>
        <div>
            <Foot/>
        </div>
    </section>
</template>

<style scoped>
#cuerpo {
    position: relative; /* agrega posicionamiento relativo para que el pseudo-elemento tenga un contexto de posicionamiento */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-image: url(../assets/fondoAbout.jpg);
  }
</style>