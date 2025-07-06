function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

var map = L.map('map').setView([40, -100], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function placeMarkers() {
    for (let i = 1; i <= 3; i++) {
        var markerCoords = [getRandomInRange(30, 35, 3), getRandomInRange(-100, -90, 3)];
        var marker = L.marker(markerCoords).addTo(map);

        // Fetch locality information
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${markerCoords[0]}&longitude=${markerCoords[1]}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                const locality = data.locality;
                document.getElementById(`locality${i}`).innerText = `Locality: ${locality}`;
            });

        // latitude and longitude
        document.getElementById(`marker${i}`).innerText = `Marker ${i}: Latitude: ${markerCoords[0]}, Longitude: ${markerCoords[1]}`;
    }
}

placeMarkers()