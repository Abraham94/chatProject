app.controller('userController', function($scope, $http, clientFactory){

    $scope.allClient = clientFactory.getClients().then(function(value) {
            // successCallback
            console.log(value.data);
            $scope.clients = value.data;
            return value.data;

            }, function(reason) {
            // errorCallback

            }, function(value) {
            // notifyCallback

    });
    
    $scope.deleteClient = function(id){
        console.log(id);
        clientFactory.deleteClient(id).then(function(value) {
                // successCallback
                console.log(value.data);
                return value.data;

                }, function(reason) {
                // errorCallback

                }, function(value) {
                // notifyCallback

                }
        );
    }
    
    $scope.getInterationByClient= function(id){
        console.log(id);

        clientFactory.getInterationByClient(id).then(function(value) {
                // successCallback
                console.log(value.data);
                $scope.inter = true;
            
                $scope.interactions = value.data;
                return value.data;

                }, function(reason) {
                // errorCallback

                }, function(value) {
                // notifyCallback

                }
        );
    }
    
    $scope.ajouterClient = function(){
        var nom = $scope.txtNom;
        var prenom = $scope.txtPrenom;
        var age = $scope.txtAge;
        console.log(nom, prenom, age);
            clientFactory.addClient(nom, prenom, age).then(function(value) {
                // successCallback
                console.log(value.data);
                $scope.allClient;
                return value.data;

                }, function(reason) {
                // errorCallback

                }, function(value) {
                // notifyCallback

            });
    }
    //console.log($scope.clients);
/*    $scope.clients = clientFactory.getClients().success(function(data){
        console.log(data);
        $scope.clients = data;
    });
*/
})

app.controller('connexionController', function($scope, userFactory){
    

})

app.controller('msgController', function($scope, channelFactory, userFactory){
        var channel = 'default';
        var socket = io(); 
        $scope.listMsg = [];
        $scope.afficheCnx = true;
        $scope.pseudo = "Anonyme";
        
        channelFactory.getChannels().then(function(value){
            console.log(value.data);
            $scope.channels = value.data;
        });
        
        $scope.envoi = function(){
            
            socket.emit(channel, $scope.txtMsg, $scope.pseudo);
            $scope.txtMsg ="";
        }
        

        $scope.connect = function(username, pwd){
            console.log('connect param', username, pwd);
            
            userFactory.connexion(username, pwd).then(function(value){
                console.log('res', value.data);
                console.log('res id', value.data.id);
                if(value.data.id > 0){
                    console.log('entrer data');
                    $scope.afficheCnx = false;
                    $scope.afficheMsg = true;
                }
            })
        }
        
        
        // selection d'un groupe de conversation
        $scope.selectChannel = function(myChannel){
            $scope.selectedButton = myChannel;
            channelFactory.getMessageByChannel(myChannel).then(function(value){
                console.log('resultat channel', value.data);
                $scope.listMsg = [];
                value.data.forEach(function(val){
                    $scope.listMsg.push(val.expediteur +" : "+val.message);
                })
            
            })
            //$scope.socket = null;
            //$scope.socket = io();
            console.log('dec', channel);
            socket.removeAllListeners();
            
            channel = myChannel;
            socket.on(channel, function(msg){
                //$('#messages').append($('<li>').text(msg));
                $scope.listMsg.push($scope.pseudo+" : "+msg);
                $scope.$apply();
                window.scrollTo(0, document.body.scrollHeight);
            });
        }

})