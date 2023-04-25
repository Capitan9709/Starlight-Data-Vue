<script setup>
import Head from './Head.vue';
import Foot from './Foot.vue';


</script>

<template>
  <Head/>
    
  <section id="cuerpo" class="pt-10">
    <div class="about">
      <section class=" py-12 px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl font-bold mb-4">About Starlight Data</h2>
          <h3 class="text-white font-semibold bg-indigo-950 leading-7 py-1 px-3 rounded-t-md">Introducing Starlight Data</h3>
          <p class="text-gray-100 bg-indigo-900 leading-7 mb-6 py-1 px-3 rounded-b-md shadow-lg">Starlight Data is a web 
            application that allows users to search and view data about 
            near-Earth objects, including asteroids and comets, as well 
            as data from NASA's Exoplanet Archive. Our goal is to provide 
            users with easy access to the latest scientific data and 
            research from NASA in an interactive and user-friendly way.
          </p>
          <h3 class="text-white font-semibold bg-indigo-950 leading-7 py-1 px-3 rounded-t-md">Our Mission: Making Scientific Data Accessible and Engaging</h3>
          <p class="text-gray-100 bg-indigo-900 leading-7 mb-6 py-1 px-3 rounded-b-md shadow-lg">Our team of developers 
            and designers are passionate about making scientific data 
            accessible and engaging for everyone. We believe that by 
            presenting scientific information in a visually appealing 
            and intuitive way, we can help inspire a love for science 
            and encourage more people to learn about the wonders of the 
            universe.
          </p>
          <h3 class="text-white font-semibold bg-indigo-950 leading-7 py-1 px-3 rounded-t-md">User-Friendly Design for Easy Navigation</h3>
          <p class="text-gray-100 bg-indigo-900 leading-7 mb-6 py-1 px-3 rounded-b-md shadow-lg">Our application is designed 
            to be easy to use and navigate, even for users who may not 
            be familiar with scientific terminology or concepts. We 
            provide clear explanations and visualizations of data to 
            help users understand the information presented.
          </p>
          <h3 class="text-white font-semibold bg-indigo-950 leading-7 py-1 px-3 rounded-t-md">Stay Up-to-Date with Starlight Data's News Section</h3>
          <p class="text-gray-100 bg-indigo-900 leading-7 mb-6 py-1 px-3 rounded-b-md shadow-lg">In addition to our search 
            and view features, Starlight Data also includes a news 
            section that highlights the latest discoveries and 
            developments in astronomy and space exploration. We 
            believe that staying up-to-date with the latest scientific 
            news is important for anyone who wants to learn about the 
            universe and its wonders.
          </p>
          <h3 class="text-white font-semibold bg-indigo-950 leading-7 py-1 px-3 rounded-t-md">Constantly Improving: Your Feedback Is Important to Us</h3>
          <p class="text-gray-100 bg-indigo-900 leading-7 mb-6 py-1 px-3 rounded-b-md shadow-lg">Thank you for choosing 
            Starlight Data as your go-to source for scientific data and 
            news. We are constantly working to improve our application 
            and make it even more user-friendly and informative. If you 
            have any feedback or suggestions, please feel free to 
            contact us.
          </p>
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