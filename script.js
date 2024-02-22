var map;
var vehicleLocation = { lat: -0.166792, lng:35.964707 }; // Initial vehicle location

function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: vehicleLocation,
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: vehicleLocation,
        map: map,
        title: 'Vehicle Location'
    });
}

function optimizeAndTrackRoute() {
    var locations = [
        { lat: -0.303099, lng: 36.080025 }, // Location 1 (NAKURU, KE)
        { lat:  -1.286389, lng: 36.817223 }, // Location 2 (NAIROBI, KE)
       
    ];

    
    var directionsService = new google.maps.DirectionsService();

    var waypoints = locations.map(location => ({
        location: new google.maps.LatLng(location.lat, location.lng),
        stopover: true
    }));

    var request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: waypoints.slice(1, waypoints.length - 1),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            console.log('Optimized Route:', response);

            
            var optimizedRoutePath = new google.maps.Polyline({
                path: response.routes[0].overview_path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            optimizedRoutePath.setMap(map);

            
            trackVehicleOnRoute(response.routes[0]);
        } else {
            console.error('Error optimizing route:', status);
        }
    });
}

function trackVehicleOnRoute(route) {
    var currentIndex = 0;

    function updateVehicleLocation() {
        if (currentIndex < route.overview_path.length) {
            var coord = route.overview_path[currentIndex];
            vehicleLocation = { lat: coord.lat(), lng: coord.lng() };

            
            var marker = new google.maps.Marker({
                position: vehicleLocation,
                map: map,
                title: 'Vehicle Location'
            });

            
            map.setCenter(vehicleLocation);

           
            setTimeout(updateVehicleLocation, 5000);

            currentIndex++;
        }
    }

    updateVehicleLocation();
}


function initMap() {
    initializeMap();
}
