import LinkedList from "./LinkendList/LinkendList.mjs";
export default class Graph {
  #ListaAdyacencia = [];
  #map = new Map();
  #visit = new Set();
  #count = 0;

  constructor() {}

  addV(value) {
    this.#ListaAdyacencia.push(new LinkedList());
    this.#map.set(value, this.#ListaAdyacencia.length - 1);
    this.#count++;
    return true;
  }

  addConexion(start, end, distance = 1) {
    if (this.#map.has(start) && this.#map.has(end)) {
      this.#ListaAdyacencia[this.#map.get(start)].push(end, distance);
      this.#ListaAdyacencia[this.#map.get(end)].push(start, distance);
      return true;
    }
    return false;
  }

  dfs(start, callback) {
    this.#visit.add(start);
    callback(start);

    let list = this.#ListaAdyacencia[this.#map.get(start)];

    for (let i = 0; i < list.size(); i++) {
      let v = list.getElementAt(i);
      if (!this.#visit.has(v)) {
        this.#visit.add(v);
        this.dfs(v, callback);
      }
    }
  }

  dijkstra(start) {
    let distances = new Map();
    let visited = new Set();
    let pq = [];

    
    this.#map.forEach((_, vertex) => {
      distances.set(vertex, Infinity);
    });
    distances.set(start, 0);

    pq.push({ vertex: start, distance: 0 });

    while (pq.length > 0) {
      // Obtener el vértice con la distancia más corta
      pq.sort((a, b) => a.distance - b.distance);
      let { vertex: current } = pq.shift();

      if (visited.has(current)) continue;
      visited.add(current);

      let currentDistance = distances.get(current);
      let list = this.#ListaAdyacencia[this.#map.get(current)];

      for (let i = 0; i < list.size(); i++) {
        let neighbor = list.getElementAt(i);
        let weight = list.getWeightAt(i);

        let distance = currentDistance + weight;

        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          pq.push({ vertex: neighbor, distance });
        }
      }
    }

    
    distances.forEach((distance, vertex) => {
      console.log(`Distance from ${start} to ${vertex}: ${distance}`);
    });
  }

  getVertices() {
    return Array.from(this.#map.keys());
  }

  getVisit() {
    return this.#visit;
  }

  size() {
    return this.#count;
  }
}

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.collection.length; i++) {
      if (queueElement.priority < this.collection[i].priority) {
        this.collection.splice(i, 0, queueElement);
        added = true;
        
      }
    }

    if (!added) {
      this.collection.push(queueElement);
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}
