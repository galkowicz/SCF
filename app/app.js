'use strict';

angular.module('myApp', ['ngSanitize'])


    .controller('SoundCloud', ['$http','$scope', function ($http,$scope,$sce) {
        SC.initialize({
            client_id: 'd652006c469530a4a7d6184b18e16c81'
        });
        $http({
            method: 'GET',
            url: 'http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q=sprout%20and%20the%20bean%7Cparks&limit=10'
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
        var currentSongIndex = 0;
        $scope.showImg = function(index) {
            $scope.img = $scope.songs[index].artwork_url;
            currentSongIndex = index;
            console.log(index);
        }

        $scope.showWidget = function () {
            var track_url = $scope.songs[currentSongIndex].permalink_url;
            console.log(track_url);
            //console.log($scope.songs[currentSongIndex].permalink_url);
            //console.log($scope.songs);
            SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
                console.log('oEmbed response: ', oEmbed.html);
                angular.element(document.getElementById('widget')).append(oEmbed.html);
                $scope.widget = oEmbed.html;
                $scope.whtml = '<H1>FDSFDSA</H1>';
                //$scope.widget = oEmbed.html;

            });
        }



    }]);

// http://api.soundcloud.com/tracks.json?client_id=d652006c469530a4a7d6184b18e16c81&q=radiohead%7Cparks&limit=2