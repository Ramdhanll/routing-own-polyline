const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LIM'.split(' ')
const routes = [
   ['PHX', 'LAX'],
   ['JFK', 'LAX'],
   ['PHX', 'JFK'],
   ['JFK', 'OKC'],
   ['JFK', 'HEL'],
   ['JFK', 'LOS'],
   ['JFK', 'EZE'],
   ['MEX', 'LAX'],
   ['MEX', 'BKK'],
   ['MEX', 'LIM'],
   ['MEX', 'EZE'],
   ['LIM', 'BKK'],
]

// the graph
const adjacencyList = new Map()

const addNode = (airport) => {
   adjacencyList.set(airport, [])
}

const addEdge = (origin, destination) => {
   adjacencyList.get(origin).push(destination)
   adjacencyList.get(destination).push(origin)
}

// create the graph
airports.forEach(addNode)
routes.forEach((route) => addEdge(...route))

console.log('adjacencyList', adjacencyList)

const resultRoutes = []

const dfs = (
   currentAirport,
   destination,
   visited = new Set(),
   currentRoute = []
) => {
   visited.add(currentAirport)
   currentRoute.push(currentAirport)

   if (currentAirport === destination) {
      resultRoutes.push([...currentRoute])
      console.log('Found route:', currentRoute)
   } else {
      const destinations = adjacencyList.get(currentAirport)
      for (const nextAirport of destinations) {
         if (!visited.has(nextAirport)) {
            dfs(nextAirport, destination, visited, currentRoute)
         }
      }
   }

   visited.delete(currentAirport)
   currentRoute.pop()
}

dfs('PHX', 'BKK')

console.log('All routes:', resultRoutes)
