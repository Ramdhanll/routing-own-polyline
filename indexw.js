// Inisialisasi peta
var map = L.map('map').setView([1.07987516666667, 117.6703315], 13)

// Tambahkan layer peta dari Leaflet Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

let data = []

// Add a click event listener to the map
map.on('click', function (e) {
   var lat = e.latlng.lat
   var lng = e.latlng.lng

   data.push([lat, lng])

   console.log('coordinat', {
      lat,
      lng,
   })
})

const handlePrintData = () => {
   console.log('data', data)
}

const polyline1 = [
   [1.0748501778739217, 117.70612299601669],
   [1.074957506893452, 117.70589770754768],
   [1.0750541030078298, 117.70570460314565],
   [1.0751185004157184, 117.70549004269897],
   [1.0752580281281123, 117.70527548225228],
   [1.0753760900336355, 117.70508237785027],
   [1.075601480931502, 117.70479272124722],
   [1.0756873441262873, 117.7045674327782],
   [1.0758376047113793, 117.7044065124432],
   [1.075966399492718, 117.7041597679295],
   [1.07610592716636, 117.7039452074828],
   [1.0763635167009338, 117.70364482285747],
   [1.0766318391096181, 117.70343026241079],
   [1.0769001614947156, 117.70323715800876],
   [1.077340210155138, 117.70309769371842],
   [1.0777265942923542, 117.7031191497631],
   [1.0781489003429987, 117.70309614478063],
   [1.0787928737067711, 117.70309614478063],
   [1.0796300388759037, 117.70309614478063],
   [1.0802310803936277, 117.70316051291461],
   [1.0806174641636934, 117.7033750733613],
   [1.0812399712453826, 117.70371837007599],
   [1.0816478206434952, 117.70416894701403],
   [1.0820342042332742, 117.70455515581808],
   [1.082205930257361, 117.70489845253279],
   [1.0824849850257838, 117.70547776573882],
   [1.0825708480262881, 117.70582106245352],
]

const polyline2 = [
   [1.0768475806291977, 117.70521729713158],
   [1.0767402516761408, 117.70516365701991],
   [1.0766114569274856, 117.70515292899756],
   [1.076493395069785, 117.7051314729529],
   [1.0763324016200735, 117.70506710481892],
   [1.0761499423668117, 117.70503492075191],
   [1.0759245515094784, 117.70499200866256],
   [1.0757528251308108, 117.70489545646156],
   [1.0756240303404394, 117.70486327239453],
   [1.0755381671438728, 117.70480963228287],
]

const polyline3 = [
   [1.0803561968676247, 117.70319563852442],
   [1.0804635256931538, 117.70308835830109],
   [1.080678183332826, 117.70291670994372],
   [1.081043101285462, 117.70280942972038],
   [1.0815797452537752, 117.70274506158638],
   [1.0821807863856217, 117.70274506158638],
   [1.0826530329056532, 117.70280942972038],
   [1.0831467450979664, 117.70291670994372],
   [1.0835116627536276, 117.70304544621176],
   [1.0838336488838785, 117.70317418247978],
   [1.0842844294086997, 117.70332437479243],
   [1.0844990867778976, 117.70341019897113],
   [1.0846922783971695, 117.70347456710509],
]

// const pointA = {
//    lat: 1.075068940969887,
//    lng: 117.70552134552617,
// }

const pointA = {
   lat: 1.0769012293761784,
   lng: 117.70559625060568,
}

const pointB = {
   lat: 1.079500489349626,
   lng: 117.70311344912994,
}

var polyline = L.polyline([polyline1, polyline2, polyline3], {
   color: 'gray',
}).addTo(map)

// Add markers for pointA and pointB
L.marker([pointA.lat, pointA.lng]).addTo(map).bindPopup('Point A')
L.marker([pointB.lat, pointB.lng]).addTo(map).bindPopup('Point B')

// var line = turf.lineString(polyline1)
// var line2 = turf.lineString(polyline2)

// var start = turf.point([pointA.lat, pointA.lng])
// var stop = turf.point([pointB.lat, pointB.lng])

// var sliced = turf.lineSlice(start, stop, line)
// // Convert sliced Turf.js LineString to Leaflet polyline format
// var slicedLatLngs = sliced.geometry.coordinates.map((coord) => [
//    coord[0],
//    coord[1],
// ])
// // Add sliced polyline to the map
// // var slicedPolyline = L.polyline(slicedLatLngs, { color: 'blue' }).addTo(map)

// var sliced2 = turf.lineSlice(start, stop, line2)
// // Convert sliced Turf.js LineString to Leaflet polyline format
// var sliced2LatLngs = sliced2.geometry.coordinates.map((coord) => [
//    coord[0],
//    coord[1],
// ])
// Add sliced polyline to the map
// var sliced2Polyline = L.polyline(sliced2LatLngs, { color: 'red' }).addTo(map)

const renderRouting = (from, to) => {
   const polylines = [polyline1, polyline2, polyline3]

   const validPolylineLVL2 = polylines.filter((polyline, index) => {
      let isValid = false
      console.log('index => ', index, polyline)

      for (let i = 0; i < polyline.length; i++) {
         var coord = L.latLng(polyline[i][0], polyline[i][1])
         var coordTo = L.latLng(to.lat, to.lng)
         var coordFrom = L.latLng(from.lat, from.lng)

         var distanceTo = coord.distanceTo(coordTo)
         var distanceFrom = coord.distanceTo(coordFrom)

         console.log('distanceTo', distanceTo)
         console.log('distanceFrom', distanceFrom)

         if (distanceTo <= 50 || distanceFrom <= 50) {
            console.log('yuhu', index)
            isValid = true
            break
         }
      }

      if (isValid) {
         return polyline
      }
   })

   // [1, 2, 3, 4]
   // [2, 3, 4, 6]
   // [5, 6, 7, 8]

   const validPolylineLVL3 = validPolylineLVL2.map((polyline, i) => {
      var line = turf.lineString(polyline)
      var start = turf.point([pointA.lat, pointA.lng])
      var stop = turf.point([pointB.lat, pointB.lng])

      var sliced = turf.lineSlice(start, stop, line)
      var slicedLatLngs = sliced.geometry.coordinates.map((coord) => [
         coord[0],
         coord[1],
      ])

      // polyline.map((coord, i) => {
      //    const circle = L.circle(coord, {
      //       radius: 50,
      //    })

      //    // check jika ada polyline lain yang dekat dengan polyline saat ini
      //    for (const checkPolyline of validPolylineLVL2) {
      //       for (const coord2 of checkPolyline) {
      //          // jangan render dengan polyline yang sama
      //          if (coord2[0] == coord[0]) {
      //             break
      //          }
      //          const distance = circle.getLatLng().distanceTo(coord2)
      //          if (distance <= 10) {
      //             stop = turf.point([coord2[1], coord2[0]])
      //             console.log('stop', stop, checkPolyline.length)
      //             break
      //             return true
      //          }
      //       }
      //    }
      // })

      // console.log('stop2', stop)

      console.log('slicedLatLngs', i, slicedLatLngs)
      return slicedLatLngs

      // ------------------------------------------------------------------------

      // polyline.map((coord) => {
      //    const circle = L.circle(coord, {
      //       color: 'red',
      //       fillColor: '#f03',
      //       fillOpacity: 0.5,
      //       radius: 50,
      //    })

      //    console.log('circle', circle)

      //    var line = turf.lineString(polyline)

      //    var start = turf.point([pointA.lat, pointA.lng])
      //    var stop = turf.point([pointB.lat, pointB.lng])

      //    var sliced = turf.lineSlice(start, stop, line)
      //    // Convert sliced Turf.js LineString to Leaflet polyline format
      //    var slicedLatLngs = sliced.geometry.coordinates.map((coord) => [
      //       coord[0],
      //       coord[1],
      //    ])

      //    // check jika ada polyline lain yang dekat dengan polyline saat ini
      //    for (const checkPolyline of validPolyline) {
      //       // jangan render dengan polyline yang sama
      //       if (polyline[0] == checkPolyline[0]) {
      //          break
      //       }

      //       const isInside = checkPolyline.map((coord2) => {
      //          const distance = circle.getLatLng().distanceTo(coord2)
      //          return distance <= 50
      //       })

      //       console.log('isInside', i, isInside)
      //    }

      //    // L.polyline(slicedLatLngs, {
      //    //    color: 'blue',
      //    // }).addTo(map)
      // })
   })

   const validPolylineLVL4 = validPolylineLVL3.map((polyline, i) => {
      console.log('index => ', i)

      //bersihin polyline lvl 2
      const tempCoord = []

      polyline.map((coord) => {
         const circle = L.circle(coord, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50,
         })

         // check jika ada polyline lain yang dekat dengan polyline saat ini
         for (const checkPolyline of validPolylineLVL3) {
            // jangan render dengan polyline yang sama
            // if (polyline[0] == checkPolyline[0]) {
            //    break
            // }

            for (const coord2 of checkPolyline) {
               const distance = circle.getLatLng().distanceTo(coord2)
               if (distance >= 50 && !tempCoord.includes(coord)) {
                  tempCoord.push(coord)
               }
            }
         }
      })

      return tempCoord
   })

   console.log('validPolylineLVL4', validPolylineLVL4)
}

renderRouting(pointA, pointB)

const renderPolyline = (coordinats, color) => {
   L.polyline(coordinats, { color }).addTo(map)
}

renderPolyline(
   [
      [1.0752580281281123, 117.70527548225228],
      [1.0753760900336355, 117.70508237785027],
      [1.075601480931502, 117.70479272124722],
      [1.0756873441262873, 117.7045674327782],
      [1.0758376047113793, 117.7044065124432],
      [1.075966399492718, 117.7041597679295],
      [1.07610592716636, 117.7039452074828],
      [1.0763635167009338, 117.70364482285747],
      [1.0766318391096181, 117.70343026241079],
      [1.0769001614947156, 117.70323715800876],
      [1.077340210155138, 117.70309769371842],
      [1.0777265942923542, 117.7031191497631],
      [1.0781489003429987, 117.70309614478063],
      [1.0787928737067711, 117.70309614478063],
      [1.0796300388759037, 117.70309614478063],
      [1.0796300388759037, 117.70309614478063],
   ],
   'green'
)
