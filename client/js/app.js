import config from './../../config/config';

angular.module('adventure', ['uiGmapgoogle-maps', 'angular-spinkit'])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: config.api_key,
            v: '3.29',
            libraries: 'visualization'
        })
    }])





