




<script>

  export default {
    // props: ['data'],
    props: {
      data: Object
    },
    
    
    data() {
      return { 
        isPlaying: false,
        audioSrc:"https://p.scdn.co/mp3-preview/d9b24f965612634533d7f0ba0d3ae64f4c9b92bf?cid=452e9e3c55cc45edba2aae2ce39a734c" 
      }
    },
    
    watch: { 
      
    data(newVal) {
      if (newVal && newVal.preview_url) {
        this.$refs.myAudio.load();
        this.$refs.myAudio.src = newVal.preview_url;
        document.getElementById("myAudio").play();
        this.isPlaying= true;
        // console.log("KONTOL AYAM");
      }
    },
    
  },
    
    mounted() {
      const audio = document.getElementById("myAudio");
      const playBtn = document.getElementById("playBtn");
      const progressBar = document.getElementById("progressBar");
      const volumeUpBtn = document.getElementById("volumeUpBtn");
      const volumeDownBtn = document.getElementById("volumeDownBtn");
      const volumeBar = document.getElementById("volumeBar");
      const volumeLevel = document.getElementById("volumeLevel");
      const currentTime = document.getElementById("currentTime");
      const totalTime = document.getElementById("totalTime");
      const timeRemaining = document.getElementById("time-remaining");
       
      if(this.data) {
        audio.src = this.data.preview_url;
        audio.play();
        this.isPlaying= true;
      }

      
      playBtn.addEventListener("click", () => {
        if (audio.paused) {
          audio.play();
          this.isPlaying = true 
        } else {
          audio.pause();
          this.isPlaying = false 
        }
      });

      // audio.addEventListener("timeupdate", () => {
      //   const progress = (audio.currentTime / audio.duration) * 100;
      //   progressBar.style.width = `${progress}%`;
      // });


      audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        
        // menampilkan waktu saat ini
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }
        currentTime.innerHTML = `${currentMinutes}:${currentSeconds}`;
        
         
        
        
      });

      audio.addEventListener("loadedmetadata", () => {
        // menampilkan total durasi
        let totalMinutes = Math.floor(audio.duration / 60);
        let totalSeconds = Math.floor(audio.duration % 60);
        if (totalSeconds < 10) {
          totalSeconds = "0" + totalSeconds;
        }
        totalTime.innerHTML = `${totalMinutes}:${totalSeconds}`;
         
        
      });

      
      
      
      progress.addEventListener("click", function(e) {
        let pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
        audio.currentTime = pos * audio.duration;
        progressBar.style.width = pos * 100 + "%";
      });
       
      
      // Fungsi untuk mengubah level volume dan tampilannya
      function setVolumeLevel(level) {
        audio.volume = level;
        volumeLevel.style.width = `${level * 100}%`;
      }
  
      // Inisialisasi level volume
      setVolumeLevel(audio.volume);

      // Menangani klik pada volume bar
      volumeBar.addEventListener("click", function(e) {
        let pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
        setVolumeLevel(pos);
      });
      
      volumeUpBtn.addEventListener("click", () => {
        if (audio.volume < 1) {
          audio.volume += 0.1;
        }
      });

      volumeDownBtn.addEventListener("click", () => {
        if (audio.volume > 0) {
          audio.volume -= 0.1;
        }
      });

    }
  }


</script>













<template>
  
  
<section v-if="data" id="audioControls" class="border border-white">
  
   <section class="border border-white">
      <img :src="data.album.images[0].url" class="w-20 h-20" />
   </section>
   <!-- https://i.scdn.co/image/ab67616d0000b273f6d6d1005e2dbe28c312fe2f -->
   
   <section class="border border-white w-[70%]">
    <p class="text-xs text-gray-900 dark:text-white font-bold">{{ data.name }}</p>
    <p class="text-xs text-gray-900 dark:text-white">{{ data.artists[0].name  }}</p>
        <div id="progress">
      <div id="progressBar"></div>
    </div>
   </section>
   
  <!-- <section class="border border-red-200"> -->
      <button id="playBtn">
        <ion-icon class="w-10 h-10 text-green-400 " v-if="!isPlaying" name="play-circle-sharp"></ion-icon>
        <ion-icon class="w-10 h-10 text-green-400 " v-if="isPlaying" name="pause-circle-sharp"></ion-icon>
      </button>

    <div id="volumeControl" class="">
      
      <div id="volumeBar" class="">
        <div id="volumeLevel"></div>
      </div>
    
    
      <button id="volumeUpBtn" class="hidden"><i class="fas fa-volume-up"></i></button>
      <button id="volumeDownBtn" class="hidden"><i class="fas fa-volume-down"></i></button>
    </div>
    
     <div id="duration" class="">
      <span id="currentTime">00:00</span> / <span id="totalTime">00:00</span>
    </div>
    
    <p id="time-remaining"></p>
    
    <!-- </section> -->

  
    <audio  ref="myAudio" id="myAudio" controls class="hidden">
      <!-- <source :src="data.preview_url" type="audio/mpeg"> -->
    </audio>
  
</section>

  
  
</template>















<style>

#audioControls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  #playBtn {
    /* background-color: #fff;
    color: #333;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 20px; */
  }

  #playBtn:hover {
    /* background-color: #333;
    color: #fff; */
  }

  #progress {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 10px;
  }

  #progressBar {
    position:relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: red;
    border-radius: 10px;
  }
  #progressBar::before{
    content: "";
      position:absolute;
      right:0;
      top:-1.9px;
      width:15px;
      height:15px;
      border-radius:25px;
      background:blue;
  }

  #volumeControl {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  #volumeBar {
    position: relative;
    width: 80px;
    height: 10px;
    background-color: #ddd;
    border-radius: 10px;
    margin-right: 10px;
  }

  #volumeLevel {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    background-color: #333;
    border-radius: 10px;
  }


  #volumeUpBtn,
  #volumeDownBtn {
    background-color: #fff;
    color: #333;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  #volumeUpBtn:hover,
  #volumeDownBtn:hover {
    background-color: #333;
    color: #fff;
  }






</style>