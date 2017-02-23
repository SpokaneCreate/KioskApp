
function TouchscreenController($scope) {
    $scope.items = [...Array(9).keys()];

    $scope.alert = function (item) {
        alert(item);
    }
}

module.exports = TouchscreenController;
