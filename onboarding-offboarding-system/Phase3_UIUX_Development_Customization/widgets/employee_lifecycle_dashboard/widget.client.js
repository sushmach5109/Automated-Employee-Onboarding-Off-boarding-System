/**
 * Service Portal Widget Client Script: Employee Lifecycle Dashboard
 */
function EmployeeLifecycleDashboardCtrl($scope, spUtil) {
    var c = this;

    // Auto-refresh the dashboard data every 60 seconds
    var refresh = function () {
        c.server.get({}).then(function (response) {
            $scope.data = response.data;
        });
    };

    var intervalId = setInterval(refresh, 60000);

    $scope.$on('$destroy', function () {
        clearInterval(intervalId);
    });
}
