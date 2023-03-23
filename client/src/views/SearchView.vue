<script>
  import { mapActions, mapState, mapWritableState } from "pinia";
  import { useDataStore } from "../stores/counter";
  import { RouterLink, RouterView } from "vue-router";
  import router from '../router'
  import MusicPlayer from "../components/MusicPlayer.vue";

  
  
  
  
  let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;


  export default {
    components: {
      MusicPlayer
    },
    data() {
      return {
        token: '',
        search:'',
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
        iframeSrc: '',
        musicPlayerData: null
      };
    }, 
    created() {
      
    },
    watch: {
      
    },
    computed: {
      ...mapState(useDataStore, ["spotifyProfile", "spotifyTopTracks", "recentlyPlayed", "topArtists", "searchList", "topGlobal"]),
      // ...mapWritableState(useDataStore, ["access_token"]),
    },
    methods: {
      ...mapActions(useDataStore, ["login", "getProfile", "getTopTracks", "getTopArtists", "getRecentlyPlayed", "searchSongs", "getTopGlobal", "snap", "getDownloadLink"]),
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
        window.location.href = link;
      }, 
      join(arr) {
        return arr.join(',')
      },
      speechToText() {
        try {
          recognition = new SpeechRecognition();
          recognition.lang = this.selectedLanguage;
          recognition.interimResults = true;
          this.recording = true;
          recognition.start();
          recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            if (event.results[0].isFinal) {
              this.texts.push(speechResult);
              this.search +=   speechResult
            } else {
              document.querySelector(".interim").innerHTML = " " + speechResult;
            }
          };
          recognition.onspeechend = () => {
            this.speechToText();
          };
          recognition.onerror = (event) => {
            this.stopRecording();
            if (event.error === "no-speech") {
              console.log("No speech was detected. Stopping...");
            } else if (event.error === "audio-capture") {
              console.log(
                "No microphone was found. Ensure that a microphone is installed."
              );
            } else if (event.error === "not-allowed") {
              console.log("Permission to use microphone is blocked.");
            } else if (event.error === "aborted") {
              console.log("Listening Stopped.");
            } else {
              console.log("Error occurred in recognition: " + event.error);
            }
          };
        } catch (error) {
          this.recording = false;
          console.log(error);
        }
      }, 
      toggleRecording() {
        if (!this.recording) {
          this.speechToText();
        } else {
          this.stopRecording();
        }
      },
      stopRecording() {
        this.searchSongs(this.search)
        recognition.stop();
        this.recording = false;
      },
      
      
      
    playMusic(data) {
      this.musicPlayerData = data;
      // alert('MENGDINA', this.musicPlayerData);
    },
    
    isPreviewAvailable(data) {
      if(!data.preview_url) {
        return "pointer-events-none" 
      }
    }
      
      
    },
  };


</script>


<template>
    
  <section class="h-auto min-h-[100vh] bg-gray-800 " >
     
  
    <MusicPlayer v-if="musicPlayerData" :data="musicPlayerData" />

   <!-- <input v-model="search"   id="search_spotify" type="text" name="" > <button @click="searchSongs(search)" >Search a song </button> -->

  
  <div class="hidden" >
    <select v-model="selectedLanguage" id="language">
      <option v-for="language in languages" :value="language.code">{{ language.name }}</option>
    </select>
    <button class="record" @click="toggleRecording">
      <p>Start Listening</p>
    </button>
    <div class="result">
      <p v-for="text in texts">{{ text }}</p>
    </div>
    <button class="download" :disabled="texts.length === 0" @click="download">Download</button>
    <button class="clear" @click="clear">Clear</button>
  </div>
  
  <form  @submit.prevent="searchSongs(search)" class="flex items-center mt-10 ml-10 w-[30vw]   border-white ">   
    <label for="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <input v-model="search" type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-full focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  " placeholder="Search songs..." required>
        <button @click="toggleRecording" type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg aria-hidden="true" class="w-4 h-4 text-gray-500  hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    <!-- <button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
        <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
    </button> -->
</form>
  
  
 

<div v-if="searchList"  class="relative overflow-x-auto px-4  ">
          <table class="w-full text-sm text-left  border-white text-gray-500 dark:text-unfocus-500">
              <thead class=" border-b border-[rgba(222,222,222,0.1)] text-gray-700 dark:text-gray-400">
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
                <tbody class=""> 
                      <tr  v-for="each, index in searchList"  @dblclick="playMusic(each)" :class="` ${isPreviewAvailable(each)} teer dark:border-none cursor-pointer dark:focus:bg-gray-800  font-sans border border-white rounded-xl dark:hover:bg-[rgba(222,222,222,0.1)] dark:hover:text-white`  ">
                      <!-- <button> -->
                        <th style="border-top-left-radius:10px; border-bottom-left-radius:10px ;" scope="row" class="px-3 py-3 text-end font-semibold  border-white whitespace-nowrap">
                            {{ ++index }}
                        </th>
                        <td class="pr-6 py-2 flex  border-white ">
                          <img :src="each.album.images[1].url" width="40" height="40" class="rounded-sm" alt="">
                          <div class="ml-2 p-0  flex flex-col justify-center " >
                            <p class="font-semibold font-sans text-sm flex dark:text-white  border-red-300 " >{{ each.name }}</p>
                            <p class="font-semibold font-sans text-sm border-red-300" >{{ each.artists[0].name }}</p>
                          </div>
                        </td>
                        <td class="px-6 py-2 text-sm font-semibold font-sans  ">
                          {{ each.album.name }}
                        </td>
                        <td style="border-top-right-radius:10px; border-bottom-right-radius:10px ;"  class="px-6 py-2 text-sm font-semibold  border-white ">
                            {{ msToTimeFormat(each.duration_ms) }}
                        </td> 
                      </tr>
                      
                      
                </tbody>
            </table>
        </div>






  
<header v-if="iframeSrc" class=" h-20 shadow-xl  w-[] rounded-3xl grid grid-flow-col justify-evenly items-center fixed bottom-5 ">
  
    <iframe style="border-radius:12px" :src="iframeSrc" class="w-[90vw]" frameborder="0" allowtransparency="true"
    allow="autoplay; clipboard-write; encrypted-media;" ></iframe>
      
      <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2DnhLgUJg8yx8E4uwPFjYQ?utm_source=generator" width="40%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> -->
      
    <!-- <iframe id="spotify-iframe" :src="iframeSrc" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> -->
    <!-- <button onclick="">Play</button> -->
  </header>
  
  
 <!-- <ul v-if="searchList" > 
    <li v-for="each in searchList.tracks.items" > 
      <img :src="each.album.images[1].url"  width="50" height="50" alt="">  
      {{ each.name }} -  {{ each.artists[0].name }} -  {{ each.album.name }} -  {{ msToTimeFormat(each.duration_ms) }}
      <button v-if="(spotifyProfile.isPaid)"  @click="getDownloadLink(each.track.id)" >{{ each.id }}</button>      
    </li> 
  </ul> -->
 
  
</section> 
   
</template>

<style>
 
 .items{
            display:block;
            width:100%;
            overflow: hidden;
        }
        .container{
            width:100%;
            margin:auto;
            border:1px solid rgb(73, 55, 107);
            list-style: none;
            display:grid;
            grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
            grid-auto-rows: 200px;
            grid-gap:3px;
        }

</style>