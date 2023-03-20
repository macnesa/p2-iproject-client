<script>
  import { RouterLink, RouterView } from "vue-router";
  import { mapActions, mapState, mapWritableState } from "pinia";
  import { useDataStore } from "../stores/counter";


  
  
  
  export default {
    computed: {
      ...mapState(useDataStore, ["currentlyPlaying"]),  
    },
    watch: { 
      
    },
    methods: {
      hitungPersentase(waktuBerlalu, totalWaktu) {
        const persentase = (waktuBerlalu / totalWaktu) * 100;
        return persentase.toFixed(2); // Pembulatan menjadi 2 digit desimal
      },
      msToTimeFormat(milliseconds) {
        var minutes = Math.floor(milliseconds / (1000 * 60));
        var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
      },
    }
  }
  
   

</script>

















<template>
  <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar"
    aria-controls="cta-button-sidebar" type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>

  <aside style="opacity:0.9" id="cta-button-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2">
        
        <li class="border border-white" >
          <a href="#"
            class="flex border border-white items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">       
            <img src="../assets/images/pngegg.png" class="w-10 h-10" /> 
            <p class="ml-1 font-sm text-2xl ">Insight</p>
          </a>
        </li>
        
        <RouterLink to="/"> 
        <li>
          <a href=""
            class="flex mt-10 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <ion-icon aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" name="home-sharp"></ion-icon>
            <span class="ml-3">Home</span>
          </a>
        </li> 
      </RouterLink>
      <RouterLink to="/search">
        <li>
          <div  
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <ion-icon aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" name="search-outline"></ion-icon>
            <span class="flex-1 ml-3 whitespace-nowrap">Seacrh</span>
            <span
              class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
          </div>
        </li>
      </RouterLink>
        <li>
          <a href="#"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <ion-icon aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" name="sparkles-sharp"></ion-icon>
            <span class="flex-1 ml-3 whitespace-nowrap">Spotify Library</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </a>
        </li>

      </ul>
      <RouterLink to="/auth">
        
        
      <section id="dropdown-cta" class="p-4 mt-6  bg-blue-50 dark:bg-gray-900" role="alert">
         
        <p class="text-xs text-gray-900 dark:text-white text-center font-bold">LISTENING TO SPOTIFY</p>
        
        
        <div class="mt-2 border border-black" v-if="Object.keys(currentlyPlaying).length">
          <img :src="currentlyPlaying.item.album.images[0].url" alt="">
          
          <!-- ({{ currentlyPlaying.item.id }}) - On {{ currentlyPlaying.item.album.name }}  -->
          <p class="text-white font-bold mt-2"> {{ currentlyPlaying.item.name }}  </p>

          
          <p class="text-white text-xs"> {{ currentlyPlaying.item.artists[0].name }} </p>
          <!-- <p v-for="each in currentlyPlaying.item.artists" class="text-white"> {{ each.name }} </p> -->
          
          
          <div class="w-full mt-4 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div class="bg-white h-1.5 rounded-full" :style="{ width: `${hitungPersentase(currentlyPlaying.progress_ms, currentlyPlaying.item.duration_ms)}%` }" ></div>
          </div>

          <div class="flex justify-between">
            <p class="text-white text-xs border-white"> {{ msToTimeFormat(currentlyPlaying.progress_ms) }} </p>
            <p class="text-white text-xs border-white"> {{ msToTimeFormat(currentlyPlaying.item.duration_ms) }} </p>
          </div>
         

          <!-- <p  class="text-white"> {{ hitungPersentase(currentlyPlaying.progress_ms, currentlyPlaying.item.duration_ms) }} </p> -->

          
          <!-- <p v-for="tiap in each.artists"  class="text-white" > {{ tiap.name }} </p>   -->
        </div>
        <div v-else>
          <p>No data is currently available</p>
        </div>
        
          
      </section>
      
      
    </RouterLink>
    </div>
  </aside>
</template>







<!-- <div class="flex items-center mb-3">
  <span
    class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
  <button type="button"
    class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
    data-dismiss-target="#dropdown-cta" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"></path>
    </svg>
  </button>
</div>
<p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
  Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your
  profile.
</p>
<a class="text-sm text-blue-800 underline hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
  href="#">Turn new navigation off</a> -->