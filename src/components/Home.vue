<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getAPOD, getAsteroids } from '../nasaApi.js';
import { ref } from 'vue';
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

// variables para la fecha actual
const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const currentDate = `${year}-${month}-${day}`

// variables para la imagen del dia
const imagenDia = ref('');
const tituloImagenDia = ref('');
const fechaimagenDia = ref('');
const descripcionImagenDia = ref('');

// variables para los asteroides
const asteroides = ref([]);

// const querySnapshot = await getDocs(collection(db, "APODs"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });


// saca los datos de la imagen del dia de la base de datos
// si no existe, los saca de la api y los guarda en la base de datos
const apodCollection = doc(db, "APODs", currentDate);
const apodSnap = await getDoc(apodCollection);

if (apodSnap.exists()) {
  // console.log("Existe el documento, mostrando datos...");
  // console.log("Datos del documento:", apodSnap.data());
  
  imagenDia.value = apodSnap.data().imagen;
  tituloImagenDia.value = apodSnap.data().titulo;
  fechaimagenDia.value = apodSnap.data().fecha;
  descripcionImagenDia.value = apodSnap.data().descripcion;

} else {
  console.log("No existe el documento, creando...");

  try {
    
    getAPOD()
      .then((data) => {
        imagenDia.value = data.hdurl;
        tituloImagenDia.value = data.title;
        fechaimagenDia.value = data.date;
        descripcionImagenDia.value = data.explanation;

      setDoc(doc(db, "APODs", currentDate), {
        fecha: fechaimagenDia.value,
        titulo: tituloImagenDia.value,
        imagen: imagenDia.value,
        descripcion: descripcionImagenDia.value,
      });
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("El documento se ha creado");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// saca los datos de los asteroides de la base de datos
// si no existe, los saca de la api y los guarda en la base de datos
const asteriodCollection = doc(db, "Asteroids", currentDate);
const asteroidSnap = await getDoc(asteriodCollection);

if (asteroidSnap.exists()) {
  // console.log("Existe el documento, mostrando datos...");
  // console.log("Datos del documento:", asteroidSnap.data());
  
  asteroides.value = asteroidSnap.data().asteroides;

  console.log("asteroides",asteroides.value);
} else {
  console.log("No existe el documento, creando...");

  try {
    
    getAsteroids()
      .then((data) => {
        asteroides.value = data.near_earth_objects[currentDate];

      setDoc(doc(db, "Asteroids", currentDate), {
        fecha: currentDate,
        asteroides: data.near_earth_objects[currentDate],
      });
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("El documento se ha creado");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


</script>

<template>
  <Head />
  <div class="home text-white flex flex-col items-center justify-center bg-local bg-no-repeat bg-center">
    
    <h1 class="text-2xl font-bold mt-4">Image of the Day</h1>
    <div class="flex flex-col items-center justify-center my-4">
        <div class="py-2 px-2 bg-cover h-auto w-1/3 bg-slate-700 rounded-md">
          <img class="bg-cover bg-center rounded-md" alt="imagen astronomica del dia" :src="imagenDia">
        </div>
        <h3 class="rounded px-2 mt-2 bg-slate-700">{{tituloImagenDia}}</h3>
    </div>

    <div class="mt-4 w-4/5">
      <h2 class="text-2xl font-bold text-center">Asteroids Near Earth</h2>
      <div class="flex flex-col items-center justify-center my-4">
        <ul class="flex flex-row flex-wrap gap-3 justify-center items-center">
          <li v-for="asteroide in asteroides" :key="asteroide.id" class="text-center bg-slate-700 p-3 rounded-md">
            
            <p>Name: {{ asteroide.name }}</p>
            <p v-if="asteroide.is_potentially_hazardous_asteroid == true">Is Hazardous</p>
            <p v-else>Is Not Hazardous</p>
            <ul>
              <li v-for="diametro in asteroide.estimated_diameter">
                <p v-if="diametro.kilometers">{{ diametro.kilometers.estimated_diameter_min }}</p>
                <p v-if="diametro.kilometers">{{ diametro.kilometers.estimated_diameter_max }}</p>
              </li>
            </ul>
            <ul>
              <li v-for="acercamiento in asteroide.close_approach_data">
                <p>Full Date of close approach: {{ acercamiento.close_approach_date_full }}</p>
                <p>Kilometers per Hour: {{ parseFloat(acercamiento.relative_velocity.kilometers_per_hour).toFixed(2) }} Km/h</p>
                <p>Miss Distance: {{ parseFloat(acercamiento.miss_distance.kilometers).toFixed(2) }} Km</p>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </div>
  </div>
  <Foot />
</template>

<style scoped>
.home {
  height: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  animation: change-background 20s infinite;
}

@keyframes change-background {
  0% {
      background-image: url(../assets/espacio.jpg);
  }

  33% {
      background-image: url(../assets/espacio2.jpg);
  }

  66% {
      background-image: url(../assets/espacio3.jpg);
  }

  100% {
      background-image: url(../assets/espacio.jpg);
  }
}
</style>