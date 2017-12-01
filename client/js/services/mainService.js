angular.module('adventure').service('mainService', function ($http, uiGmapGoogleMapApi) {
  let vm = this, map, heatmap
  vm.arr = ['Coins', 'Keys', 'Cinemark Prizes'] //array for ng-options to display in select menu
  vm.map = {  //defines initial view of map
    center: { // center of map when initially displayed
      latitude: 40.233845,
      longitude: -111.658531
    },
    setCenter: coords => {  //sets the center of the map when marker is clicked
      vm.map.center.latitude = coords.latitude
      vm.map.center.longitude = coords.longitude

    },
    zoom: 6,
    scrollwheel: true,
  }
  const getGoogleMap = async () => {
    const google = await uiGmapGoogleMapApi // when this comes back google maps object is ready with required api key
    vm.buildMarkerArray = (dataArr, markerArr, idArr) => { //function to build array of markers for each type
      for (let i = 0; i <= 100; i++) {
        markerArr.push(dataArr[i])
        idArr.push(i)
      }
    }
    vm.buildHeatArray = (arr1, arr2) => { //function to build array of heat map points
      for (let i = 0; i < arr1.length; i++) {
        arr2.push(new google.LatLng(arr1[i][1], arr1[i][0]))
      }
    }
    vm.createInfoWindow = point => { // creates info window depending on coordinate
      const infowindow = new google.InfoWindow({
        content: `Latitude: ${point.coords.latitude.toFixed(2)} <br> 
                          Longitude: ${point.coords.longitude.toFixed(2)}` //info window to display coordinates when clicked on
      })
      return infowindow
    }
    vm.initMap = arr => { // sets up map to show heat with an array of data points passed in
      map = new google.Map(document.getElementById('map2'), {
        zoom: 6,
        center: {  //center points of heat map
          lat: vm.map.center.latitude,
          lng: vm.map.center.longitude
        }
      })
      heatmap = new google.visualization.HeatmapLayer({
        data: arr,
        map: map,
      })
    }

    vm.events = (marker, eventName, model) => {
      const infowindow = vm.createInfoWindow(model) // creates info window depending on coordinate
      infowindow.open(vm.map, marker)   //displays windows on marker click events, shows latitude and longitude of marker
      vm.map.zoom = 18  //sets map zoom on marker click event
      vm.map.setCenter(model.coords) //sets center of map with marker coordinates on click event
    }

    vm.coinOptions = { //sets coin options in map view
      options: {
        icon: {
          url: './icons/coin.ico',
          scaledSize: {  //re-sizes marker icons
            height: 23,
            width: 23
          }
        },
        animation: google.Animation.DROP, // drops markers on map
        title: 'Coin',
        markerEvents: {
          events: {
            click: vm.events
          }
        }
      }
    }
    vm.keyOptions = { //sets key options in map view
      options: {
        icon: {
          url: './icons/083818-orange-fiesta-icon-business-key9.png',
          scaledSize: {  //re-sizes marker icons
            height: 55,
            width: 55
          }
        },
        animation: google.Animation.DROP, // drops markers on map
        title: 'Key',
        markerEvents: {
          events: {
            click: vm.events
          }
        }
      }
    }
    vm.cPrizeOptions = {  //sets cinemark prize options in map view
      options: {
        icon: {
          url: './icons/cinemark.png',
          scaledSize: {  //re-sizes marker icons
            height: 30,
            width: 30
          }
        },
        animation: google.Animation.DROP, // drops markers on map
        title: 'Cinemark Prize',
        markerEvents: {
          events: {
            click: vm.events
          }
        }
      }
    }
  }
  getGoogleMap()
  vm.getAllPrizes = () => { //API call (function definition) for all prizes
    return $http({
      method: 'GET',
      url: '/api/allprizes'
    })
  }
})




