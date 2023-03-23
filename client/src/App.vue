<script>
import { RouterLink, RouterView } from "vue-router"; 
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDataStore } from "./stores/counter";



import Header from "./components/Header.vue"
import Sidebar from "./components/Sidebar.vue"

export default {
  components: {
    Header,
    Sidebar
  },
  
  methods: {
    ...mapActions(useDataStore, ["getCurrentPlaying"]),
  },
    
  mounted() {
    this.intervalId = setInterval(() => {
      this.getCurrentPlaying()
    }, 500);
  },
    
  
}

</script>

<template>
  <!-- <Header/> -->
  <Sidebar/>
  <div class="  border-white sm:ml-64 bg-gray-800 "> 
    <div class=" border-2  dark:bg-gray-800 border-gray-200  rounded-lg dark:border-gray-700">
      
      <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar"
    aria-controls="cta-button-sidebar" type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 bg-gray-800 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>
      
      
      <RouterView /> 
    </div>
  </div>
</template>
