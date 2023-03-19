
     
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
      intervalId: null,
      isPlaying: false
    };
  },

  async beforeMount() {

  },

  mounted() {
    this.intervalId = setInterval(() => {
      this.getCurrentPlaying()
    }, 500);

    // var audio = document.getElementById("audio-preview");
    // audio.play();

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
      this.getTopLocal()
      this.getCurrentPlaying()
    }


  },
  watch: {

  },
  computed: {
    ...mapState(useDataStore, ["spotifyProfile", "spotifyTopTracks", 'topLocal', "recentlyPlayed", "topArtists", "topTracksByArtist", "currentlyPlaying", "tracksByTopOneSong", "searchList", "topGlobal"]),
    // ...mapWritableState(useDataStore, ["access_token"]),
  },
  methods: {
    ...mapActions(useDataStore, ["login", "getProfile", "getTopLocal", "getTopTracks", "getTopArtists", "getTopTracksByArtist", "getRecentlyPlayed", "getCurrentPlaying", "searchSongs", "getTopGlobal", "snap", "getDownloadLink"]),
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
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    }
  },
};


</script>
    
    
    
    
    
     
<template class="  " >
  <div style="background-image: url('https://wallpapercave.com/wp/wp2434267.jpg');background-size: cover;"
    class="border-4 border-red-600 p-4 ">





    <div class="p-4 sm:ml-64 bg-red-200 ">

      <div class="p-4 border-2 bg-yellow-800 border-gray-200 border-dashed rounded-lg dark:border-gray-700">




        <!-- TOP SONG --> 
        <p class="mt-5 mb-5 text-4xl font-bold text-gray-900 dark:text-white">Top Song</p>
        <!-- bg-white dark:bg-gray-900  max-w-screen-xl  -->
        <section v-if="spotifyTopTracks.items?.length" class="grid h-[30rem] border-4 overflow-hidden border-blue-900 ">

          <!-- h-[100%] w-[100%] -->
          <!-- <div style="z-index:0" class=" h-[100%] w-[100%] overflow-hidden row-start-1 col-start-1 ">
                  <img :src="spotifyTopTracks.items[0].album.images[0].url"
                    class="h-[100%] w-[100%] blur-sm scale-125 brightness-[0.2]  ">
                </div> -->

          <!-- album rotate container -->
          <div style="z-index:"
            class=" h-[100%] w-[100%] overflow-hidden lg:mt-0 grid items-end justify-end border border-yellow-200 row-start-1 col-start-1">
            <!--                                                             -->
            <div style="transform: rotate(30deg) translate(170px, -60px); transform-origin: 0 0; "
              class=" h-[600px] w-[600px] grid grid-flow-col border border-white overflow-hidden ">

              <!-- stack gimmick -->
              <span class="block row-start-1 h-full mt-10 ml-5 col-start-1 w-5 bg-green-300"></span>
              <span class="block row-start-1 h-full mt-20 col-start-1 w-5 bg-green-400"></span>
              <!-- album -->
              <img :src="spotifyTopTracks.items[0].album.images[0].url"
                class=" row-start-1 col-start-1 ml-10 h-[100%] w-[100%] ">

            </div>

          </div>


          <!-- lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12   -->
          <section style="filter:brightness(1);z-index:"
            class="grid px-4 py-1 w-[50%] h-full row-start-1 col-start-1 border border-red-600  ">

            <section class="m-auto place-self-center lg:col-span-7 border border-white ">
              <h1
                class=" mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-[8rem] dark:text-white">
                {{ spotifyTopTracks.items[0].name }}</h1>
                
              <div class="flex items-center">  
                
                <div class=" w-[max-content]  flex justify-center items-center" @click="togglePlay">
                  <!-- <div class="play" v-if="!isPlaying"></div>  -->
                  <!-- <div class="pause" v-if="isPlaying"></div> -->
                  <ion-icon class="w-20 h-20 text-green-400 " v-if="!isPlaying" name="play-circle-sharp"></ion-icon>
                  <ion-icon class="w-20 h-20 text-green-400 " v-if="isPlaying" name="pause-circle-sharp"></ion-icon>
                </div>
                
                <img class="w-6 h-6 rounded-full" src="https://i.scdn.co/image/ab6761610000e5ebb283c3a97aea1c06e2cf1a2c" alt="Rounded avatar">
                <p class="max-w-2xl ml-1 font-semibold text-gray-500   md:text-base lg:text-base  dark:text-white">
                 
                {{ spotifyTopTracks.items[0].artists[0].name }} * {{ new Date(spotifyTopTracks.items[0].album.release_date).getFullYear() }} * {{ spotifyTopTracks.items[0].album.name }} </p> 
                 
              </div>
               

              <!-- <p class="max-w-2xl mb-4 font-light text-gray-500   md:text-lg lg:text-xl dark:text-white">{{
                    msToTimeFormat(spotifyTopTracks.items[0].duration_ms) }}</p> -->
 
            </section>
          </section>


        </section>
        <div v-else>
          <p>No data is currently available</p>
        </div>
        <!-- END TOP SONG -->





        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        




        <!-- TOP ARTIST --> 
        <p class="mt-5 mb-5 text-4xl font-bold text-gray-900 dark:text-white">Top Artist</p>
        <div v-if="topArtists.items?.length"
          class=" h-auto min-h-[30rem] w-full box-border overflow-hidden  shadow-xl border-4 border-yellow-300  grid">

          <!-- <div style="z-index:0"
            class=" h-[100%] w-[100%] overflow-hidden border-3 border-purple-500 row-start-1 col-start-1">
            <img :src="topArtists.items[0].images[1].url" class=" h-[100%]  w-[100%] blur-lg scale-125 brightness-[0.2]  ">
          </div> -->

          <!-- rounded-[50px] grid-flow-col grid-cols-[max-content_1fr]  -->
          <div style="filter:brightness(1);  "
            class=" p-5 m-12 text-[100%] grid items-center border border-red-400 bg-white   ">
            <!--  -->
            <!-- <img :src="topArtists.items[0].images[1].url" class="  rounded-[250px]  h-[100%] border border-black "> -->

            <!--  pl-16 -->
            <div class=" text-gray-800 w-full  grid items-center  border border-black ">

              <!-- text-[6rem] {{ topArtists.items[0].name }} -->
              <!-- <p class=" self-end text-[5rem] font-bold ">Eden Ben Zaken</p> -->

              <p class=" max-w-[100%] text-[500%] text-center font-bold   bg-clip-text text-transparent bg-center bg-no-repeat bg-cover border border-black "
              :style="'background-image: url(' + topArtists.items[0].images[1].url + ')'">
                {{ topArtists.items[0].name }}
              </p>

              <!-- <div class="self-start"> -->
                <p class="font-bold border border-black "> {{ topArtists.items[0].genres.map(str => str.toLocaleUpperCase('title')).join(" - ")
                }}</p>
              </div>
              
            <!-- </div> -->

          </div>

        </div>
        <div v-else>
          <p>No data is currently available</p>
        </div>
        <!-- END TOP ARTIST -->

        <!-- <div class="w-[300px] text-[100%] h-auto min-h-[30rem] border-4 border-black">
            <p class="max-w-full border text-[500%] border-white ">Eden Ben Zaken</p>
        </div> -->


        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <!-- TRACKS BY TOP ARTIST -->
        <!-- v-for="each in topTracksByArtist.tracks" -->
      <!-- <p class="mt-5 mb-5 text-2xl font-bold text-gray-900 dark:text-white">Based from top one artist</p>  -->
      <section v-if="topArtists.items?.length && topTracksByArtist.tracks?.length" style="background: linear-gradient(0deg, rgba(24,23,41,1) 1%, rgba(43,30,47,1) 27%, rgba(72,42,83,1) 59%, rgba(133,99,144,1) 100%);"  class=" h-auto  w-full box-border overflow-hidden  shadow-xl border-4 border-yellow-300 ||  grid"> 
        
        <section class="h-auto p-10 min-h-[30rem] w-full box-border overflow-hidden  shadow-xl border-4 border-red-200 || grid grid-flow-col grid-cols-[max-content_1fr]  ">
        
          <div class="border-4 border-l-blue-200 grid justify-center items-end ">
            <img :src="topArtists.items[0].images[1].url" class="w-[20rem] h-[20rem]" alt="">   
          </div>
          
          <div class="border border-l-fuchsia-600 flex flex-col justify-end px-4 ">
             
            <p class="text-base font-semibold text-gray-900 dark:text-white">THIS IS</p>
              
            <p class="text-6xl font-extrabold text-gray-900 dark:text-white"> {{ topArtists.items[0].name }}   </p>
             
            <p class="text-base font-semibold text-gray-900 dark:text-white">The most popular songs by {{ topArtists.items[0].name }}, the artist you listen to the most.</p>
  
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ topTracksByArtist.tracks.length }} Songs</p>
            
          </div>
          
          
        </section>
        
        
        
        
        <!-- SONGS BY TOP 1 ARTIST -->
        <div v-if="topTracksByArtist?.tracks?.length" style="background-color: rgba(0, 0, 0, 0.33);" class="relative overflow-x-auto  ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class=" border-b border-gray-800 text-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" class="px-3 py-3 w-5 text-end font-semibold ">
                            #
                        </th>
                        <th scope="col" class="pr-6 py-3 font-semibold">
                            Title
                        </th>
                        <th  class="px-6 py-3 font-semibold">
                          Album
                        </th>
                        <th scope="col" class="px-6 py-3">
                          <ion-icon name="time-outline"></ion-icon>
                        </th>
                        <!-- <th scope="col" class="px-6 py-3">
                          
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="each, index in topTracksByArtist.tracks" class=" teer dark:border-gray-700 dark:focus:bg-gray-800 dark:hover:bg-gray-800 dark:hover:text-white ">
                      <!-- <button> -->
                        <th scope="row" class="px-3 py-3 text-end font-medium  border-white text-gray-900 whitespace-nowrap dark:text-white">
                            {{ ++index }}
                        </th>
                        <td class="pr-6 py-2 flex  border-white ">
                          <img :src="each.album.images[1].url" width="50" height="50" alt="">
                          <div class="ml-2 p-0  flex flex-col justify-center " >
                            <p class="font-semibold text-[1rem] flex dark:text-white  border-red-300 " >{{ each.name }}</p>
                            <p class="font-semibold text-sm border-red-300" >{{ each.artists[0].name }}</p>
                          </div>
                        </td>
                        <td class="px-6 py-2 font-semibold">
                          {{ each.album.name }}
                        </td>
                        <td class="px-6 py-2 font-semibold">
                            {{ msToTimeFormat(each.duration_ms) }}
                        </td>
                        <!-- <td>
                          <button @click="playSong(each.id)" type="button" class=" mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Play</button>        
                          <button v-if="(spotifyProfile.isPaid)" @click="download(each.id)" class=" mt-4 focus:outline-none text-white bg-cyan-700 hover:bg-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" >Download</button>   
                        </td> -->
                      <!-- </button> -->
                      </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>No data is currently available</p>
        </div>
        
        
        
        
        
        
        
         
        <!-- <img :src="each.album.images[0].url"  width="50" height="50" alt="">  
        <p class="text-white" > {{ each.name }} ({{ each.id }}) - {{ each.album.release_date }}  -  On {{ each.album.name }}  -  Popularity: {{ each.popularity }} </p>
        <p v-for="tiap in each.artists"  class="text-white" > {{ tiap.name }} </p>   -->
      </section>
       
    
       
        
        
        
        
      
      
      
      
       <!-- TOP 10 SONGS  -->  
      <section  v-if="spotifyTopTracks?.items?.length" style="background: linear-gradient(0deg, rgba(24,23,41,1) 1%, rgba(3,27,33,1) 30%, rgba(12,51,62,1) 70%, rgba(7,77,97,1) 100%);"  class=" mt-10 h-auto  w-full box-border overflow-hidden  shadow-xl border-4 border-yellow-300 ||  grid"> 
        
        <section class="h-auto p-10 min-h-[30rem] w-full box-border overflow-hidden  shadow-xl border-4 border-red-200 || grid grid-flow-col grid-cols-[max-content_1fr]  ">
        
          <div class="grid items-center self-end" >
            <div class="border-4 w-[20rem] h-[20rem] border-l-blue-200 grid grid-flow-col grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] ">
              
              
              <img :src="spotifyTopTracks.items[0].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[1].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[2].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[3].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              
            </div>
          </div>
          
          <div class="border border-l-fuchsia-600 flex flex-col justify-end px-4 ">
             
            <p class="text-base font-semibold text-gray-900 dark:text-white">THIS IS</p>
              
            <p class="text-6xl font-extrabold text-gray-900 dark:text-white"> TOP 10   </p>
             
            <p class="text-base font-semibold text-gray-900 dark:text-white">The most popular songs by {{ topArtists.items[0].name }}, the artist you listen to the most.</p>
  
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ topTracksByArtist.tracks.length }} Songs</p>
            
          </div>
          
          
        </section>
        
        
        
         
        <div style="background-color: rgba(0, 0, 0, 0.33);" class="relative overflow-x-auto  ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class=" border-b border-gray-800 text-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" class="px-3 py-3 w-5 text-end font-semibold ">
                            #
                        </th>
                        <th scope="col" class="pr-6 py-3 font-semibold">
                            Title
                        </th>
                        <th  class="px-6 py-3 font-semibold">
                          Album
                        </th>
                        <th scope="col" class="px-6 py-3">
                          <ion-icon name="time-outline"></ion-icon>
                        </th>
                        <!-- <th scope="col" class="px-6 py-3">
                          
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="each, index in spotifyTopTracks.items" class=" teer dark:border-gray-700 dark:focus:bg-gray-800 dark:hover:bg-gray-800 dark:hover:text-white ">
                      <!-- <button> -->
                        <th scope="row" class="px-3 py-3 text-end font-medium  border-white text-gray-900 whitespace-nowrap dark:text-white">
                            {{ ++index }}
                        </th>
                        <td class="pr-6 py-2 flex  border-white ">
                          <img :src="each.album.images[1].url" width="50" height="50" alt="">
                          <div class="ml-2 p-0  flex flex-col justify-center " >
                            <p class="font-semibold text-[1rem] flex dark:text-white  border-red-300 " >{{ each.name }}</p>
                            <p class="font-semibold text-sm border-red-300" >{{ each.artists[0].name }}</p>
                          </div>
                        </td>
                        <td class="px-6 py-2 font-semibold">
                          {{ each.album.name }}
                        </td>
                        <td class="px-6 py-2 font-semibold">
                            {{ msToTimeFormat(each.duration_ms) }}
                        </td> 
                      </tr>
                </tbody>
            </table>
        </div>
 
        
        
         
      </section>
      <div v-else>
            <p>No data is currently available</p>
        </div>
      
      
       <ul v-if="spotifyTopTracks?.items?.length" > 
          <li>your top tracks</li> 
          <li v-for="each in spotifyTopTracks.items" > 
            <img :src="each.album.images[1].url"  width="50" height="50" alt="">  
            {{ each.name }}  - {{ each.artists[0].name }} - {{ msToTimeFormat(each.duration_ms)  }} - {{ each.album.name }}   
          </li>
        </ul>
      
      
        
        
        
        
      </div>





      <p class="text-white">my code: {{ token }}</p>



    </div>

  </div>
</template>


<style>

.teer:active {
  background-color: white;
}
.teer:focus {
  background-color: white;
}

.circle-container {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #aaa;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.circle-container.playing {
  background-color: #66bb6a;
}

.play,
.pause {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
}

.play {
  border-right: 20px solid white;
}

.pause {
  width: 12px;
  height: 24px;
  background-color: white;
  display: flex;
}

.pause:before,
.pause:after {
  content: "";
  width: 12px;
  height: 12px;
  background-color: white;
}

.pause:before {
  margin-right: 4px;
}

.pause:after {
  margin-left: 4px;
}
</style>