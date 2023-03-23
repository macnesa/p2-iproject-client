
     
<script>
  import { mapActions, mapState, mapWritableState } from "pinia";
  import { useDataStore } from "../stores/counter";
  import { RouterLink, RouterView } from "vue-router";
  import router from '../router'
  
  
  import { Collapse } from 'flowbite';

  import ColorThief from "colorthief"



  // Import Swiper Vue.js components
  import { EffectFade } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-fade'



  import ArtistCard from "../components/ArtistCard.vue"
  import MusicPlayer from "../components/MusicPlayer.vue";
  import MusicTable from "../components/Table.vue"
  import MusicCard from "../components/MusicCard.vue"

  export default {
    components: {
      Swiper,
      SwiperSlide,
      
      ArtistCard,
      MusicTable,
      MusicCard,
      MusicPlayer
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
        isPlaying: false,
        musicPlayerData: null,
        arrOfColor: null,
        topArtistColor:null
      };
    },

    async beforeMount() {

    },
    
    

    mounted() { 

      
      
      // const body = document.body,
      // jsScroll = document.getElementById('conta'),
      // height = jsScroll.getBoundingClientRect().height - 1,
      // speed = 1

      //   var offset = 0

      //   body.style.height = Math.floor(height) + "px"

      //   function smoothScroll() {
      //       offset += (window.pageYOffset - offset) * speed
            
      //       var scroll = "translateY(-" + offset + "px) translateZ(0)"
      //       jsScroll.style.transform = scroll
            
      //      requestAnimationFrame(smoothScroll)
      //   }
      //   smoothScroll()
      
      
      
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
       
        const imageURL = 'https://i.scdn.co/image/ab67616d00001e02f6d6d1005e2dbe28c312fe2f';
        const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
 
        const colorThief = new ColorThief();
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = googleProxyURL + encodeURIComponent(imageURL);
 
        const vm = this; // Bind "this" to Vue instance
        img.addEventListener('load', function () {
          const newPalette = colorThief.getColor(img);
          vm.arrOfColor = newPalette; // Use "vm" instead of "this"
           console.log(vm.arrOfColor, "YALOMA YALOMA YALOMALOMALOMA"); 
        });
         

        
       

        
        

    },
    watch: {
      topArtists(newVal) {
        
        const imageURL = newVal.items[0].images[1].url;
        const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
 
        const colorThief = new ColorThief();
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = googleProxyURL + encodeURIComponent(imageURL);
 
        const vm = this;  
        img.addEventListener('load', function () {
          const newPalette = colorThief.getColor(img);
          vm.topArtistColor = newPalette;  
           console.log(vm.topArtistColor, "MASUAKKKK"); 
        });
        
        // console.log('MASUAKKKKKKKKK', newVal);
      }
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
      
      togglePlay(data) {
        this.isPlaying = !this.isPlaying;
        this.musicPlayerData = data;
      },
      
      playMusic(data) {
        this.musicPlayerData = data;
        // alert('NGENTOT', this.musicPlayerData);
      },
      
      isPreviewAvailable(data) {
        if(!data.preview_url) {
          return "pointer-events-none" 
        }
      },
      
       getTopThree(data) {
        let result = [];
        for (let i = 0; i < data.length && result.length < 3; i++) {
          const artistName = data[i].artists[0].name;
          if (result.includes(artistName)) {
            continue;
          }
          result.push(artistName);
        }
        return result.join(', ');
      },
 
      
      // signOut(){ 
      //   localStorage.removeItem('token')
      //   this.$router.push("/login")
      // }
      
    },
    
    
          
    setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
          EffectFade,
        };
      },
      
     
    
    
  };


  

 


</script>
    
    
    
    
    
     
<template class="  " >
  <!-- 'https://wallpapercave.com/wp/wp2434267.jpg' -->
  <div id="conta" style="background-image: url();background-size: cover;"
    class=" border-red-600  ">

    <MusicPlayer v-if="musicPlayerData" :data="musicPlayerData" />

    
    
    
<!--     
    <div style="background: linear-gradient(180deg, rgba(104,7,113,1) 0%, rgba(53,14,62,1) 35%, rgba(23,13,25,1) 66%, rgba(0,0,0,1) 100%);" class="w-full h-[45vh] border border-white ">
       
    </div> -->  
    <!-- <div v-if="arrOfColor" class="flex mt-2 gap-2">
      <div :style="{ background: `rgb(${arrOfColor})` }" class="w-5 h-5 border border-white"></div>
    </div> 
    <div v-if="topArtistColor" class="flex mt-2 gap-2">
      <div :style="{ background: `rgb(${topArtistColor})` }" class="w-5 h-5 border border-white"></div>
    </div>   -->
    
    
    <div v-if="spotifyProfile" class="flex items-center md:order-2 ml-[45px] mt-6  border-white relative right-0 ">
      <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span class="sr-only">Open user menu</span>
          
          <div class="w-8 h-8 overflow-hidden  rounded-full ">
            <img v-if="spotifyProfile.spotify?.images?.length"  class="w-full" :src="spotifyProfile?.spotify?.images[0]?.url" alt="user photo">
            
            <img v-else  class="w-full" src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg" alt="user photo"> 
          </div>
          
          
          <!-- <img v-if="spotifyProfile.spotify?.images?.length"  :src="spotifyProfile?.spotify?.images[0]?.url" width="100" height="100" alt="">
          <img v-else  src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg" width="100" height="100" alt=""> -->
        </button>
        <!-- Dropdown menu -->
        <div class="z-50 w-40  border-white hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white"> {{ spotifyProfile?.spotify?.display_name }} </span>
            <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"> {{ spotifyProfile?.spotify?.country }} </span>
          </div>
          <!-- <ul class="py-2" aria-labelledby="user-menu-button"> 
            <li>
              <a href="#" @click="signOut()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </li>
          </ul> -->
        </div> 
    </div> 
    
    
     


      
      

      <!-- <div class="gradient-border">css<br />is<br />awesome</div>       -->
      
      
      
      <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3fVyiIB5BT5KjSqoRTeqce?utm_source=generator" width="600px" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> -->

        <!-- TOP SONG --> 
        <!-- bg-white dark:bg-gray-900  max-w-screen-xl  -->
        
        <section v-if="spotifyTopTracks.items?.length" style="background-image: url();background-size: cover;background: linear-gradient(40deg, rgba(178,173,187,1) 0%, rgba(202,196,210,1) 39%, rgba(215,208,226,1) 100%);" class="grid mt-8 h-[80vh]  border-green-400  overflow-hidden  ">

          <!-- h-[100%] w-[100%] -->
          <div style="z-index:0" class=" h-[100%] w-[100%] overflow-hidden row-start-1 col-start-1 ">
                  <!-- <img :src="spotifyTopTracks.items[0].album.images[0].url"
                    class="h-[100%] w-[100%] blur-sm scale-125 brightness-[0.2]  "> -->
                     
          </div>

          <!-- album rotate container -->
          <div style="z-index:"
            class=" h-[100%] w-[100%] overflow-hidden lg:mt-0 grid items-end justify-end  row-start-1 col-start-1">
            <!--                                                             -->
            <div style="transform: rotate(30deg) translate(270px, -60px); box-shadow: -15px 130px 45px -6px rgba(0,0,0,0.31); transform-origin: 0 0; "
              class=" h-[700px] w-[700px] grid grid-flow-col  border-white overflow-hidden ">

              <!-- stack gimmick -->
              <span style="box-shadow: -8px 40px 15px -6px rgba(0,0,0,0.31); transform-origin: 0 0;" class="block z-[2] row-start-1  border-white h-full mt-10 ml-5 col-start-1 w-10 bg-[rgb(173,167,181)]"></span>
              <span style="" class="block row-start-1 -z-1 h-full mt-20 col-start-1 w-5 bg-[rgb(173,167,181)]"></span>
              <!-- album -->
              <img :src="spotifyTopTracks.items[0].album.images[0].url"
              style="box-shadow: -5px 40px 20px -6px rgba(0,0,0,0.81)"  class="z-[3] row-start-1 col-start-1 ml-10 h-[100%] w-[100%] ">

            </div>

          </div>


          <!-- lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12   -->
          <section style="filter:brightness(1);z-index:"
            class="grid pl-5 lg:pl-10 py-1 w-[55%] h-full row-start-1 col-start-1   border-red-600 justify-start  items-end md:items-center ">


            
            <section class="  lg:col-span-7  border-white ">
              
              <p class=" absolute top-10 text-sm font-semibold text-gray-900 dark:text-white flex items-center"> <img src="../assets/images/pngegg_pure_white.png" class="w-10 h-10 mr-2 " /></p>
              
              <p class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">TOP SONG</p>
              
              <p
                class=" font-sans  mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-[7rem] dark:text-white">
                {{ spotifyTopTracks.items[0].name }}</p>
                
              <div class="flex items-center  border-white ">  
                
                <!-- <div class=" w-[max-content]  flex justify-center items-center" @click="togglePlay(spotifyTopTracks.items[0])">
                  <ion-icon class="w-20 h-20 text-green-400 " v-if="!isPlaying" name="play-circle-sharp"></ion-icon>
                  <ion-icon class="w-20 h-20 text-green-400 " v-if="isPlaying" name="pause-circle-sharp"></ion-icon>
                </div> -->
                
                <!-- <img class="w-6 h-6 rounded-full" :src="spotifyTopTracks.items[0].artists[0].images[0].url" alt="Rounded avatar"> -->
                
                <p class=" font-sans text-sm max-w-2xl ml-1 font-semibold text-gray-500   dark:text-white">By
                {{ spotifyTopTracks.items[0].artists.map(each => each.name ).join(", ") }}  </p> 
                 
                <!-- <p class=" font-sans max-w-2xl ml-1 font-semibold text-gray-500   md:text-base lg:text-base  dark:text-white"> 
                * {{ new Date(spotifyTopTracks.items[0].album.release_date).getFullYear() }} * {{ spotifyTopTracks.items[0].album.name }} </p>  -->
                 
                
              </div>
               

              <!-- <p class="max-w-2xl mb-4 font-light text-gray-500   md:text-lg lg:text-xl dark:text-white">{{
                    msToTimeFormat(spotifyTopTracks.items[0].duration_ms) }}</p> -->
 
            </section>
          </section>


        </section>
        <section v-else style="background-image: url();background-size: cover;background:gray" class="grid mt-10 h-[80vh] skeleton-box  border-green-400  overflow-hidden  ">
 
        </section>
        <!-- END TOP SONG -->





        
        
        
        
        
        <!-- TOP 10 SONGS  -->  
      <section  v-if="spotifyTopTracks?.items?.length" style="background: #2f2e60"  class=" mt-10 h-auto   w-full box-border overflow-hidden  shadow-xl  border-yellow-300 ||  grid"> 
        
        <section class="h-auto p-10 min-h-[30rem] w-full box-border overflow-hidden  shadow-xl  border-red-200 || grid lg:grid-flow-col lg:grid-cols-[max-content_1fr]  ">
        
          <div class="grid items-center self-end" >
            <div style="box-shadow: -1px -1px 30px -9px rgba(0,0,0,1) "  class="w-[20rem] h-[20rem] border-l-blue-200 grid grid-flow-col grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] ">
              
              
              <img :src="spotifyTopTracks.items[0].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[1].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[2].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              <img :src="spotifyTopTracks.items[3].album.images[1].url" class="w-[100%] h-[100%]" alt="">   
              
            </div>
          </div>
          
          
          
          <div class="  border-l-fuchsia-600 flex flex-col justify-end lg:px-4 ">
             
             <p class="text-base  font-bold text-gray-900 dark:text-white">THIS IS YOUR</p>
               
             <p class="text-4xl  lg:text-8xl  mb-4 font-sans font-bold text-gray-900 dark:text-white"> MOST LISTENED  </p>
              
             <p style="color: rgba(255, 255, 255, 0.666)" class="text-sm mb-2 font-sans font-semibold ">Featured {{ getTopThree(spotifyTopTracks.items) }}, and more</p>
   
             <p class="text-sm font-semibold text-gray-900 dark:text-white flex items-center "> <img class="w-6 h-6 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" /> Spotify <ion-icon class="w-1 h-1 mx-1 " name="ellipse"></ion-icon>  {{ spotifyTopTracks.items.length }} Songs      <p style="background: rgba(255, 255, 255, 0.666);color:black;" class="text-[0.6rem]  border-white px-1 py-[1px] font-semibold ml-2 font-sans rounded-sm " >PREVIEW</p>
             </p>
             
           </div>
          
          
          
          
        </section>
        
        
        
         
        <div style="background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(14,13,13,1) 33%, rgba(31,30,30,0.9) 70%, rgba(35,34,34,0.7) 85%, rgba(41,41,41,0.3) 100%)" class="relative overflow-x-auto px-4  ">
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
                <tbody> 
                      <tr  v-for="each, index in spotifyTopTracks.items"  @dblclick="playMusic(each)" :class="` ${isPreviewAvailable(each)} teer dark:border-none cursor-pointer dark:focus:bg-gray-800 font-sans border border-white rounded-xl dark:hover:bg-[rgba(222,222,222,0.1)] dark:hover:text-white`  ">
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
                        <td class="px-6 py-2 text-sm font-semibold font-sans">
                          {{ each.album.name }}
                        </td>
                        <td style="border-top-right-radius:10px; border-bottom-right-radius:10px ;"  class="px-6 py-2 text-sm font-semibold  border-white ">
                            {{ msToTimeFormat(each.duration_ms) }}
                        </td> 
                      </tr>
                      
                      
                </tbody>
            </table>
        </div>
 
        
        
         
      </section>
      <div v-else>
            <p class=" ">No data is currently available</p>
      </div>
        
        
        
        
        
        
        
        
        
        
        
        



        <!-- TOP ARTIST --> 
        <div v-if="topArtists.items?.length" :style="{ background: `radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(${topArtistColor},1) 52%, rgba(33,13,57,0.2) 69%)`}" class=" h-auto min-h-[100vh] mt-10 w-full box-border overflow-hidden  shadow-xl border-[purple]  grid">

          <!-- <div style="z-index:0"   
            class=" h-[100%] w-[100%] overflow-hidden border-3 border-purple-500 row-start-1 col-start-1">
            <img :src="topArtists.items[0].images[0].url" class=" h-[100px]  w-[100px]  ">
          </div> -->
          
          
          <!-- <div  class=" h-[100px] w-[100%] rounded-t-[100%] bg-red-500 row-start-1 col-start-1 self-end "> 
            <p class="text-white">GGGGG</p>
          </div> -->
          
           
          <!-- rounded-[50px] grid-flow-col grid-cols-[max-content_1fr]  -->
          <div style="filter:brightness(1);"
            class="  p-5 m-12 text-[100%] grid  items-center   border-white row-start-1 col-start-1    ">
            <!--  -->
            <!-- <img :src="topArtists.items[0].images[1].url" class="  rounded-[250px]  h-[100%] border border-black "> -->
            

            <!--  pl-16 -->
            <div class=" text-gray-800 w-full  grid items-center   border-black ">

              
              
              <!-- text-[6rem] {{ topArtists.items[0].name }} -->
              <p class=" self-end text-white text-center  text-md font-bold ">YOUR TOP ARTIST</p>

              <p class="top_arist max-w-[100%] text-[500%] text-center font-bold font-sans  bg-clip-text text-transparent bg-center bg-no-repeat bg-cover  border-black "
              :style="'background-image: url(' + topArtists.items[0].images[1].url + ')'" >
                {{ topArtists.items[0].name }}
              </p>  

              <!-- <div class="self-start"> -->
                <p :style="'background-image: url(' + topArtists.items[0].images[1].url + ')'" class="font-bold top_arist  border-black text-center  "> {{ topArtists.items[0].genres.map(str => str.toLocaleUpperCase('title')).join(" - ")
                }}</p>
                
                <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" class="h-5 mx-auto  w-5  border border-black ">
                 -->
                
              </div>
              
            <!-- </div> -->

          </div>

        </div>
        <div v-else>
          <p class="">No data is currently available</p>
        </div>
        <!-- END TOP ARTIST -->

        <!-- <div class="w-[300px] text-[100%] h-auto min-h-[30rem] border-4 border-black">
            <p class="max-w-full border text-[500%] border-white ">Eden Ben Zaken</p>
        </div> -->


        
        
        
        
        
        
        <!-- TRACKS BY TOP ARTIST -->
        <!-- v-for="each in topTracksByArtist.tracks" -->
      <!-- <p class="mt-5 mb-5 text-2xl font-bold text-gray-900 dark:text-white">Based from top one artist</p>  -->
      <section v-if="topArtists.items?.length && topTracksByArtist.tracks?.length" :style="{ background: `rgb(${topArtistColor})` }"   class=" h-auto mt-10  w-full box-border overflow-hidden  shadow-xl   border-yellow-300 ||  grid"> 
        
        <section class="h-auto p-10 min-h-[30rem] w-full box-border overflow-hidden  shadow-xl   border-red-200 || grid lg:grid-flow-col lg:grid-cols-[max-content_1fr]  ">
        
          <div class="  border-l-blue-200 grid justify-center items-end ">
            <img style="box-shadow: -1px -1px 30px -9px rgba(0,0,0,1) " :src="topArtists.items[0].images[1].url" class="w-[20rem] h-[20rem]" alt="">   
          </div>
          
          <div class="  border-l-fuchsia-600 flex flex-col justify-end px-4 ">
             
            <p class="text-base  font-bold text-gray-900 dark:text-white">THIS IS</p>
              
            <p class="text-4xl  lg:text-8xl mb-4 font-sans font-bold text-gray-900 dark:text-white"> {{ topArtists.items[0].name }}   </p>
             
            <p style="color: rgba(255, 255, 255, 0.666)" class="text-sm mb-2 font-sans font-semibold ">The most popular songs by {{ topArtists.items[0].name }}, the artist you listen to the most.</p>
  
            <p class="text-sm font-semibold text-gray-900 dark:text-white flex items-center "> <img class="w-6 h-6 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" /> Spotify <ion-icon class="w-1 h-1 mx-1 " name="ellipse"></ion-icon>  {{ topTracksByArtist.tracks.length }} Songs      <p style="background: rgba(255, 255, 255, 0.666);color:black;" class="text-[0.6rem]  border-white px-1 py-[1px] font-semibold ml-2 font-sans rounded-sm " >PREVIEW</p>
            </p>
            
          </div>
          
          
        </section>
        
        
        
        
        <!-- SONGS BY TOP 1 ARTIST -->
        <div v-if="topTracksByArtist?.tracks?.length" style="background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(14,13,13,1) 33%, rgba(31,30,30,0.9) 70%, rgba(35,34,34,0.7) 85%, rgba(41,41,41,0.3) 100%)" class="relative overflow-x-auto px-4 ">
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
                <tbody>
                    <tr  v-for="each, index in topTracksByArtist.tracks"  @dblclick="playMusic(each)" :class="` ${isPreviewAvailable(each)} teer dark:border-none cursor-pointer dark:focus:bg-gray-800 font-sans border border-white rounded-xl dark:hover:bg-[rgba(222,222,222,0.1)] dark:hover:text-white`  ">
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
                        <td class="px-6 py-2 text-sm font-semibold font-sans">
                          {{ each.album.name }}
                        </td>
                        <td style="border-top-right-radius:10px; border-bottom-right-radius:10px ;"  class="px-6 py-2 text-sm font-semibold  border-white ">
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
            <p class="">No data is currently available</p>
        </div>
        
         
        <!-- <img :src="each.album.images[0].url"  width="50" height="50" alt="">  
        <p class="text-white" > {{ each.name }} ({{ each.id }}) - {{ each.album.release_date }}  -  On {{ each.album.name }}  -  Popularity: {{ each.popularity }} </p>
        <p v-for="tiap in each.artists"  class="text-white" > {{ tiap.name }} </p>   -->
      </section>
       
    
      
      
      
      
      
      
      
      
 
      
      
      
            
        <!-- TOP ARTIST --> 
       <!-- <p class="mt-5 mb-5 text-4xl font-bold text-gray-900 dark:text-white"> Top Artist</p> -->
       
       <section v-if="topArtists.items?.length" :style="{ boxShadow: `-1px 26px 98px -59px rgba(${topArtistColor},0.43)`}"
         class=" mt-10  h-[15rem] w-full box-border overflow-hidden shadow-xl  pl-4 border-yellow-300  grid items-center">
         
         <p class="  border-white text-xl font-semibold text-gray-900 dark:text-white">Your Top Artist</p> 
         
       <swiper  :slides-per-view="'auto'" class=" w-full  border-blue-400  ">
         
       <swiper-slide v-for="each, index in topArtists.items" :key="index"  class="  w-36   border-red-400 mr-4 mt-0 | grid items-baseline  ">
         
           <div class="  border-white text-center  ">
             <img class="w-36 h-36 rounded-full" :src="each.images[0].url" alt="Large avatar">
             <p class="text-xs mt-2 font-semibold text-gray-900 dark:text-white">{{ each.name }}</p>
           </div>  
           
       </swiper-slide>
         
       </swiper>   
       </section>
       <section v-else>
         <p>No data is currently available</p>
       </section>
       <!-- END TOP ARTISTS -->
       
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        <!-- TOP COUNTRY BASED --> 
        <p class="mt-[50vh] text-xl ml-8 font-semibold text-gray-900 dark:text-white">Top Local</p>
        <section v-if="topLocal.tracks?.items?.length"
          class=" w-full box-border overflow-hidden p-4 shadow-xl  border-yellow-300  grid items-center grid-flow-cols grid-cols-1 md:grid-cols-2 lg:grid-cols-3   ">
          
          
        <button v-for="each, index in topLocal.tracks.items" @dblclick="playMusic(each.track)" :class="` ${isPreviewAvailable(each.track)} teer  font-sans  border-[rgba(222,222,222,0.1)] rounded-xl border-t  dark:hover:bg-[rgba(222,222,222,0.1)] dark:hover:text-white dark:text-unfocus-500 mx-2 dark:focus:bg-[rgba(222,222,222,0.3)] cursor-pointer  `">
        <!-- <button> -->
          
          <section class="px-3 py-2 flex   border-white ">
            <img :src="each.track.album.images[1].url" class="rounded-sm" width="40" height="40" alt="">
            
            <div class="ml-2 p-0  flex flex-col text-start  border-white justify-center truncate " >
              <p class="font-semibold font-sans text-xs flex dark:text-white  border-red-300 " >{{ each.track.name }}</p>
              <!-- * {{ each.track.album.name }} * {{new Date(spotifyTopTracks.items[0].album.release_date).getFullYear() -->
              <p class="font-normal font-sans text-xs border-red-300" >{{ each.track.artists[0].name }}</p>
            </div>
          </section>
          <!-- <td class="px-6 py-2 font-semibold">
              {{ each.album.name }}
            </td>
            <td class="px-6 py-2 font-semibold">
                {{ msToTimeFormat(each.duration_ms) }}
            </td>  -->
          </button>
        
         
        </section>
        <section v-else>
          <p class=" ">No data is currently available</p>
        </section>
        <!-- END COUNTRY BASED -->
      
      
      
        
        
        
       <!-- TOP GLOBAL --> 
       <p class="mt-[5vh] text-xl ml-8 font-semibold text-gray-900 dark:text-white">Top Global</p>
         
        <section v-if="topGlobal.tracks?.items?.length"
          class=" w-full box-border overflow-hidden p-4 shadow-xl  border-yellow-300  grid items-center grid-flow-cols  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          
          
        <button v-for="each, index in topGlobal.tracks.items" @dblclick="playMusic(each.track)" :class="` ${isPreviewAvailable(each.track)} teer  font-sans  border-[rgba(222,222,222,0.1)] rounded-xl border-t  dark:hover:bg-[rgba(222,222,222,0.1)] dark:hover:text-white dark:text-unfocus-500 mx-2 dark:focus:bg-[rgba(222,222,222,0.3)] cursor-pointer  `">
        <!-- <button> -->
          
          <section class="px-3 py-2 flex   border-white ">
            <img :src="each.track.album.images[1].url" class="rounded-sm" width="40" height="40" alt="">
            
            <div class="ml-2 p-0  flex flex-col text-start  border-white justify-center truncate " >
              <p class="font-semibold font-sans text-xs flex dark:text-white  border-red-300 " >{{ each.track.name }}</p>
              <!-- * {{ each.track.album.name }} * {{new Date(spotifyTopTracks.items[0].album.release_date).getFullYear() -->
              <p class="font-normal font-sans text-xs border-red-300" >{{ each.track.artists[0].name }}</p>
            </div>
          </section>
          <!-- <td class="px-6 py-2 font-semibold">
              {{ each.album.name }}
            </td>
            <td class="px-6 py-2 font-semibold">
                {{ msToTimeFormat(each.duration_ms) }}
            </td>  -->
          </button>
        
         
        </section>
        <section v-else>
          <p>No data is currently available</p>
        </section>
        
        
        <section v-else>
          <p>No data is currently available</p>
        </section>
        <!-- END TOP GLOBAL -->
        
        
     
    
        
        
        
         


      <!-- <p class="text-white">my code: {{ token }}</p> -->

    
    <footer class=" bg-white h-28 rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="w-full mx-auto  md:p-6 p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Craftly made by <a href="https://macnesa.com/" class="hover:underline font-semibold">macnesa</a>. This app used Spotify official api to access your data.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://developer.spotify.com/documentation/web-api/" class="mr-4 hover:underline md:mr-6 ">Spotify API</a>
            </li>
            <li>
                <a href="https://developer.spotify.com/policy/" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="https://github.com/macnesa" class="mr-4 hover:underline md:mr-6">Visit My Github</a>
            </li>
            <li>
                <a href="https://www.instagram.com/macnesa_/" class="hover:underline">My Ig</a>
            </li>
        </ul>
        </div>
    </footer>

 

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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
@-webkit-keyframes slidein {
from {background-position: bottom; background-size:7000px; }
to {background-position: -100px 0px;background-size:6750px;}
}

@keyframes slidein {
from {background-position: bottom;background-size:7000px; }
to {background-position: -100px 0px;background-size:6750px;}

}  
 .top_arist{
 background-image: url('https://i.scdn.co/image/ab67616d00001e02cd0806a7ba54ce376fa438ac');
  background-size:cover;     
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    
    -webkit-animation: slidein 100s;
        animation: slidein 100s ; 

        -webkit-animation-fill-mode: linear;
        animation-fill-mode: linear;

        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;

        -webkit-animation-direction: linear;
        animation-direction: linear;  
}
  
  















.container {
	background:#040404;
	min-height: 100vh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
}

.blob-c {
	min-height: 100vh;
	overflow: hidden;
	position:absolute;
	width: 100%;
	filter: blur(40px);
/*   background: rgba(255,255,255,0.1) */
}

.shape-blob {
	background:#26C3F9;
	height: 60px;
	width: 80px;
	border-radius: 40% 50% 30% 40%;
  	animation: 
		transform 18s ease-in-out infinite both alternate,
		movement_one 12s ease-in-out infinite both;
	opacity:.7;
	position: absolute;
	left: 75%;
	top: 40%;
}
.shape-blob.one{
	background:#0085FF;
	height: 150px;
	width: 200px;
	left: 10px;
	top: 10px;
	transform: rotate(-180deg);
	animation: transform 8s ease-in-out infinite both alternate, movement_two 20s ease-in-out infinite both;
}

.shape-blob.six{
	background:#0EAFFF;
	height: 70px;
	width: 100px;
	left: 160px;
	top: 200px;
	transform: rotate(-180deg);
	animation: transform 5s ease-in-out infinite both alternate, movement_two 5s ease-in-out infinite both;
}

.shape-blob.four{
	background:#4EAEFF;
	height: 100px;
	width: 80px;
	left: 350px;
	top: 60px;
	transform: rotate(-180deg);
	animation: transform 17s ease-in-out infinite both alternate, movement_two 13s ease-in-out infinite both;
}

.shape-blob.five{
	background:#0085FF;
	height: 100px;
	width: 80px;
	left: 480px;
	top: 30px;
	transform: rotate(-180deg);
	animation: transform 12s ease-in-out infinite both alternate, movement_two 18s ease-in-out infinite both;
}

.shape-blob.two{
	background:#4EAEFF;
	height: 150px;
	width: 150px;
	left: 600px;
	top: 150px;
	transform: rotate(-180deg);
	animation: transform 10s ease-in-out infinite both alternate, movement_two 10s ease-in-out infinite both;
}

.shape-blob.three{
	background:#0EAFFF;
	height: 150px;
	width: 150px;
	left: 800px;
	top: 30px;
	transform: rotate(-180deg);
	animation: transform 7s ease-in-out infinite both alternate, movement_two 23s ease-in-out infinite both;
}

@keyframes transform
{
    0%,
  100% { border-radius: 33% 67% 70% 30% / 30% 40% 70% 70%; } 
   20% { border-radius: 37% 63% 51% 49% / 37% 35% 35% 63%; } 
   40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 26%; } 
   60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 73%; } 
   80% { border-radius: 40% 60% 42% 58% / 51% 51% 49% 59%; } 
}


@keyframes movement_one
{
    0%,
  100% { transform: none; }
   50% { transform: translate(50%, 20%) rotateY(10deg) scale(1); }
}

@keyframes movement_two
{
    0%,
  500% { transform: none; }
   50% { transform: translate(50%, 20%) rotate(-200deg) scale(1.3);}
}

h1 {
	font-family: 'Playfair Display', serif;
	font-size: 5em;
	letter-spacing: 2px;
	font-weight: 900;
	color: white;
	line-height: .9em;
	position: absolute;
	z-index: 4;
	text-shadow: 2px 3px 15px rgba(0,0,0,.15);
}











.skeleton-box {
	 display: inline-block;
	 height: 1em;
	 position: relative;
	 overflow: hidden;
	 background-color: #dddbdd;
}
 .skeleton-box::after {
	 position: absolute;
	 top: 0;
	 right: 0;
	 bottom: 0;
	 left: 0;
	 transform: translateX(-100%);
	 background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
	 animation: shimmer 2s infinite;
	 content: '';
}
 @keyframes shimmer {
	 100% {
		 transform: translateX(100%);
	}
}




  
</style>



 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

{
  "album": {
      "album_type": "SINGLE",
      "artists": [
          {
              "external_urls": {
                  "spotify": "https://open.spotify.com/artist/3JPKPnzWJGjccn8SnjwA5i"
              },
              "href": "https://api.spotify.com/v1/artists/3JPKPnzWJGjccn8SnjwA5i",
              "id": "3JPKPnzWJGjccn8SnjwA5i",
              "name": "Agam Buhbut",
              "type": "artist",
              "uri": "spotify:artist:3JPKPnzWJGjccn8SnjwA5i"
          },
          {
              "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4rSGpKNO4s1iBN4yPMaVj9"
              },
              "href": "https://api.spotify.com/v1/artists/4rSGpKNO4s1iBN4yPMaVj9",
              "id": "4rSGpKNO4s1iBN4yPMaVj9",
              "name": "הלהקות הצבאיות",
              "type": "artist",
              "uri": "spotify:artist:4rSGpKNO4s1iBN4yPMaVj9"
          }
      ],
      "available_markets": [
          "AD",
          "AE",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BH",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IS",
          "IT",
          "JO",
          "JP",
          "KW",
          "LB",
          "LI",
          "LT",
          "LU",
          "LV",
          "MA",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PH",
          "PL",
          "PS",
          "PT",
          "PY",
          "QA",
          "RO",
          "SA",
          "SE",
          "SG",
          "SK",
          "SV",
          "TH",
          "TN",
          "TR",
          "TW",
          "US",
          "UY",
          "VN",
          "ZA"
      ],
      "external_urls": {
          "spotify": "https://open.spotify.com/album/7BMY5SxiMOelOqPEbINxHR"
      },
      "href": "https://api.spotify.com/v1/albums/7BMY5SxiMOelOqPEbINxHR",
      "id": "7BMY5SxiMOelOqPEbINxHR",
      "images": [
          {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2734b19a192287a471f55259333",
              "width": 640
          },
          {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e024b19a192287a471f55259333",
              "width": 300
          },
          {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d000048514b19a192287a471f55259333",
              "width": 64
          }
      ],
      "name": "שומר אחי אנוכי",
      "release_date": "2022-05-18",
      "release_date_precision": "day",
      "total_tracks": 1,
      "type": "album",
      "uri": "spotify:album:7BMY5SxiMOelOqPEbINxHR"
  },
  "artists": [
      {
          "external_urls": {
              "spotify": "https://open.spotify.com/artist/3JPKPnzWJGjccn8SnjwA5i"
          },
          "href": "https://api.spotify.com/v1/artists/3JPKPnzWJGjccn8SnjwA5i",
          "id": "3JPKPnzWJGjccn8SnjwA5i",
          "name": "Agam Buhbut",
          "type": "artist",
          "uri": "spotify:artist:3JPKPnzWJGjccn8SnjwA5i"
      },
      {
          "external_urls": {
              "spotify": "https://open.spotify.com/artist/4rSGpKNO4s1iBN4yPMaVj9"
          },
          "href": "https://api.spotify.com/v1/artists/4rSGpKNO4s1iBN4yPMaVj9",
          "id": "4rSGpKNO4s1iBN4yPMaVj9",
          "name": "הלהקות הצבאיות",
          "type": "artist",
          "uri": "spotify:artist:4rSGpKNO4s1iBN4yPMaVj9"
      }
  ],
  "available_markets": [
      "AD",
      "AE",
      "AR",
      "AT",
      "AU",
      "BE",
      "BG",
      "BH",
      "BO",
      "BR",
      "CA",
      "CH",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DE",
      "DK",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "ES",
      "FI",
      "FR",
      "GB",
      "GR",
      "GT",
      "HK",
      "HN",
      "HU",
      "ID",
      "IE",
      "IL",
      "IN",
      "IS",
      "IT",
      "JO",
      "JP",
      "KW",
      "LB",
      "LI",
      "LT",
      "LU",
      "LV",
      "MA",
      "MC",
      "MT",
      "MX",
      "MY",
      "NI",
      "NL",
      "NO",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PH",
      "PL",
      "PS",
      "PT",
      "PY",
      "QA",
      "RO",
      "SA",
      "SE",
      "SG",
      "SK",
      "SV",
      "TH",
      "TN",
      "TR",
      "TW",
      "US",
      "UY",
      "VN",
      "ZA"
  ],
  "disc_number": 1,
  "duration_ms": 225112,
  "explicit": false,
  "external_ids": {
      "isrc": "UKR6V2290873"
  },
  "external_urls": {
      "spotify": "https://open.spotify.com/track/3fVyiIB5BT5KjSqoRTeqce"
  },
  "href": "https://api.spotify.com/v1/tracks/3fVyiIB5BT5KjSqoRTeqce",
  "id": "3fVyiIB5BT5KjSqoRTeqce",
  "is_local": false,
  "name": "שומר אחי אנוכי",
  "popularity": 15,
  "preview_url": "https://p.scdn.co/mp3-preview/062567ef4150f1d6d7bfb47dd861483dcd008ac1?cid=79fab6b902af4bd6b4c192b808b8a074",
  "track_number": 1,
  "type": "track",
  "uri": "spotify:track:3fVyiIB5BT5KjSqoRTeqce"
},














































{
  "added_at": "2023-03-19T10:22:35Z",
  "added_by": {
      "external_urls": {
          "spotify": "https://open.spotify.com/user/"
      },
      "href": "https://api.spotify.com/v1/users/",
      "id": "",
      "type": "user",
      "uri": "spotify:user:"
  },
  "is_local": false,
  "primary_color": null,
  "track": {
      "album": {
          "album_group": "album",
          "album_type": "album",
          "artists": [
              {
                  "external_urls": {
                      "spotify": "https://open.spotify.com/artist/5YGY8feqx7naU7z4HrwZM6"
                  },
                  "href": "https://api.spotify.com/v1/artists/5YGY8feqx7naU7z4HrwZM6",
                  "id": "5YGY8feqx7naU7z4HrwZM6",
                  "name": "Miley Cyrus",
                  "type": "artist",
                  "uri": "spotify:artist:5YGY8feqx7naU7z4HrwZM6"
              }
          ],
          "available_markets": [
              "AD",
              "AE",
              "AG",
              "AL",
              "AM",
              "AO",
              "AR",
              "AT",
              "AU",
              "AZ",
              "BA",
              "BB",
              "BD",
              "BE",
              "BF",
              "BG",
              "BH",
              "BI",
              "BJ",
              "BN",
              "BO",
              "BR",
              "BS",
              "BT",
              "BW",
              "BY",
              "BZ",
              "CA",
              "CD",
              "CG",
              "CH",
              "CI",
              "CL",
              "CM",
              "CO",
              "CR",
              "CV",
              "CW",
              "CY",
              "CZ",
              "DE",
              "DJ",
              "DK",
              "DM",
              "DO",
              "DZ",
              "EC",
              "EE",
              "EG",
              "ES",
              "ET",
              "FI",
              "FJ",
              "FM",
              "FR",
              "GA",
              "GB",
              "GD",
              "GE",
              "GH",
              "GM",
              "GN",
              "GQ",
              "GR",
              "GT",
              "GW",
              "GY",
              "HK",
              "HN",
              "HR",
              "HT",
              "HU",
              "ID",
              "IE",
              "IL",
              "IN",
              "IQ",
              "IS",
              "IT",
              "JM",
              "JO",
              "JP",
              "KE",
              "KG",
              "KH",
              "KI",
              "KM",
              "KN",
              "KR",
              "KW",
              "KZ",
              "LA",
              "LB",
              "LC",
              "LI",
              "LK",
              "LR",
              "LS",
              "LT",
              "LU",
              "LV",
              "LY",
              "MA",
              "MC",
              "MD",
              "ME",
              "MG",
              "MH",
              "MK",
              "ML",
              "MN",
              "MO",
              "MR",
              "MT",
              "MU",
              "MV",
              "MW",
              "MX",
              "MY",
              "MZ",
              "NA",
              "NE",
              "NG",
              "NI",
              "NL",
              "NO",
              "NP",
              "NR",
              "NZ",
              "OM",
              "PA",
              "PE",
              "PG",
              "PH",
              "PK",
              "PL",
              "PS",
              "PT",
              "PW",
              "PY",
              "QA",
              "RO",
              "RS",
              "RW",
              "SA",
              "SB",
              "SC",
              "SE",
              "SG",
              "SI",
              "SK",
              "SL",
              "SM",
              "SN",
              "SR",
              "ST",
              "SV",
              "SZ",
              "TD",
              "TG",
              "TH",
              "TJ",
              "TL",
              "TN",
              "TO",
              "TR",
              "TT",
              "TV",
              "TW",
              "TZ",
              "UA",
              "UG",
              "US",
              "UY",
              "UZ",
              "VC",
              "VE",
              "VN",
              "VU",
              "WS",
              "XK",
              "ZA",
              "ZM",
              "ZW"
          ],
          "external_urls": {
              "spotify": "https://open.spotify.com/album/0HiZ8fNXwJOQcrf5iflrdz"
          },
          "href": "https://api.spotify.com/v1/albums/0HiZ8fNXwJOQcrf5iflrdz",
          "id": "0HiZ8fNXwJOQcrf5iflrdz",
          "images": [
              {
                  "height": 640,
                  "url": "https://i.scdn.co/image/ab67616d0000b27358039b5147731b6e52202e46",
                  "width": 640
              },
              {
                  "height": 300,
                  "url": "https://i.scdn.co/image/ab67616d00001e0258039b5147731b6e52202e46",
                  "width": 300
              },
              {
                  "height": 64,
                  "url": "https://i.scdn.co/image/ab67616d0000485158039b5147731b6e52202e46",
                  "width": 64
              }
          ],
          "is_playable": true,
          "name": "Endless Summer Vacation",
          "release_date": "2023-03-10",
          "release_date_precision": "day",
          "total_tracks": 13,
          "type": "album",
          "uri": "spotify:album:0HiZ8fNXwJOQcrf5iflrdz"
      },
      "artists": [
          {
              "external_urls": {
                  "spotify": "https://open.spotify.com/artist/5YGY8feqx7naU7z4HrwZM6"
              },
              "href": "https://api.spotify.com/v1/artists/5YGY8feqx7naU7z4HrwZM6",
              "id": "5YGY8feqx7naU7z4HrwZM6",
              "name": "Miley Cyrus",
              "type": "artist",
              "uri": "spotify:artist:5YGY8feqx7naU7z4HrwZM6"
          }
      ],
      "available_markets": [
          "AR",
          "AU",
          "AT",
          "BE",
          "BO",
          "BR",
          "BG",
          "CA",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DK",
          "DO",
          "DE",
          "EC",
          "EE",
          "SV",
          "FI",
          "FR",
          "GR",
          "GT",
          "HN",
          "HK",
          "HU",
          "IS",
          "IE",
          "IT",
          "LV",
          "LT",
          "LU",
          "MY",
          "MT",
          "MX",
          "NL",
          "NZ",
          "NI",
          "NO",
          "PA",
          "PY",
          "PE",
          "PH",
          "PL",
          "PT",
          "SG",
          "SK",
          "ES",
          "SE",
          "CH",
          "TW",
          "TR",
          "UY",
          "US",
          "GB",
          "AD",
          "LI",
          "MC",
          "ID",
          "JP",
          "TH",
          "VN",
          "RO",
          "IL",
          "ZA",
          "SA",
          "AE",
          "BH",
          "QA",
          "OM",
          "KW",
          "EG",
          "MA",
          "DZ",
          "TN",
          "LB",
          "JO",
          "PS",
          "IN",
          "BY",
          "KZ",
          "MD",
          "UA",
          "AL",
          "BA",
          "HR",
          "ME",
          "MK",
          "RS",
          "SI",
          "KR",
          "BD",
          "PK",
          "LK",
          "GH",
          "KE",
          "NG",
          "TZ",
          "UG",
          "AG",
          "AM",
          "BS",
          "BB",
          "BZ",
          "BT",
          "BW",
          "BF",
          "CV",
          "CW",
          "DM",
          "FJ",
          "GM",
          "GE",
          "GD",
          "GW",
          "GY",
          "HT",
          "JM",
          "KI",
          "LS",
          "LR",
          "MW",
          "MV",
          "ML",
          "MH",
          "FM",
          "NA",
          "NR",
          "NE",
          "PW",
          "PG",
          "WS",
          "SM",
          "ST",
          "SN",
          "SC",
          "SL",
          "SB",
          "KN",
          "LC",
          "VC",
          "SR",
          "TL",
          "TO",
          "TT",
          "TV",
          "VU",
          "AZ",
          "BN",
          "BI",
          "KH",
          "CM",
          "TD",
          "KM",
          "GQ",
          "SZ",
          "GA",
          "GN",
          "KG",
          "LA",
          "MO",
          "MR",
          "MN",
          "NP",
          "RW",
          "TG",
          "UZ",
          "ZW",
          "BJ",
          "MG",
          "MU",
          "MZ",
          "AO",
          "CI",
          "DJ",
          "ZM",
          "CD",
          "CG",
          "IQ",
          "LY",
          "TJ",
          "VE",
          "ET",
          "XK"
      ],
      "disc_number": 1,
      "duration_ms": 200600,
      "episode": false,
      "explicit": false,
      "external_ids": {
          "isrc": "USSM12209777"
      },
      "external_urls": {
          "spotify": "https://open.spotify.com/track/4DHcnVTT87F0zZhRPYmZ3B"
      },
      "href": "https://api.spotify.com/v1/tracks/4DHcnVTT87F0zZhRPYmZ3B",
      "id": "4DHcnVTT87F0zZhRPYmZ3B",
      "is_local": false,
      "name": "Flowers",
      "popularity": 82,
      "preview_url": "https://p.scdn.co/mp3-preview/5184d19d1b7fcc3e7c067e38af45a7cc80851440?cid=79fab6b902af4bd6b4c192b808b8a074",
      "track": true,
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:4DHcnVTT87F0zZhRPYmZ3B"
  },
  "video_thumbnail": {
      "url": null
  }
},