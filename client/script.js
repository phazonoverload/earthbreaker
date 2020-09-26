const app = new Vue({
  el: '#app',
  data: {
    view: 'enter'
  },
  methods: {}
})

// const map = L.map('map').setView([51.505, -0.09], 13)

// L.tileLayer(
//   `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: mapboxToken
//   }
// ).addTo(map)

// const marker = L.marker([51.5, -0.09]).addTo(map)
// marker.bindPopup('<b>Hello world!</b><br>I am a popup.')

// map.on('click', e => {
//   const name = prompt("What's your name?")
//   console.log(name, e.latlng)
// })
