var app = angular.module('todo',[]);

app.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.formdata = {};
    
    $http.get('/gettodos')
        .success(function (data) {
            $scope.todolist = data;
        })
        .error(function (error) {
            console.log(error);
        });
 
    $scope.createtodo = function () {
        $http.post('/create',$scope.formdata)
            .success(function (data) {
                console.log("todo added");
                $scope.formdata = {};
                $scope.formdata.text="";
                $scope.todolist = data;
            })
            .error(function (err) {
                console.log(err);
            });
    }; 
 
    $scope.deletetodo = function (id) {
        $http.delete('/delete/' + id)
            .success(function (data) {
                $scope.todolist = data;
                console.log("this todo is removed" + id);
            })
            .error(function (err) {
                console.log("error is" + id);
            });
    };

    $scope.editmodetoggle = function () {
        this.editmode = !(this.editmode);
    }

    $scope.edittodo = function (id) {
        var updatedinfo = {text : $scope.formdata.updatedtodo,ID:id}
        $http.put('/update/',updatedinfo)
            .success(function (data) {
                $scope.todolist = data;
                $scope.formdata.updatedtodo="";
                console.log("the todo with id" + id + " has been updated");
            })
            .error(function (err) {
                console.log(err);
            });
    };

    

}]);