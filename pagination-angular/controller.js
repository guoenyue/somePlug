app.controller("paginationCtrl",["$scope",function($scope){

        $scope.myPage=Array.apply(null,{length:33}).map(function(item,i){return i;})||[0];
        $scope.$broadcast("fresh",$scope.myPage);
}]);