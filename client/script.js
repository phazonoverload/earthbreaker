const app = new Vue({
  el: '#app',
  data: {
    view: 'enter',
    code: 'four',
    name: 'Kev',
    map: false,
    room: {},
    pinSubmitted: false,
    pins: [],
    loading: false
  },
  methods: {
    async enterRoom() {
      const code = this.code.toLowerCase().trim()
      this.room = await this.getRoom()
      this.view = 'room'
      this.loadMap()
    },
    async getRoom() {
      return new Promise(async (resolve, reject) => {
        const room = await fetch('/api/room?code=' + this.code).then(r =>
          r.json()
        )
        resolve(room)
      })
    },
    async loadMap() {
      this.loading = true
      const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.room.token}`
      this.map = L.map('map').setView([51.505, -0.09], 13)
      L.tileLayer(url, {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 10,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.room.token
      }).addTo(this.map)
      this.loading = false

      app.map.on('click', this.addUserPin)
      setInterval(this.loadAllPins, 10000)
    },
    async addUserPin(e) {
      if (
        !this.pinSubmitted &&
        confirm('Want to submit your pin where you just clicked?')
      ) {
        await fetch('/api/pin', {
          method: 'POST',
          body: JSON.stringify({
            code: this.code,
            name: this.name,
            latlng: e.latlng
          })
        })
        this.pinSubmitted = true
        this.pins.push(L.marker(e.latlng).addTo(this.map))
      }
    },
    async loadAllPins() {
      const room = await this.getRoom()
      for (let pin of this.pins) {
        this.map.removeLayer(pin)
      }
      for (let pin of room.doc.pins) {
        this.pins.push(L.marker(pin.latlng).addTo(this.map))
        this.pins[this.pins.length - 1].bindPopup(`<b>${pin.name}</b>`)
      }
    }
  }
})
