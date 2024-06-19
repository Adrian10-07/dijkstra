import Graph from "../models/Graph.mjs";

document.addEventListener('DOMContentLoaded', () => {
    let g = new Graph();

    let locationInput = document.getElementById('location');
    let addLocationButton = document.getElementById('btn-add1');
    let firstLocationInput = document.getElementById('firstLocation');
    let secondLocationInput = document.getElementById('secondLocation');
    let weightLocationInput = document.getElementById('weightLocation');
    let addDistanceButton = document.getElementById('btn-add2');
    let locationListDiv = document.getElementById('location-list');
    let startDfsButton = document.getElementById('btn-add3');
    let initLocationInput = document.getElementById('initLocation');
    let dfsListDiv = document.getElementById('dfs-list');
    let dijkstraButton = document.getElementById('btn-dijkstra');

    addLocationButton.addEventListener('click', () => {
        let location = locationInput.value.trim();
        if (location) {
            g.addV(location);
            updateLocationList();
            locationInput.value = '';
            alert('Estado agregada');
            console.log(location);
        } else {
            alert('Elementos vacios');
        }
    });

    addDistanceButton.addEventListener('click', () => {
        let firstLocation = firstLocationInput.value.trim();
        let secondLocation = secondLocationInput.value.trim();
        let weight = parseInt(weightLocationInput.value.trim());

        if (firstLocation && secondLocation && weight >= 0) {
            let success = g.addConexion(firstLocation, secondLocation, weight);
            if (success) {
                updateLocationList();
                alert('Distancia agregada');
                console.log(success);
            } else {
                alert('Una o ambas locaciones no existen');
                console.log(success);
            }

            firstLocationInput.value = '';
            secondLocationInput.value = '';
            weightLocationInput.value = '';
        } else {
            alert('Elementos vacios o distancia inválida');
        }
    });

    startDfsButton.addEventListener('click', () => {
        let initLocation = initLocationInput.value.trim();
        if (initLocation) {
            dfsListDiv.innerHTML = '';
            g.dfs(initLocation, imprimir);
            g.getVisit().clear();
            initLocationInput.value = '';
        } else {
            alert('Ingresa un estado de inicio');
        }
    });

    dijkstraButton.addEventListener('click', () => {
        let initLocation = initLocationInput.value.trim();
        if (initLocation) {
            console.log(`Distancias desde ${initLocation}:`);
            g.dijkstra(initLocation);
        } else {
            alert('Ingresa un estado de inicio');
        }
    });

    let imprimir = (value) => {
        const div = document.createElement('div');
        div.textContent = value;
        dfsListDiv.appendChild(div);
        console.log(value);
    };

    function updateLocationList() {
        locationListDiv.innerHTML = '';
        g.getVertices().forEach((location) => {
            const div = document.createElement('div');
            div.textContent = location;
            locationListDiv.appendChild(div);
        });
    }

    updateLocationList();
});
