<script setup>

</script>

<template>
    <header class="flex flex-row items-center justify-center py-4 text-white fixed z-10 w-full">
        <nav>
            <ul class="flex flex-row justify-center gap-4">
                <li class="py-1 px-3  bg-indigo-950 rounded font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition duration-200 ease-out hover:ease-in"><router-link to="/">Home <i class="fa-solid fa-earth-europe"></i></router-link></li>
                <li class="py-1 px-3  bg-indigo-950 rounded font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition duration-200 ease-out hover:ease-in"><router-link to="/database">Database <i class="fa-solid fa-server"></i></router-link></li>
                <!-- <li class="py-1 px-3  bg-indigo-950 rounded font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition duration-200 ease-out hover:ease-in">Mars <i class="fa-solid fa-book-atlas"></i></li> -->
                <li class="py-1 px-3  bg-indigo-950 rounded font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition duration-200 ease-out hover:ease-in"><router-link to="/rover">Rover <i class="fa-brands fa-android"></i></router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

</style>