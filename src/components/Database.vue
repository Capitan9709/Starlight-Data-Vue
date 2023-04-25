<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { ref } from 'vue';
import { db } from '@/firebase.js';
import { doc, getDoc } from "firebase/firestore";

// variables para la fecha de ayer
const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + (date.getDate()-1)).slice(-2)
const yesterdayDate = `${year}-${month}-${day}`
// console.log(yesterdayDate)


// variables para la imagen del dia
const imagenDiaAyer = ref('');
const tituloImagenDiaAyer = ref('');
const fechaimagenDiaAyer = ref('');
const descripcionImagenDiaAyer = ref('');

// variables para los asteroides
const asteroidesAyer = ref([]);

// saca los datos de la imagen de ayer de la base de datos
const apodCollection = doc(db, "APODs", yesterdayDate);
const apodSnap = await getDoc(apodCollection);

if (apodSnap.exists()) {
  
  imagenDiaAyer.value = apodSnap.data().imagen;
  tituloImagenDiaAyer.value = apodSnap.data().titulo;
  fechaimagenDiaAyer.value = apodSnap.data().fecha;
  descripcionImagenDiaAyer.value = apodSnap.data().descripcion;

} else {
  console.log("No existe el documento");
}

// saca los datos de los asteroides de ayer de la base de datos
const asteriodCollection = doc(db, "Asteroids", yesterdayDate);
const asteroidSnap = await getDoc(asteriodCollection);

if (asteroidSnap.exists()) {
  
  asteroidesAyer.value = asteroidSnap.data().asteroides;

//   console.log("asteroides",asteroidesAyer.value);
} else {
  console.log("No existe el documento");
}

</script>

<template>
    <Head/>
        <div class="database pt-10 flex flex-col justify-center items-center">
              <!-- image of yesterday -->
                <div class="flex flex-col items-center justify-center my-4">
                    <h2 class="text-2xl font-bold mt-4 text-center">Image from Yesterday</h2>
                    <div class="flex flex-col items-center justify-center my-4">
                        <div class="py-2 px-2 bg-cover h-auto w-1/3 bg-indigo-950 rounded-md">
                        <img class="bg-cover bg-center rounded-md" alt="imagen astronomica del dia" :src="imagenDiaAyer">
                        </div>
                        <h3 class="rounded px-2 mt-2 bg-indigo-950 font-semibold">{{tituloImagenDiaAyer}}</h3>
                    </div>
                </div>
                <!-- asteroids from yesterday -->
                <div class="mt-24 w-3/4 flex flex-col justify-center items-center">
                    <h2 class="text-2xl font-bold text-center">Last 3 Asteroids from Yesterday</h2>
                    <div class="flex flex-col items-center justify-center my-4">
                        <ul class="flex flex-row flex-wrap gap-3 justify-center items-center">
                            <li v-for="asteroide in asteroidesAyer.slice(asteroidesAyer.length - 3, asteroidesAyer.length)" :key="asteroide.id" class="text-center bg-indigo-950 p-3 rounded-md">

                            <p class="border-b-2 border-gray-700"><b>Name:</b> {{ asteroide.name }}</p>
                            <p v-if="asteroide.is_potentially_hazardous_asteroid == true" class="border-b-2 border-gray-700"><b>Is Hazardous</b></p>
                            <p v-else class="border-b-2 border-gray-700">Is <b>Not</b> Hazardous</p>
                            <p><b>Max. Estimated Diameter:</b> {{ parseFloat(asteroide.estimated_diameter.meters.estimated_diameter_max).toFixed(2) }} m</p>
                            <p class="border-b-2 border-gray-700"><b>Min. Estimated Diameter:</b> {{ parseFloat(asteroide.estimated_diameter.meters.estimated_diameter_min).toFixed(2) }} m</p>
                            
                            <ul>
                                <li v-for="acercamiento in asteroide.close_approach_data">
                                    <p><b>Full Date of close approach:</b> {{ acercamiento.close_approach_date_full }}</p>
                                    <p><b>Kilometers per Hour:</b> {{ parseFloat(acercamiento.relative_velocity.kilometers_per_hour).toFixed(2) }} Km/h</p>
                                </li>
                            </ul>

                        </li>
                        </ul>
                    </div>
                </div>
        </div>
    <Foot/>
</template>

<style scoped>
.database{
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(../assets/fondoDatabase.jpg);
}

</style>