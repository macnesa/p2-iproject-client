<script>
import { RouterLink, RouterView } from "vue-router"; 

import Header from "./components/Header.vue"
import Sidebar from "./components/Sidebar.vue"

export default {
  components: {
    Header,
    Sidebar
  }
}

</script>

<template>
  <!-- <Header/> -->
  <Sidebar/>
  <RouterView />
</template>
