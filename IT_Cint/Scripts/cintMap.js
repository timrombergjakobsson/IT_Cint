var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var map;
var geocoder;
var markersArray = [];
var browserSupportFlag = new Boolean();


function initializeMap() {

    //var myLatlng = new google.maps.LatLng(30, 0);
    var myLatlng = new google.maps.LatLng(50, 13); // 30, 0 for zoom 1;  50, 13 for zoom 5
    var myOptions = {
        minZoom: 1,
        maxZoom: 14,
        zoom: 5,
        draggable: true,
        disableDefaultUI: true,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"), myOptions);

    google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.minZoom === map.zoom) {
            map.setCenter(myLatlng);
        }


    });

    /* 
       the ajax loader that is shown before the map is loaded 
    
    var autoTimeout = null;
    map.showLoadingIndicator = function () {
        autoTimeout = setTimeout(map.hideLoadingIndicator, 300);
    };

    map.hideLoadingIndicator = function () {
        if (autoTimeout) {
            clearTimeout(autoTimeout);
            autoTimeout = null;
        }

        $("div#loading").fadeOut();
         
   
    }; 
     */  


    // triggers the ajax loader window, more or less ready
    $(document).ajaxStart(function () {
        $.blockUI(
                {
                 message: '<p>Loading map...</hp>',
                 css: {
                        padding: '10px',
                        border: 'none',
                        top: '48%',
                        fontWeight: 'bold',
                        fontSize: '35px',
                        textAlign: 'center',
                        left: '28%',
                        backgroundColor: '#FFF',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        'border-radius': '10px',
                        opacity: '.5',
                        cursor: 'wait'
                      },
                  overLayCss: {
                        backgroundColor: '#FFF',
                        opacity: 0.6,
                        cursor: 'wait'
                    
                    }
                })
        })
     .ajaxStop($.unblockUI);

                                                                

    $("#accordion").accordion({
        fillSpace: true,
        active: false,
        collapsible: true
    });

    $("#accordion li").click(function () {
        var country = $(this).text();
        zoomToCountry(country);
    });

    $("#accordion h3").click(function () {
        var country = $(this).children().text();
        zoomToContinent(country);
    });

    $("#maxZoomMap").click(function () {
        myLatlng = new google.maps.LatLng(30, 0);
        map.setZoom(1);
        map.setCenter(myLatlng);
    })

    getRespondents();
}

function zoomToContinent(country) {
    var newLatLng;
    var zoom;
    if (country == "Europe") {
        newLatLng = new google.maps.LatLng(56, 18);
        zoom = 3;
    } else if (country == "North America") {
        newLatLng = new google.maps.LatLng(54, -100);
        zoom = 2;
    } else if (country == "South America") {
        newLatLng = new google.maps.LatLng(-15, -60);
        zoom = 2;
    } else if (country == "Asia-Pacific") {
        newLatLng = new google.maps.LatLng(5, 110);
        zoom = 2;
    } else if (country == "Africa") {
        newLatLng = new google.maps.LatLng(-10, 20);
        zoom = 3;
    }
    map.setCenter(newLatLng);
    map.setZoom(zoom);
}

function zoomToCountry(country) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': country }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var ne = results[0].geometry.viewport.getNorthEast();
            var sw = results[0].geometry.viewport.getSouthWest();
            var bounds = new google.maps.LatLngBounds(sw, ne);
            map.fitBounds(bounds);

        }
         else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function setGender(sex) {
    var gender;
    if (sex == 1) {
        gender = "male";
    } else if (sex == 2) {
        gender = "female";
    }
    return gender;
}

function setAge(yearOfBirth) {
    var now = new Date();
    var thisYear = now.getFullYear();
    var age = thisYear - yearOfBirth;
    return age;
}


function getRespondents() {
    var geocoder = new google.maps.Geocoder();

    $.post("/LivePanelists/getLiveRespondents", function (data) {
        $.each(data, function (i, respondent) {
            var loc = determineLocation(respondent);
            geocoder.geocode({ 'address': loc }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    setTimeout(function () {
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            visible: true,
                            title: i + "",
                            icon: "http://labs.google.com/ridefinder/images/mm_20_red.png"
                        });
                        markersArray.push(marker);
                        marker.setMap(map);
                        moveToZone(marker);

                        if (map.zoom >= 5) {
                            var gender = setGender(respondent.Sex);
                            var age = setAge(respondent.YearOfBirth);
                            var c = respondent.FirstName + "," + gender + "," + age;
                            var myOptions = {
                                content: c,
                                disableAutoPan: true,
                                maxWidth: 0,
                                pixelOffset: new google.maps.Size(-65, 5),
                                zIndex: null,
                                boxStyle: {
                                    background: "#761D07",
                                    color: "#fff", // alternative #DDEE11 with orange marker
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    //1
                                    //textShadow: "-1px 0 1px white, 0 -1px 1px white, 0 1px 1px white, 1px 0 1px white," +
                                    //           "0 0 8px white, 0 0 8px white, 0 0 10px white, 0 0 10px white,  0 0 9px white,  0 0 9px white, 2px 2px 4px black, 2px 2px 4px black",
                                    //2
                                    textShadow: "1px 1px 2px #000",
                                    opacity: 0.70,
                                    zIndex: 1000 + i,
                                    //letterSpacing: "0.1px",
                                    minWidth: "100px",
                                    //letterSpacing: "0.1px",
                                    minWidth: "100px",
                                    paddingLeft: "5px",
                                    "-moz-border-radius": "5px",
                                    "-webkit-border-radius": "5px",
                                    "border-radius": "5px"
                                },
                                closeBoxMargin: "0",
                                closeBoxURL: "",
                                pane: "floatPane",
                                enableEventPropagation: false
                            };

                            var ib = new InfoBox(myOptions);
                            ib.open(map, marker);

                        }
                        clearMarkers(ib);

                    }, i * 200);

                } 
                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }

            });
        });
    });
}


function clearMarkers(ib) {
    //map.hideLoadingIndicator(); 
    if (markersArray) {
        $.each(markersArray, function (i, marker) {
            setTimeout(function () {
                marker.setMap(null);
                ib.close(map, marker);
            }, 6000);
        });
    }
}


function moveToZone(marker) {
    google.maps.event.addListener(marker, 'click', function () {
        map.setCenter(marker.getPosition());
        map.setZoom(6);
    });
}


function determineLocation(respondent) {
    var loc;

    if (respondent.Address == null || respondent.CountryName == null) {
        if (respondent.Address == null && respondent.CountryName != null) {
            loc = respondent.CountryName + " " + respondent.PostalCode;
        }
        else if (respondent.CountryName == null && respondent.Address != null) {
            loc = respondent.Address + " " + respondent.PostalCode;
        }
        else {
            //getting geoloc by zip code only is not always generating a correct position on map! to be avoided!
            loc = respondent.PostalCode + "";
        }
    } else {
        loc = respondent.Address + " " + respondent.CountryName + " " + respondent.PostalCode;
    }

    return loc;
}


function getBrowserLang() {
    /*if (navigator.geolocation) {
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
    }*/

    /*$.browserLanguage(function (language, acceptHeader) {
        alert("You have your browser language set to " + language + " and the complete value of the 'Accept-Language' header is " + acceptHeader);
        if (acceptHeader == 'sv-SE') {
            newLatLng = new google.maps.LatLng(62, 15);
            zoom = 3;
        }
        map.setCenter(newLatLng);
        map.setZoom(zoom);
    });*/

}


