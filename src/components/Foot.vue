<script setup>

</script>

<template>
    <footer class="py-4 text-white bg-indigo-950">
        <div id="footerContent" class="px-5 grid grid-cols-3">
            <div class="flex justify-center">
                <p class="font-semibold">©Copyright - Starlight Data | 2023</p>
            </div>
            <div class="flex justify-center">
                <router-link to="/about" class="py-1 px-2 rounded-md font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 transition duration-200 ease-out hover:ease-in">About Us</router-link>
                
            </div>
            <div class="flex flex-row gap-5 justify-center">
                <a id="icons" href="https://twitter.com/" target="_blank" class="px-2 py-1 hover:text-blue-500"><i class="fa-brands fa-twitter scale-150"></i></a>
                <a id="icons" href="https://instagram.com/" target="_blank" class="px-2 py-1 rounded-lg hover:bg-gradient-to-tr from-amber-400 from-10% via-orange-500 via-35% to-purple-600 to-90%"><i class="fa-brands fa-instagram scale-150"></i></a>
                <a id="icons" href="https://facebook.com/" target="_blank" class="px-2 py-1 hover:text-blue-800"><i class="fa-brands fa-facebook scale-150"></i></a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
#icons:hover{
    animation: spin 0.4s linear;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>