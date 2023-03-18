<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useDataStore } from "../stores/counter";
import { RouterLink, RouterView } from "vue-router";
import router from '../router'

import ArtistCard from "../components/ArtistCard.vue"

import MusicTable from "../components/Table.vue"
import MusicCard from "../components/MusicCard.vue"

export default {
  components: {
    ArtistCard,
    MusicTable,
    MusicCard
  },
  data() {
    return {
      token: '',
      search: '',
      languages: [
        {
          no: "16",
          name: "English",
          native: "English",
          code: "en",
        }
      ],
      selectedLanguage: "en",
      texts: [],
      // texts: '',
      iframeSrc: '',
      isPaused: false,
      spotifyId: 'spotify:episode:43cbJh4ccRD7lzM2730YK3',
      player: null,
      intervalId: null
    };
  },

  async beforeMount() {

  },

  mounted() {
    this.intervalId = setInterval(() => {
      this.getCurrentPlaying()
    }, 500);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.token = token
      // this.login(code)
      this.getProfile()
      this.getTopTracks()
      this.getTopArtists() // iclude top tracks by top 1 artist
      this.getRecentlyPlayed()
      this.getTopGlobal()
      this.getCurrentPlaying()
    }
  },
  watch: {

  },
  computed: {
    ...mapState(useDataStore, ["spotifyProfile", "spotifyTopTracks", "recentlyPlayed", "topArtists", "topTracksByArtist", "currentlyPlaying", "tracksByTopOneSong", "searchList", "topGlobal"]),
    // ...mapWritableState(useDataStore, ["access_token"]),
  },
  methods: {
    ...mapActions(useDataStore, ["login", "getProfile", "getTopTracks", "getTopArtists", "getTopTracksByArtist", "getRecentlyPlayed", "getCurrentPlaying", "searchSongs", "getTopGlobal", "snap", "getDownloadLink"]),
    tes() {
    },
    msToTimeFormat(milliseconds) {
      var minutes = Math.floor(milliseconds / (1000 * 60));
      var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
      return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    },
    playSong(id) {
      this.iframeSrc = `https://open.spotify.com/embed/track/${id}?utm_source=generator`
      // document.getElementById('spotify-iframe').contentWindow.postMessage('play', 'https://open.spotify.com');
    },
    async download(id) {
      const link = await this.getDownloadLink(id)
      window.location.href = "https://api.spotifydown.com/dl/Omer%20Adam%20-%20%D7%90%D7%A0%D7%99.mp3";
    },
    join(arr) {
      return arr.join(',')
    },
    hitungPersentase(waktuBerlalu, totalWaktu) {
      const persentase = (waktuBerlalu / totalWaktu) * 100;
      return persentase.toFixed(2); // Pembulatan menjadi 2 digit desimal
    }
  },
};


</script>












<template class="  " >
  <div style="background-image: url('https://wallpapercave.com/wp/wp2434267.jpg');background-size: cover;"
    class="border-4 border-red-600 p-4 ">

    
    

    <div class="mt-10  text-[2rem]">
      <p>Currently playing</p>
    </div>

    <div v-if="Object.keys(currentlyPlaying).length">
      <img :src="currentlyPlaying.item.album.images[0].url" width="50" height="50" alt="">
      <p class="text-white"> {{ currentlyPlaying.item.name }} ({{ currentlyPlaying.item.id }}) - On {{
        currentlyPlaying.item.album.name }} </p>

      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${hitungPersentase(currentlyPlaying.progress_ms, currentlyPlaying.item.duration_ms )}%` }" ></div>
      </div>

      <p class="text-white"> {{ msToTimeFormat(currentlyPlaying.progress_ms) }} * {{
        msToTimeFormat(currentlyPlaying.item.duration_ms) }} </p>

      <p  class="text-white"> {{ hitungPersentase(currentlyPlaying.progress_ms, currentlyPlaying.item.duration_ms ) }} </p>

      <p v-for="each in currentlyPlaying.item.artists" class="text-white"> {{ each.name }} </p>
      <!-- <p v-for="tiap in each.artists"  class="text-white" > {{ tiap.name }} </p>   -->
    </div>
    <div v-else>
      <p>No data is currently available</p>
    </div>



 

  </div>





  <p>my code: {{ token }}</p>
</template>








































<style>
.items {
  display: block;
  width: 100%;
  /* overflow: hidden; */
}

.box {
  width: 100%;
  /* margin: auto; */
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 250px;
  grid-gap: 35px;
}


:root {
  --button-height: 2rem;
  --button-color: #edd;
}


.fake-player {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  padding: 2rem;
  border: 0.2rem solid var(--button-color);
  border-radius: 50%;
  filter: drop-shadow(0 0 3.1rem rgba(255, 255, 255, 0.8));
}

button {
  margin: 0;
  padding: 0;
}

.play {
  height: 0;
  width: 0;
  margin-left: calc(2 * 0.14 * var(--button-height));
  /*margin-left: 17px;*/
  background: none;
  border: none;
  border-top: var(--button-height) solid transparent;
  border-bottom: var(--button-height) solid transparent;
  border-left: calc(var(--button-height) * 2 * 0.86) solid var(--button-color);

}

.pause {
  position: relative;
  background: none;
  border: none;
  height: calc(var(--button-height) * 2);
  width: calc(var(--button-height) * 2 * 0.86);
}

.pause:before,
.pause:after {
  content: "";
  position: absolute;
  top: 0;
  height: 100%;
  width: 33%;
  background: var(--button-color);
}

.pause:before {
  left: 0;
}

.pause:after {
  right: 0;
}

.hidden {
  display: none;
}
</style>