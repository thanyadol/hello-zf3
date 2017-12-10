  
//mapp
/*var map;

function initMap() {

    //alert("hello"); 
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(-33.91722, 151.23064),
        mapTypeId: 'roadmap'
    });

    //customizing markers by map features
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        parking: {
        icon: iconBase + 'parking_lot_maps.png'
        },
        library: {
        icon: iconBase + 'library_maps.png'
        },
        info: {
        icon: iconBase + 'info-i_maps.png'
        }
    };

    //marker lat long
    var features = [
        {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: 'library'
        }
    ];

    // create markers.
    features.forEach(function(feature) {
        var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
        });
    });

}*/
                

function init()
{
    //initMap();

    
    ////*** initial module
    var helloApplication = angular.module('helloApplication', ['uiGmapgoogle-maps']);
    //var crudBaseUrl = '@Url.Content("~/hello/") ';

    //alert('@ViewBag.Hello');
    ////*** controller

    helloApplication.config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization',
        });
    })
    

    helloApplication.controller('helloController', function ($scope, uiGmapGoogleMapApi) {

        //app logic here
        {
            $scope.currentLong = -103.0000;
            $scope.currentLat = 39.8062;

            $scope.map = {

                center: {
                    latitude: 39.8062,
                    longitude: -103.0000
                },

                zoom: 4,

                bounds: {
                    northeast: {
                        latitude:  57.0630,
                        longitude: -70.0410
                    },
                    southwest: {
                        latitude:  16.8438,
                        longitude: -135.9590
                    }
                }

            };

            $scope.options = {
                scrollwheel: false
            };

            

            var mark = { 
                            id: 1,
                            latitude: 39,
                            longitude: -103,
                            showWindow: true,
                            options:
                            {
                                animation: 1,
                                labelContent : "Markers id 1",
                                labelAnchor : "26 0",
                                labelClass: "marker-labels"
                            },

                            icon : "https://raw.githubusercontent.com/angular-ui/angular-google-maps/master/example/assets/images/blue_marker.png",
                        } 

            var markers = [];
            markers.push(mark)
            
            $scope.gmapMarkers = markers;


            //windows
            $scope.windowOptions = {
                //boxClass: "infobox",
               /* boxStyle: {
                    backgroundColor: "blue",
                    border: "1px solid red",
                    borderRadius: "5px",
                    width: "100px",
                    height: "100px"
                },
                content: "",
                disableAutoPan: true,
                maxWidth: 0,
                */

               /* zIndex: null,
                closeBoxMargin: "10px",
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false*/
            };


            //end app logic
        }

        $scope.onMarkerClick = function(lat, long)
        {
            $scope.currentLat = -103.0000;
            $scope.currentLong = 39.8062;
            // console.log("Clicked!");
            $scope.show = !$scope.show;
            
        }


        

        //*** $scope is a parameter in controller, it is dynamic properties, we can assign values to it, which can be later can be accessed in UI element
        $scope.helloMessage = "Hello World with { PHPZend & AngularJS } at " + (new Date()).toLocaleString();
        
        

    });
    
}



var onWindowMarkerClick = function()
{   
    emailjs.init("user_nk4iOgBychjaVMJkhHFWy");
    
    // parameters: service_id, template_id, template_parameters
    emailjs.send("gmail-1985","template_DoU47pm6", 
    { from_name: "Thanyadol Chantarawong", to_name: "Line Manager", message_html: "" } );
           
}
