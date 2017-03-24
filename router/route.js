app.config(function($stateProvider){
    
    var interactionState = {
            name: 'interaction',
            url: '/interaction/{clientId}',
            component: 'interaction',
            resolve: {
                interaction: function(clientFactory, $transition$) {
                        console.log('id client', $transition$.params().clientId);
                        return clientFactory.getInterationByClient($transition$.params().clientId);
                    }
                }
    }
        
    $stateProvider.state(interactionState);
    

});
