/*var count = 0;
(function($) {
$('#counter').html(function(i, val) {
$.ajax({
url: '/path/to/script/',
type: 'GET',
data: {increment: true},
success: function() { alert('Request has returned') }
});
return +val+1;
});
}*/


/*function getBrowserLang() {
if (navigator.geolocation) {
browserSupportFlag = true;
navigator.geolocation.getCurrentPosition(function (position) {
initialLocation = new Google.maps.Latlng(position.coords.latitude, position.coords.longtitude);
map.setCenter(initialLocation);
}, function () {
handleNoGeoLocation(browserSupportFlag);
});

//Try Google Geo Gears Geolocation
}
else if (google.gears) {
browserSupportFlag = true;
var geo = google.gears.factory.create('beta.geolocation');
geo.getCurrenPosition(function (position) {
initialLocation = new google.maps.LatLng(position.latitude, position.longitude);
map.setCenter(initialLocation);
}, function () {
handleNoGeoLocation(browserSupportFlag);
});
// Browser does'nt support GeoLocation
} else {
browserSupportFlag = false;
handleNoGeoLocation(browserSupportFlag);
}

function handleNoGeoLocation(errorFlag) {
if (errorFlag == true) {
alert("Geolocation service failed");
initialLocation == newyork;
} else {
alert("Your browser does not support geolocation. We've placed you in Siberia.");
initialLocation == siberia;
}
map.setCenter(initialLocation);

return (navigator.language || navigator.userLanguage);
}

map.setCenter(newLatLng);
map.setZoom(zoom);
});*/
