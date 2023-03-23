
<script>

import MusicPlayerVue from '../components/MusicPlayer.vue';


export default {
   components: {
      MusicPlayerVue
   },
   data() {
      return {
         musicPlayerData: null
         
      }
   }, 
   created() {
      this.musicPlayerData = {
        album: {
          album_type: "SINGLE",
          artists: [
            {
              external_urls: {
                spotify: "https://open.spotify.com/artist/3JPKPnzWJGjccn8SnjwA5i"
              },
              href: "https://api.spotify.com/v1/artists/3JPKPnzWJGjccn8SnjwA5i",
              id: "3JPKPnzWJGjccn8SnjwA5i",
              name: "Agam Buhbut",
              type: "artist",
              uri: "spotify:artist:3JPKPnzWJGjccn8SnjwA5i"
            },
            {
              external_urls: {
                spotify: "https://open.spotify.com/artist/4rSGpKNO4s1iBN4yPMaVj9"
              },
              href: "https://api.spotify.com/v1/artists/4rSGpKNO4s1iBN4yPMaVj9",
              id: "4rSGpKNO4s1iBN4yPMaVj9",
              name: "הלהקות הצבאיות",
              type: "artist",
              uri: "spotify:artist:4rSGpKNO4s1iBN4yPMaVj9"
            }
          ],
          available_markets: [
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
          external_urls: {
            spotify: "https://open.spotify.com/album/7BMY5SxiMOelOqPEbINxHR"
          },
          href: "https://api.spotify.com/v1/albums/7BMY5SxiMOelOqPEbINxHR",
          id: "7BMY5SxiMOelOqPEbINxHR",
          images: [
            {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b2734b19a192287a471f55259333",
              width: 640
            },
            {
              height: 300,
              url: "https://i.scdn.co/image/ab67616d00001e024b19a192287a471f55259333",
              width: 300
            },
            {
              height: 64,
              url: "https://i.scdn.co/image/ab67616d000048514b19a192287a471f55259333",
              width: 64
            }
          ],
          name: "שומר אחי אנוכי",
          release_date: "2022-05-18",
          release_date_precision: "day",
          total_tracks: 1,
          type: "album",
          uri: "spotify:album:7BMY5SxiMOelOqPEbINxHR"
        },
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/3JPKPnzWJGjccn8SnjwA5i"
            },
            href: "https://api.spotify.com/v1/artists/3JPKPnzWJGjccn8SnjwA5i",
            id: "3JPKPnzWJGjccn8SnjwA5i",
            name: "Agam Buhbut",
            type: "artist",
            uri: "spotify:artist:3JPKPnzWJGjccn8SnjwA5i"
          },
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/4rSGpKNO4s1iBN4yPMaVj9"
            },
            href: "https://api.spotify.com/v1/artists/4rSGpKNO4s1iBN4yPMaVj9",
            id: "4rSGpKNO4s1iBN4yPMaVj9",
            name: "הלהקות הצבאיות",
            type: "artist",
            uri: "spotify:artist:4rSGpKNO4s1iBN4yPMaVj9"
          }
        ],
        available_markets: [
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
        disc_number: 1,
        duration_ms: 225112,
        explicit: false,
        external_ids: {
          isrc: "UKR6V2290873"
        },
        external_urls: {
          spotify: "https://open.spotify.com/track/3fVyiIB5BT5KjSqoRTeqce"
        },
        href: "https://api.spotify.com/v1/tracks/3fVyiIB5BT5KjSqoRTeqce",
        id: "3fVyiIB5BT5KjSqoRTeqce",
        is_local: false,
        name: "שומר אחי אנוכי",
        popularity: 15,
        preview_url: "https://p.scdn.co/mp3-preview/062567ef4150f1d6d7bfb47dd861483dcd008ac1?cid=79fab6b902af4bd6b4c192b808b8a074",
        track_number: 1,
        type: "track",
        uri: "spotify:track:3fVyiIB5BT5KjSqoRTeqce"
      }
       
   },
  methods:{
        
  }
}

</script>


<template>
   <button>tes</button>
  
</template>
 


<style>
 


</style>