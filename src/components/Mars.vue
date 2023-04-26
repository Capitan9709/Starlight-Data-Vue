<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';


</script>

<template>
  <Head/>
    
  <section id="cuerpo" class="pt-10">
    <div class="about">
      <section class=" py-12 px-4">
        <div class="max-w-5xl mx-auto flex flex-col justify-center items-center">
          <h2 class="text-4xl font-bold mb-4">Mars Weather</h2>

          <iframe src='https://mars.nasa.gov/layout/embed/image/mslweather/' width='1000' height='570'  scrolling='no' frameborder='0'></iframe>

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
  background-image: url(../assets/marteTiempo.jpg);
}

</style>