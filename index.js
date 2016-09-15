var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles by <a href="http://mapbox.com">MapBox</a>';

var map = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )

var davidShieldIcon = L.icon({
    iconUrl: 'image/Pin.svg',
    shadowUrl: 'image/Shadow.svg',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [38, 95], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

// Generate endless amount of markers
var markerTimer = setInterval(markerGenerator, 1000);

function markerGenerator() {
    var lat = (Math.random() * 180) - 90;
    var long = (Math.random() * 360) - 180;
    var marker = L.marker([lat, long], {icon: davidShieldIcon}).addTo(map);
    var opacity = 1;

    var myInterval = setInterval(function() {
        opacity -= 0.05;
        marker.setOpacity(opacity);

        if (opacity <= 0) {
            map.removeLayer(marker);
            clearInterval(myInterval);
        }
    }, 250);
}

// var markerHtml = 'Look! a Jew!';
// marker.bindPopup(markerHtml);
