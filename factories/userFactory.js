app.factory('userFactory', function($http){
    
    return{
        connexion : function(user, pass){
            console.log('factory', user, pass);
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/connexion',
                data: {user:user, pass:pass}
            }
            return $http(req);
            //return $http.post('http://localhost:8080/addClient', {nom:'abraham'});
        }
    }
});

app.factory('channelFactory', function($http){

    return{
        getChannels : function(){
                return $http.get('http://localhost:3000/channels');
            },
        getMessageByChannel : function(channel){
                return $http.get('http://localhost:3000/getMessageByChannel/'+channel);            
        }
    }
})