import config from './../../config';
angular.module('adventure', ['uiGmapgoogle-maps', 'angular-spinkit'])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        const api_key = config.api_key
        GoogleMapApi.configure({
            key: api_key,
            v: '3.29',
            libraries: 'visualization'
        })
    }])





