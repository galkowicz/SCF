'use strict';

var app = angular.module('myApp', ['ngSanitize']);


app.controller('SoundCloud', ['$http', '$scope', function ($http, $scope) {
    SC.initialize({
        client_id: 'd652006c469530a4a7d6184b18e16c81'
    });



    $scope.showResults = function (search){
        console.log("searching...");
        var searchString = 'http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q='+search+'%7Cparks&limit=10';
        $http({
            method: 'GET',
            url: searchString
        }).then(function successCallback(response) {
            var songs = [];
            response.data.forEach(function (element, index, array) {
                songs.push(element);
            });
            $scope.songs = songs;
            console.log(songs);

        }, function errorCallback(response) {
            console.log("err");
            console.log(response);
        });

    }
    var currentSongIndex = 0;
    $scope.showImg = function (index) {
        $scope.img = $scope.songs[index].artwork_url;
        currentSongIndex = index;
        console.log(index);
    }

    $scope.showWidget = function () {
        var track_url = $scope.songs[currentSongIndex].permalink_url;
        console.log(track_url);
        //console.log($scope.songs[currentSongIndex].permalink_url);
        //console.log($scope.songs);
        SC.oEmbed(track_url, {auto_play: true}).then(function (oEmbed) {
            console.log('oEmbed response: ', oEmbed.html);
            angular.element(document.getElementById('widget')).append(oEmbed.html);


        });
    }


}]);


app.controller('searchController', function($scope) {

        $scope.seacrh = "Seacrh";
        $scope.data = [];
        $scope.submitForm = function(search) {
            $scope.data.push(search);
            console.log("searching... and pushing");
         };
    });



// http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q=radiohead%7Cparks&limit=2