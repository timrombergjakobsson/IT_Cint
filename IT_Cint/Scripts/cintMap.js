//var initialLocation;
//var siberia = new google.maps.LatLng(60, 105);
//var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var map;
var geocoder;
var markersArray = [];
//var browserSupportFlag = new Boolean();


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

    // triggers the ajax loader window, more or less ready
    $("#background").bind("ajaxStart", function () {
        $(this).fadeIn(5000);
        $(this).parent().animate({
            opacity: 0.5
        }, 'slow', function () {
            // Animation complete.
        });

    }).bind("ajaxStop", function () {
        $(this).fadeOut('slow');
        $(this).parent().animate({
            opacity: 2
        }, 'slow', function () {
            // Animation complete.
        });
    });
                                                                   

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
                                    textShadow: "1px 1px 2px #000",
                                    opacity: 0.70,
                                    zIndex: 1000 + i,
                                    minWidth: "100px",
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
                //else {
                  //  alert("Geocode was not successful for the following reason: " + status);
                //}

            });
        });
    });
}


function clearMarkers(ib) {
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

function initAccordion() {
    $("#accordion").accordion({
        resizable: false,
        fillSpace: true,
        navigation: true,
        collapsible: false,
        active: false
  });

    var userCountry = $("div#userCountry").html();
    var countries = $("#accordion ul li");
    $.each(countries, function () {
        if (userCountry == $(this).text()) {
            if ($(this).parent().attr("id") == "europe") {
                $("#accordion").accordion({
                    active: 0
                });
            } else if ($(this).parent().attr("id") == "northAmerica") {
                $("#accordion").accordion({
                    active: 1
                });
            } else if ($(this).parent().attr("id") == "southAmerica") {
                $("#accordion").accordion({
                    active: 2
                });
            } else if ($(this).parent().attr("id") == "asiaPacific") {
                $("#accordion").accordion({
                    active: 3
                });
            } else if ($(this).parent().attr("id") == "africa") {
                $("#accordion").accordion({
                    active: 4
                });
            }
        }
    });
}




