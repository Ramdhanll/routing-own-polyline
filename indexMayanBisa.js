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

const renderPolyline = (coordinats, color) => {
   L.polyline(coordinats, { color }).addTo(map)
}

const handlePrintData = () => {
   console.log('data', data)
}

const polyline0 = [
   [1.0783717263150603, 117.70309371461546],
   [1.0783717263150603, 117.70295417296609],
   [1.0783931920945016, 117.70271802555945],
   [1.0783395276456693, 117.70229940061135],
   [1.078328794755796, 117.70184857374412],
   [1.0783717263150603, 117.70148361866111],
   [1.0783717263150603, 117.7010971956321],
   [1.0782751303058318, 117.70039948738521],
   [1.0782321987451808, 117.69968031119225],
   [1.0782429316354103, 117.69920801637898],
   [1.0783502605355044, 117.6983922344288],
   [1.0788010418746368, 117.69797360948067],
]

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

const polyline4 = [
   [1.0817516478077178, 117.70272843179477],
   [1.0817945793186503, 117.70240641260389],
   [1.0818589765839357, 117.70191264984456],
   [1.0818160450738938, 117.70135448324707],
   [1.0818160450738938, 117.70075338075745],
   [1.0818160450738938, 117.70010934237571],
   [1.0817516478077178, 117.69925062453339],
   [1.0817516478077178, 117.69854218231346],
   [1.0817516478077178, 117.69764052857903],
   [1.0819663053563242, 117.69641685565372],
   [1.0822024286422234, 117.6952575865666],
]

const pointA = {
   lat: 1.075068940969887,
   lng: 117.70552134552617,
}

// const pointA = {
//    lat: 1.0770303948034823,
//    lng: 117.70540481060134,
// }

// const pointA = {
//    lat: 1.0850155740350755,
//    lng: 117.70361238076421,
// }

const pointB = {
   lat: 1.0789458299429693,
   lng: 117.69786072326727,
}

var polyline = L.polyline(
   [polyline0, polyline1, polyline2, polyline3, polyline4],
   {
      color: 'gray',
   }
).addTo(map)

// Add markers for pointA and pointB
L.marker([pointA.lat, pointA.lng]).addTo(map).bindPopup('Point A')
L.marker([pointB.lat, pointB.lng]).addTo(map).bindPopup('Point B')
// L.marker([1.0846922783971695, 117.70347456710509]).addTo(map).bindPopup('CACAT')

const renderRouting = (from, to) => {
   const polylines = [polyline0, polyline1, polyline2, polyline3, polyline4]

   const polylineLVL2 = polylines.map((polyline, index) => {
      let isValid = false

      for (let i = 0; i < polyline.length; i++) {
         var coord = L.latLng(polyline[i][0], polyline[i][1])
         var coordTo = L.latLng(to.lat, to.lng)
         var coordFrom = L.latLng(from.lat, from.lng)

         var distanceTo = coord.distanceTo(coordTo)
         var distanceFrom = coord.distanceTo(coordFrom)

         if (distanceTo <= 50 || distanceFrom <= 50) {
            isValid = true
            break
         }
      }

      return {
         polyline,
         isValid,
      }
   })

   const inValidPolyline2 = polylineLVL2.filter((item) => item.isValid == false)
   const validPolyline2 = polylineLVL2.filter((item) => item.isValid == true)

   const polylineLVL3 = []
   polylineLVL3.push(...validPolyline2)
   validPolyline2.forEach((polyline, index) => {
      let isValid = false

      for (let i = 0; i < polyline.polyline.length; i++) {
         var coord = L.latLng(polyline.polyline[i][0], polyline.polyline[i][1])

         if (isValid == true) {
            break
         }

         // console.log('run', inValidPolyline2.length, inValidPolyline2)
         for (let j = 0; j < inValidPolyline2.length; j++) {
            if (isValid == true) {
               break
            }

            for (let k = 0; k < inValidPolyline2[j].polyline.length; k++) {
               if (isValid == true) {
                  break
               }
               var coordK = L.latLng(
                  inValidPolyline2[j].polyline[k][0],
                  inValidPolyline2[j].polyline[k][1]
               )
               var distanceJtoK = coordK.distanceTo(coord)

               if (distanceJtoK <= 30 && distanceJtoK != 0) {
                  const isTestIncluded = polylineLVL3.some((item) => {
                     return (
                        JSON.stringify(item.polyline) ===
                        JSON.stringify(inValidPolyline2[j].polyline)
                     )
                  })

                  if (!isTestIncluded) {
                     polylineLVL3.push({
                        ...inValidPolyline2[j],
                        isValid: true,
                     })
                  }

                  isValid = true
                  break
               }
            }
         }
      }
   })

   /**
    * Sort urutan segment polylineLVL3
    */

   const polylineLVL4 = polylineLVL3
      .map((item) => {
         var fromCoordinat = L.latLng(from.lat, from.lng)
         var toCoordinat = L.latLng(to.lat, to.lng)

         const fromRes = Math.min(
            ...item.polyline.map((polyline) => {
               var polyCoor = L.latLng(polyline[0], polyline[1])
               var distance = polyCoor.distanceTo(fromCoordinat)

               return distance
            })
         )

         const toRes = Math.min(
            ...item.polyline.map((polyline) => {
               var polyCoor = L.latLng(polyline[0], polyline[1])
               var distance = polyCoor.distanceTo(toCoordinat)

               return distance
            })
         )

         return {
            ...item,
            from: fromRes,
            to: toRes,
         }
      })
      .sort((a, b) => a.from - b.from)

   const polylineLVL5 = []

   for (let i = 0; i < polylineLVL4.length; i++) {
      let start = from

      const tempPolyline = []

      console.log('==================================================', i)
      let isDone = false

      for (let j = 0; j < polylineLVL4[i].polyline.length; j++) {
         if (isDone == true) {
            tempPolyline.push([
               polylineLVL4[i].polyline[j][0],
               polylineLVL4[i].polyline[j][1],
            ])
            break
         } else {
            tempPolyline.push([
               polylineLVL4[i].polyline[j][0],
               polylineLVL4[i].polyline[j][1],
            ])
         }

         const coord = L.latLng(
            polylineLVL4[i].polyline[j][0],
            polylineLVL4[i].polyline[j][1]
         )

         if (polylineLVL4[i + 1] != undefined) {
            for (let k = 0; k < polylineLVL4[i + 1].polyline.length; k++) {
               if (isDone == true) {
                  break
               }

               const coord2 = L.latLng(
                  polylineLVL4[i + 1].polyline[k][0],
                  polylineLVL4[i + 1].polyline[k][1]
               )

               let distance = coord.distanceTo(coord2)

               if (i != 0) {
                  // console.log('distance', distance)
               }
               if (distance <= 25) {
                  console.log('ZZZZZZZZZZZZZZZZZZZZ', {
                     nextSegmentIndex: k,
                  })

                  polylineLVL4[i + 1].polyline =
                     polylineLVL4[i + 1].polyline.slice(k)

                  isDone = true
                  break
               }
            }
         }
      }

      console.log('tempPolyline', tempPolyline)
      polylineLVL5.push({
         ...polylineLVL4[i],
         polyline: tempPolyline,
      })
   }

   console.log('polylineLVL2', polylineLVL2)
   console.log('polylineLVL3', polylineLVL3)
   console.log('polylineLVL4', polylineLVL4)
   console.log('polylineLVL5', polylineLVL5)

   polylineLVL5.map((item, i) => {
      renderPolyline(item.polyline, 'purple')
   })

   // console.log('validPolyline', validPolyline)

   // [1, 2, 3, 4]
   // [2, 3, 4, 6]
   // [5, 6, 7, 8]

   // const polylineLVL3 = validPolylineLVL2.map((polyline, i) => {
   //    var line = turf.lineString(polyline)
   //    var start = turf.point([pointA.lat, pointA.lng])
   //    var stop = turf.point([pointB.lat, pointB.lng])

   //    var sliced = turf.lineSlice(start, stop, line)
   //    var slicedLatLngs = sliced.geometry.coordinates.map((coord) => [
   //       coord[0],
   //       coord[1],
   //    ])

   //    console.log('slicedLatLngs', i, slicedLatLngs)
   //    return slicedLatLngs
   // })

   // console.log('polylineLVL3', polylineLVL3)

   const validPolylineLVL3x = polylineLVL2.map((polyline, i) => {
      var isDone = false

      // console.log('polyline', i, polyline)

      var line = turf.lineString(polyline)
      var start = turf.point([from.lat, from.lng])
      // var stop = turf.point([pointB.lat, pointB.lng])

      var stop = null

      // for (const coord of polyline) {
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

      //          if (isDone == false) {
      //             const distance = circle.getLatLng().distanceTo(coord2)
      //             if (distance <= 30) {
      //                isDone = true
      //                stop = coord
      //                break
      //             }
      //          }
      //       }
      //    }
      // }

      // console.log('result', i, stop)
      // console.log('stop2', stop)
   })

   // const validPolylineLVL3a = validPolylineLVL3.map((polyline, i) => {
   //    console.log('index => ', i)

   //    //bersihin polyline lvl 2
   //    const tempCoord = []

   //    polyline.map((coord) => {
   //       const circle = L.circle(coord, {
   //          color: 'red',
   //          fillColor: '#f03',
   //          fillOpacity: 0.5,
   //          radius: 50,
   //       })

   //       // check jika ada polyline lain yang dekat dengan polyline saat ini
   //       for (const checkPolyline of validPolylineLVL3) {
   //          // jangan render dengan polyline yang sama
   //          // if (polyline[0] == checkPolyline[0]) {
   //          //    break
   //          // }

   //          for (const coord2 of checkPolyline) {
   //             const distance = circle.getLatLng().distanceTo(coord2)
   //             if (distance >= 50 && !tempCoord.includes(coord)) {
   //                tempCoord.push(coord)
   //             }
   //          }
   //       }
   //    })

   //    return tempCoord
   // })

   // console.log('validPolylineLVL4', validPolylineLVL3)
}

const findNearestPoint = (point, polyline) => {
   let nearestDistance = Number.MAX_VALUE
   let nearestPoint = null

   for (const polylinePoint of polyline) {
      const distance = calculateDistance(point, polylinePoint)
      if (distance < nearestDistance) {
         nearestDistance = distance
         nearestPoint = polylinePoint
      }
   }

   return nearestPoint
}

const renderRouting2 = (from, to) => {
   const polylines = [polyline0, polyline1, polyline2, polyline3, polyline4]
   var fromCoordinat = L.latLng(from.lat, from.lng)
   var toCoordinat = L.latLng(to.lat, to.lng)

   const polylineLVL2 = polylines.map((polyline, index) => {
      let isValid = false

      for (let i = 0; i < polyline.length; i++) {
         var coord = L.latLng(polyline[i][0], polyline[i][1])
         var coordTo = L.latLng(to.lat, to.lng)
         var coordFrom = L.latLng(from.lat, from.lng)

         var distanceTo = coord.distanceTo(coordTo)
         var distanceFrom = coord.distanceTo(coordFrom)

         if (distanceTo <= 50 || distanceFrom <= 50) {
            isValid = true
            break
         }
      }

      return {
         polyline,
         isValid,
      }
   })

   const inValidPolyline2 = polylineLVL2.filter((item) => item.isValid == false)
   const validPolyline2 = polylineLVL2.filter((item) => item.isValid == true)

   // NOTE: fixing lvl3

   // logic polylineLVL3
   const polylineLVL3 = []
   polylineLVL3.push(...validPolyline2)

   validPolyline2.forEach((polyline, index) => {
      let isValid = false

      for (let i = 0; i < polyline.polyline.length; i++) {
         var coord = L.latLng(polyline.polyline[i][0], polyline.polyline[i][1])
         var coord2 = null

         if (i < polyline.polyline.length - 1) {
            coord2 = L.latLng(
               polyline.polyline[i + 1][0],
               polyline.polyline[i + 1][1]
            )
         }

         if (isValid == true) {
            break
         }

         for (let j = 0; j < inValidPolyline2.length; j++) {
            if (isValid == true) {
               break
            }

            for (let k = 0; k < inValidPolyline2[j].polyline.length; k++) {
               if (isValid == true) {
                  break
               }

               var coordK = L.latLng(
                  inValidPolyline2[j].polyline[k][0],
                  inValidPolyline2[j].polyline[k][1]
               )
               var distanceJtoK = coordK.distanceTo(coord)

               if (distanceJtoK <= 30 && distanceJtoK != 0) {
                  const isTestIncluded = polylineLVL3.some((item) => {
                     return (
                        JSON.stringify(item.polyline) ===
                        JSON.stringify(inValidPolyline2[j].polyline)
                     )
                  })

                  if (!isTestIncluded) {
                     polylineLVL3.push({
                        ...inValidPolyline2[j],
                        isValid: true,
                     })
                  }

                  isValid = true
                  break
               }
            }
         }
      }
   })

   // logic polylineLVL4
   const polylineLVL4 = polylineLVL3
      .map((item) => {
         let isReverse = false

         const fromRes = item.polyline.map((polyline) => {
            var polyCoor = L.latLng(polyline[0], polyline[1])
            var distance = polyCoor.distanceTo(fromCoordinat)

            return distance
         })

         if (fromRes[0] > fromRes[fromRes.length - 1]) {
            // item.polyline.reverse()
            isReverse = true
         }

         const toRes = Math.min(
            ...item.polyline.map((polyline) => {
               var polyCoor = L.latLng(polyline[0], polyline[1])
               var distance = polyCoor.distanceTo(toCoordinat)

               return distance
            })
         )
         // Create a new array for reversed polyline if needed
         const reversedPolyline = isReverse
            ? [...item.polyline].reverse()
            : item.polyline

         return {
            ...item,
            isReverse,
            polyline: reversedPolyline,
            from: Math.min(...fromRes),
            to: toRes,
         }
      })
      .sort((a, b) => a.from - b.from)

   // logic polylineLVL5
   const polylineLVL5 = []

   const polylineLVL4Combine = polylineLVL4.flatMap(
      (innerArray) => innerArray.polyline
   )

   for (let i = 0; i < polylineLVL4.length; i++) {
      const tempPolyline = []

      console.log('==================================================', i)
      let isDone = false

      for (let j = 0; j < polylineLVL4[i].polyline.length; j++) {
         if (isDone == true) {
            tempPolyline.push([
               polylineLVL4[i].polyline[j][0],
               polylineLVL4[i].polyline[j][1],
            ])
            break
         } else {
            tempPolyline.push([
               polylineLVL4[i].polyline[j][0],
               polylineLVL4[i].polyline[j][1],
            ])
         }

         const coord = L.latLng(
            polylineLVL4[i].polyline[j][0],
            polylineLVL4[i].polyline[j][1]
         )

         if (polylineLVL4[i + 1] != undefined) {
            for (let k = 0; k < polylineLVL4[i + 1].polyline.length; k++) {
               if (isDone == true) {
                  break
               }

               const coord2 = L.latLng(
                  polylineLVL4[i + 1].polyline[k][0],
                  polylineLVL4[i + 1].polyline[k][1]
               )

               let distance = coord.distanceTo(coord2)

               if (i != 0) {
                  // console.log('distance', distance)
               }
               if (distance <= 25) {
                  console.log('ZZZZZZZZZZZZZZZZZZZZ', {
                     nextSegmentIndex: k,
                  })

                  polylineLVL4[i + 1].polyline =
                     polylineLVL4[i + 1].polyline.slice(k)

                  isDone = true
                  break
               }
            }
         }
      }

      console.log('tempPolyline', tempPolyline)

      console.log('asda', polylineLVL4[i])
      polylineLVL5.push({
         ...polylineLVL4[i],
         polyline: tempPolyline,
      })
   }

   console.log('polylineLVL4Combine', polylineLVL4Combine)

   console.log('polylineLVL2', polylineLVL2)
   console.log('polylineLVL3', polylineLVL3)
   console.log('polylineLVL4', polylineLVL4)
   console.log('polylineLVL5', polylineLVL5)

   polylineLVL5.map((item, i) => {
      renderPolyline(item.polyline, 'purple')
   })

   // L.polyline(polylineLVL5, { color: 'green' }).addTo(map)
}

// renderRouting(pointA, pointB)
renderRouting2(pointA, pointB)
