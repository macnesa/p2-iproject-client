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
   
   
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.token = token  
      this.getCurrentPlaying()
    } 
  },
  
  
}

</script>

<template>
  <!-- <Header/> -->
  <Sidebar/>
  <div class="p-4 sm:ml-64 bg-green-400 "> 
    <div class="p-4 border-2 dark:bg-gray-800 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <RouterView /> 
    </div>
  </div>
</template>
