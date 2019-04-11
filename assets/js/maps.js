// Initialise the Google map and its parameters.
function initMap() {
    // Create a map object.
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    // Marker labels.
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Locations Rosie has visited (all in New York).
    var locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];
    // Create the Marker object.
    // The map method here is a built-in JS method, not to be confused with Google Maps!
    // The map method in JS works similar to a forEach() function.
    // The reason for using the module (%) operator below is so that if there are more than 26 
    // locations, then it will loop around to the start of our labels string again, back to A, 
    // instead of throwing an error. When it gets to "26 % 26", zero is returned which is back
    // at the first character of the string.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};


