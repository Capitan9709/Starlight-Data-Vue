import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import './assets/main.css'

import Home from './components/Home.vue'
import About from './components/About.vue'
import Database from './components/Database.vue'
import Rover from './components/Rover.vue'
import Mars from './components/Mars.vue'

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/about', component: About, name: 'About' },
    { path: '/database', component: Database, name: 'Database' },
    { path: '/mars', component: Mars, name: 'Mars' },
    { path: '/rover', component: Rover, name: 'Rover' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
