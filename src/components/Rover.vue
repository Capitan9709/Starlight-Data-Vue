<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getMarsRoverPhotos } from '../nasaApi.js';
import { ref } from 'vue';

const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const currentDate = `${year}-${month}-${day}`

const roverData = ref([]);
const selectedRover = ref('perseverance');
const selectedDate = ref(currentDate);
const currentIndex = ref(0);
const selectedImageIndex = ref(0);
const ready = ref();
const noDataAvaliable = ref(false);


function getRoverData(rover, selectedDate) {
    ready.value = false;
    try {
    
    getMarsRoverPhotos(rover, selectedDate)
      .then((data) => {
        roverData.value = data;
        if (Array.isArray(roverData.value.photos) && roverData.value.photos.length > 0) {
            selectedImageIndex.value = 0;
            // console.log(roverData.value);
            ready.value = true;
            noDataAvaliable.value = false;
        } else {
            console.log("No hay datos disponibles");
            ready.value = false;
            noDataAvaliable.value = true;
        }

            
    })
      .catch((error) => {
        console.error(error);
      });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function previousImage() {
  if (roverData.value.photos.length > 0) {
    if (selectedImageIndex.value === 0) {
      selectedImageIndex.value = roverData.value.photos.length - 1;
    } else {
      selectedImageIndex.value--;
    }
  }
}

function nextImage() {
  if (roverData.value.photos.length > 0) {
    if (selectedImageIndex.value === roverData.value.photos.length - 1) {
      selectedImageIndex.value = 0;
    } else {
      selectedImageIndex.value++;
    }
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
                        <label class="mt-4 text-white w-1/3 py-1 px-2 bg-indigo-950 rounded-t-md font-bold">Select the Rover:</label>
                        <select v-model="selectedRover" class="text-white w-1/3 py-1 px-2 bg-indigo-950 rounded-b-md font-semibold">
                            <option selected value="perseverance">Perseverance</option>
                            <option value="curiosity">Curiosity</option>
                            <option value="opportunity">Opportunity</option>
                            <option value="spirit">Spirit</option>
                        </select>
                        <label class="mt-4 text-white w-1/3 py-1 px-2 bg-indigo-950 rounded-t-md font-bold">Select the Date:</label>
                        <input type="date" v-model="selectedDate" class="text-white w-1/3 py-1 px-2 bg-indigo-950 rounded-b-md font-semibold"/>
                        <button class="mt-4 py-2 px-4 bg-indigo-950 text-white rounded-md" @click="getRoverData(selectedRover, selectedDate)">
                        Obtener datos del Rover
                        </button>
                    </div>
                    <div class="rover-data mt-4 flex justify-center items-center">
                        <div v-if="ready == ''"></div>
                        <div v-else-if="ready == true && noDataAvaliable == false" class="w-1/2 bg-indigo-900 p-3 rounded-md">
                            <div class="image-container">
                                <p class="camera-name"><b>Camera:</b> {{ roverData.photos[selectedImageIndex].camera.full_name }}</p>
                                <img class="rounded" :src="roverData.photos[selectedImageIndex].img_src" alt="Rover Image" />
                                <div class="py-2 image-nav flex flex-row justify-between">
                                    <button class="previous-button bg-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-700" :disabled="selectedImageIndex === 0" @click="previousImage">
                                        Previous
                                    </button>
                                    <p>Image Nº {{ selectedImageIndex + 1 }} </p>
                                    <button class="next-button bg-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-700" :disabled="selectedImageIndex === roverData.photos.length - 1" @click="nextImage">
                                        Next
                                    </button>
                                    
                                </div>
                            </div>
                            <div class="rover-info">
                                <h3 class="text-3xl font-semibold mb-4">Rover: <span class="text-2xl font-bold">{{ roverData.photos[0].rover.name }}</span></h3>
                                <p><b>Launch Date:</b> {{ roverData.photos[0].rover.launch_date }}</p>
                                <p><b>Landing Date:</b> {{ roverData.photos[0].rover.landing_date }}</p>
                                <p><b>Status:</b> {{ roverData.photos[0].rover.status }}</p>
                            </div>
                        </div>
                        <div v-if="noDataAvaliable == true">
                            <p class="text-2xl font-bold bg-indigo-900 p-3 rounded-md">No hay registros de esta fecha</p>
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
    background-image: url(../assets/marte.jpg);
  }
</style>