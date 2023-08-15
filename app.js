// Inisialisasi peta
var map = L.map('map').setView([1.0645133680573429, 117.66099637868153], 13)

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

const renderPolyline = (coordinats, color, opacity = 1) => {
   L.polyline(coordinats, { color, opacity }).addTo(map)
}

const handlePrintData = () => {
   console.log('data', data)
}

fetch('road.json')
   .then((response) => {
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json() // Parse response body as JSON
   })
   .then((data) => {
      // Here, 'data' contains the parsed JSON content
      console.log('response', data)
      TBL_R_MAP_STATE = data
      // You can now work with the JSON data
   })
   .catch((error) => {
      console.error('Fetch error:', error)
   })

let TBL_R_MAP_STATE = null
let polylines = []

const pointB = {
   lat: 1.0286491352867646,
   lng: 117.64903046437449,
}

// const pointB = {
//    lat: 1.087379093147341,
//    lng: 117.68315270602655,
// }

// const pointB = {
//    lat: 1.0638967099377004,
//    lng: 117.66550937469471,
// }

// const pointB = {
//    lat: 1.0686994947910349,
//    lng: 117.64677725863893,
// }

const pointA = {
   lat: 1.0550170241286945,
   lng: 117.65228532689476,
}

// const pointA = {
//    lat: 1.0558848013193989,
//    lng: 117.6524174073874,
// }

// const pointB = {
//    lat: 1.067365944609306,
//    lng: 117.65576653239414,
// }

L.marker(pointA).addTo(map)
L.marker(pointB).addTo(map)

setTimeout(() => {
   console.log('TBL_R_MAP_STATE', TBL_R_MAP_STATE)

   TBL_R_MAP_STATE.map((item) => {
      item.segments.map((segment) => {
         if (segment.properties.ACTIVE == '1') {
            polylines.push({
               id: segment.properties.MAPOBJECTNAME,
               data: segment.geometry.polyline,
            })
         }
      })
   })

   console.log('polylines', polylines)

   L.polyline(
      polylines.map((polyline) => polyline.data),
      {
         color: 'gray',
      }
   ).addTo(map)

   const getRoutes = () => {
      const adjacencyList = new Map()

      polylines.forEach((poly) => {
         adjacencyList.set(poly.id, [])
      })

      for (let i = 0; i < polylines.length; i++) {
         const visitedNeighbors = new Set() // Track visited neighbors for each polyline
         for (let j = 0; j < polylines[i].data.length; j++) {
            const coordJ = L.latLng(
               polylines[i].data[j][0],
               polylines[i].data[j][1]
            )

            for (let k = 0; k < polylines.length; k++) {
               if (k !== i) {
                  for (let l = 0; l < polylines[k].data.length; l++) {
                     const coordL = L.latLng(
                        polylines[k].data[l][0],
                        polylines[k].data[l][1]
                     )

                     const distance = coordJ.distanceTo(coordL)

                     if (
                        distance < 20 &&
                        !visitedNeighbors.has(polylines[k].id)
                     ) {
                        adjacencyList.get(polylines[i].id).push(polylines[k].id)
                        visitedNeighbors.add(polylines[k].id)
                        break
                     }
                  }
               }
            }
         }
      }

      return adjacencyList
   }

   const polyIds = polylines.map((item) => item.id)
   const routes = getRoutes()
   console.log('routes', routes, polyIds)

   let resultRoutes = []

   const dfs = (
      currentPolyline,
      destination,
      visited = new Set(),
      currentRoute = []
   ) => {
      visited.add(currentPolyline)
      currentRoute.push(currentPolyline)

      if (currentPolyline === destination) {
         resultRoutes.push([...currentRoute])
         console.log('Found route:', currentRoute)
      } else {
         const destinations = routes.get(currentPolyline)
         for (const nextDestination of destinations) {
            if (!visited.has(nextDestination)) {
               dfs(nextDestination, destination, visited, currentRoute)
            }
         }
      }

      visited.delete(currentPolyline)
      currentRoute.pop()
   }

   // dfs(0, 6)

   const renderRouting = (from, to) => {
      var fromCoordinat = L.latLng(from.lat, from.lng)
      var toCoordinat = L.latLng(to.lat, to.lng)

      // ambil polyline yang berdekatan dengan titik awal dan tujuan
      const polylineLVL2 = polylines
         .map((polyline, index) => {
            let isReverse = false
            let isValid = false
            let indexI = -1

            for (let i = 0; i < polyline.data.length; i++) {
               var coord = L.latLng(polyline.data[i][0], polyline.data[i][1])

               var distanceTo = coord.distanceTo(toCoordinat)
               var distanceFrom = coord.distanceTo(fromCoordinat)

               let resIndex = polyline.data.length - i - 7

               if (distanceFrom <= 100) {
                  console.log('resIndex', resIndex)
                  isValid = true
                  indexI = resIndex < 0 ? 0 : resIndex
                  break
               }
            }

            const fromRes = polyline.data.map((polylineItem) => {
               var polyCoor = L.latLng(polylineItem[0], polylineItem[1])
               var distance = polyCoor.distanceTo(fromCoordinat)

               return distance
            })

            const toRes = polyline.data.map((polylineItem) => {
               var polyCoor = L.latLng(polylineItem[0], polylineItem[1])
               var distance = polyCoor.distanceTo(toCoordinat)

               return distance
            })

            if (fromRes[0] > fromRes[fromRes.length - 1]) {
               // item.polyline.reverse()
               isReverse = true
            }

            // Create a new array for reversed polyline if needed
            const reversedPolyline = isReverse
               ? polyline.data.reverse()
               : polyline.data

            return {
               id: polyline.id,
               isReverse,
               polyline: reversedPolyline,
               from: Math.min(...fromRes),
               to: Math.min(...toRes),
               isValid,
               indexI,
            }
         })
         .sort((a, b) => a.from - b.from)

      const minFrom = polylineLVL2.reduce(
         (max, obj) => (obj.from < max ? obj.from : max),
         polylineLVL2[0].from
      )
      const minTo = polylineLVL2.reduce(
         (max, obj) => (obj.to < max ? obj.to : max),
         polylineLVL2[0].to
      )

      const objFrom = polylineLVL2.find((item) => item.from == minFrom)
      const objTo = polylineLVL2.find((item) => item.to == minTo)

      console.log('id', {
         to: minTo,
         from: minFrom,
         objFrom,
         objTo,
      })

      resultRoutes = []
      dfs(objFrom.id, objTo.id)

      console.log('resultRoutes', resultRoutes)
      console.log('polylineLVL2', polylineLVL2)

      const routes = []

      resultRoutes.map((routess) => {
         const res = routess.map((id) => {
            const poly = polylineLVL2.find((item) => item.id == id)
            return poly
         })

         routes.push(res)
         console.log('asda', res)
      })

      console.log('routeszz', routes)

      const nearest = routes
         .map((route) => {
            let distance = 0
            const temp = createNewPolyline(route, fromCoordinat, toCoordinat)

            temp.map((item) => {
               distance += calculatePolylineDistance(item)
            })

            return {
               polylines: temp,
               distance,
            }
         })
         .sort((a, b) => a.distance - b.distance)

      renderPolyline(nearest[0].polylines, 'green')
   }

   const createNewPolyline = (routes, from, to) => {
      const result = []

      let tempIndexBefore = 0

      for (let i = 0; i < routes.length; i++) {
         // console.log(
         //    '===============================================================================================',
         //    routes[i]
         // )

         if (routes.length == 1) {
            console.log('1 line')
            const getDistancesFrom = routes[i].polyline.map((poly) => {
               const coord = L.latLng(poly[0], poly[1])

               const distance = coord.distanceTo(from)
               return distance
            })

            const getDistancesTo = routes[i].polyline.map((poly) => {
               const coord = L.latLng(poly[0], poly[1])

               const distance = coord.distanceTo(to)
               return distance
            })

            const minFrom = Math.min(...getDistancesFrom)
            const minTo = Math.min(...getDistancesTo)

            const getIndexNearestFrom = getDistancesFrom.indexOf(minFrom)
            const getIndexNearestTo = getDistancesTo.indexOf(minTo)

            result.push(
               routes[i].polyline.slice(getIndexNearestFrom, getIndexNearestTo)
            )

            // renderPolyline(
            //    routes[i].polyline.slice(getIndexNearestFrom, getIndexNearestTo),
            //    'green'
            // )
         } else if (i == 0) {
            const getDistances = routes[i].polyline.map((poly) => {
               const coord = L.latLng(poly[0], poly[1])

               const distance = coord.distanceTo(from)
               return distance
            })

            const min = Math.min(...getDistances)
            const getIndexNearestFrom = getDistances.indexOf(min)

            const getDistancesSegmentNext = []

            for (let j = 0; j < routes[i].polyline.length; j++) {
               const coord = L.latLng(
                  routes[i].polyline[j][0],
                  routes[i].polyline[j][1]
               )

               for (let k = 0; k < routes[i + 1].polyline.length; k++) {
                  const coord2 = L.latLng(
                     routes[i + 1].polyline[k][0],
                     routes[i + 1].polyline[k][1]
                  )
                  const distance = coord.distanceTo(coord2)

                  if (distance < 100) {
                     getDistancesSegmentNext.push({
                        index: j,
                        indexK: k,
                        distance: distance,
                     })
                  }
               }
            }

            getDistancesSegmentNext.sort((a, b) => a.distance - b.distance)

            // console.log('getDistancesSegmentNext', getDistancesSegmentNext[0])

            let res = []
            let tempRest = []

            if (getDistancesSegmentNext[0].index < getIndexNearestFrom) {
               tempRest = routes[i].polyline.slice(
                  getDistancesSegmentNext[0].index,
                  getIndexNearestFrom + 1
               )
            } else {
               tempRest = routes[i].polyline.slice(
                  getIndexNearestFrom,
                  getDistancesSegmentNext[0].index + 1
               )
            }

            if (tempRest.length == 0) {
               res = routes[i].polyline
            } else {
               res = tempRest
            }
            tempIndexBefore = getDistancesSegmentNext[0].indexK

            result.push(res)
            // renderPolyline(res, 'green')
         } else if (i == routes.length - 1) {
            const getDistances = routes[i].polyline.map((poly) => {
               const coord = L.latLng(poly[0], poly[1])

               const distance = coord.distanceTo(to)
               return distance
            })

            const min = Math.min(...getDistances)
            const getIndexNearestTo = getDistances.indexOf(min)

            const getDistancesSegmentBefore = []

            for (let j = 0; j < routes[i].polyline.length; j++) {
               const coord = L.latLng(
                  routes[i].polyline[j][0],
                  routes[i].polyline[j][1]
               )

               for (let k = 0; k < routes[i - 1].polyline.length; k++) {
                  const coord2 = L.latLng(
                     routes[i - 1].polyline[k][0],
                     routes[i - 1].polyline[k][1]
                  )
                  const distance = coord.distanceTo(coord2)

                  if (distance < 100) {
                     getDistancesSegmentBefore.push({
                        index: j,
                        distance: distance,
                     })
                  }
               }
            }

            getDistancesSegmentBefore.sort((a, b) => a.distance - b.distance)

            let res = []
            let tempRest = []

            if (getDistancesSegmentBefore[0].index < getIndexNearestTo) {
               tempRest = routes[i].polyline.slice(
                  getDistancesSegmentBefore[0].index,
                  getIndexNearestTo
               )
            } else {
               tempRest = routes[i].polyline.slice(
                  getIndexNearestTo,
                  getDistancesSegmentBefore[0].index + 1
               )
            }

            if (tempRest.length == 0) {
               res = routes[i].polyline
            } else {
               res = tempRest
            }

            result.push(res)
            // renderPolyline(res, 'green')
         } else {
            // console.log('MIDDLE ---------------------------')
            const getDistancesSegmentNext = []

            for (let j = 0; j < routes[i].polyline.length; j++) {
               const coord = L.latLng(
                  routes[i].polyline[j][0],
                  routes[i].polyline[j][1]
               )

               for (let k = 0; k < routes[i + 1].polyline.length; k++) {
                  const coord2 = L.latLng(
                     routes[i + 1].polyline[k][0],
                     routes[i + 1].polyline[k][1]
                  )
                  const distance = coord.distanceTo(coord2)

                  if (distance < 100) {
                     getDistancesSegmentNext.push({
                        indexJ: j,
                        indexK: k,
                        distance: distance,
                     })
                  }
               }
            }

            getDistancesSegmentNext.sort((a, b) => a.distance - b.distance)

            const { indexJ, indexK } = getDistancesSegmentNext[0]

            let res = []
            let tempRest = []

            if (indexJ < indexK) {
               tempRest = routes[i].polyline.slice(indexJ, tempIndexBefore + 1)
            } else {
               tempRest = routes[i].polyline.slice(tempIndexBefore, indexJ + 1)
            }

            if (tempRest.length == 0) {
               res = routes[i].polyline
            } else {
               res = tempRest
            }

            tempIndexBefore = indexK

            result.push(res)
            // renderPolyline(res, 'green')
         }
      }

      return result
   }

   renderRouting(pointA, pointB)
}, 1000)

function calculateDistance(point1, point2) {
   const [lat1, lon1] = point1
   const [lat2, lon2] = point2
   const radius = 6371000 // Earth's radius in meters

   const dLat = ((lat2 - lat1) * Math.PI) / 180
   const dLon = ((lon2 - lon1) * Math.PI) / 180

   const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
         Math.cos((lat2 * Math.PI) / 180) *
         Math.sin(dLon / 2) *
         Math.sin(dLon / 2)

   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

   const distance = radius * c
   return distance
}

function calculatePolylineDistance(data) {
   let totalDistance = 0
   for (let i = 0; i < data.length - 1; i++) {
      const segmentDistance = calculateDistance(data[i], data[i + 1])
      totalDistance += segmentDistance
   }
   return totalDistance
}
