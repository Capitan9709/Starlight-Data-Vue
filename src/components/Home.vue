<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';
import { getAPOD } from '../nasaApi.js';
import { ref } from 'vue';
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const currentDate = `${year}-${month}-${day}`

const imagenDia = ref('');
const tituloImagenDia = ref('');
const fechaimagenDia = ref('');
const descripcionImagenDia = ref('');


// const querySnapshot = await getDocs(collection(db, "APODs"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });

const docRef = doc(db, "APODs", currentDate);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Existe el documento, mostrando datos...");
  console.log("Datos del documento:", docSnap.data());
  
  imagenDia.value = docSnap.data().imagen;
  tituloImagenDia.value = docSnap.data().titulo;
  fechaimagenDia.value = docSnap.data().fecha;
  descripcionImagenDia.value = docSnap.data().descripcion;

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




</script>

<template>
  <Head />
  <div class="home bg-local bg-no-repeat bg-center">
    <p>Esto es una prueba</p>
    <div class="flex flex-col items-center justify-center my-4 w-screen">
        <div class="bg-cover h-auto w-1/3 bg-slate-700 rounded-md">
          <img class="bg-cover bg-center rounded-md" alt="imagen astronomica del dia" :src="imagenDia">
        </div>
        <h3 class="rounded px-2 mt-3 bg-slate-700">{{tituloImagenDia}}</h3>
    </div>
    {{ currentDate }}
  </div>
  <Foot />
</template>

<style scoped>
.home {
  height: 100%;
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