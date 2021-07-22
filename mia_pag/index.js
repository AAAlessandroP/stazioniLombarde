var mymap = L.map('mapid').setView([45.594822, 9.448242], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

// L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);


$(() => {

    $.get("/stazioni").then(stazioni => {
        stazioni.forEach(s => {
            if (s && s.nome != "-") {
                txt = `<b>${s.nome}</b><br>corse al giorno: ${s.Corse24H}<br>passeggeri saliti al giorno: ${s.Saliti24H}`
                L.marker([s.y, s.x], { icon: L.icon({ iconUrl: "/treno.png", iconSize: [30 + s.Saliti24H / 750, 30 + s.Saliti24H / 750] }) }).addTo(mymap)
                    .bindPopup(txt)
            }
        });
    })

});