
// angular.module('demo',['testApp']);
// var app = angular.module('testApp',[]);
// app.factory('testsocket',function($rootScope){
//     var socket = io.connect('http://localhost:3000');
//     console.log("enter app.factory-------------");
//     return {
//         on:function(eventName,callback){
//             socket.on(eventName,function(){
//                 var args = arguments;
//                 $rootScope.$apply(function(){
//                     callback.apply(socket,args);
//                 });
//             });
//         },
//         emit:function(eventName,data,callback){
//             socket.emit(eventName,data,function(){
//                 var args = arguments;
//                 $rootScope.$apply(function(){
//                     if(callback){
//                         callback.apply(socket,args);
//                     }
//                 });
//             });
//         }
//     }
// }
// );

var userInfoModule = angular.module("UserInfoModule",[]);
userInfoModule.controller('userInfoCtrl',['$scope',function($scope){
    $scope.userInfo= {
        email:"894904692@qq.com",
        password:"123456",
        autoLogin:true
    }
    $scope.getFormData = function(){
        console.log($scope.userInfo.email);
    }
    $scope.setFormData = function(){
        $scope.userInfo= {
                email:"403288325@qq.com",
                password:"123",
                autoLogin:false
            }
    }
}]);

userInfoModule.controller('AppCtrl',['$scope', '$http',function($scope,$http){
    console.log("hello world from controller");
    $scope.testdata="1234567";
    $http.get('/contactlist').success(function(response){
    console.log("I got the data from server");
    $scope.testdata=response;
    })
}]);



userInfoModule.service('testsocket',function($rootScope){
    console.log("enter app.service-------------");
    var socket = io.connect('http://localhost:3000');

    this.on=function(eventName,callback){
                    socket.on(eventName,function(){
                        var args = arguments;
                        $rootScope.$apply(function(){
                            callback.apply(socket,args);
                        });
                    });
                };
    this.emit=function(eventName,data,callback){
        socket.emit(eventName,data,function(){
            var args = arguments;
            $rootScope.$apply(function(){
                if(callback){
                    callback.apply(socket,args);
                }
            });
        });
    }

 //    this.sayHello = function() {
 //    console.log("hell1111111111-------------");
 //    return "Hello, World!";
 // }
}
);
userInfoModule.controller('socketCtrl',function($scope, testsocket){
    console.log("enter socketCtrl");
    $scope.socketdata=99999999999999;

    testsocket.on('news',function(data){
    $scope.server_data=data;
    });
    testsocket.emit('my other event', {data: {test:'test'} });

     // testsocket.sayHello();

});
// socketCtrl=userInfoModule.controller('$scope',[]);
// funtion socketCtrl($scope, testsocket){
//     console.log("enter socketCtrl");
//     $scope.socketdata=99999999999999;

//     // testsocket.on('news',function(data){
//     // $scope.server_data=data;
//     // });
//     // testsocket.emit('my other event', {data: {test:'test'} });

//     testsocket.sayHello();

// };