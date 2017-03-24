function connectDb(){
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'projetangular'
    });
    connection.connect();
    return connection;
}

function saveMsg(expediteur, destinataire, msg){
    
    var link = connectDb();
    var res;
    link.query("INSERT INTO message (message, destinataire, expediteur) VALUE('"+msg+"', '"+destinataire+"', '"+expediteur+"')", function(err, rows, fields){
        
        
    });
    
    link.end();
}

function getAllChannel(){
    
   var link = connectDb();
   var res;
   link.query("SELECT cle, intitule FROM channel", function(err, rows, fields){
        res = rows;
        
    });
    
link.end();
   return res;
}

function authentification(user, pass){
    
    var link = connectDb();
    var res = false;
    console.log(user, pass);
    link.query("SELECT id FROM user WHERE login ='"+user+"' AND pass = '"+pass+"'", function(err, rows, fields){
        console.log(rows);
        rows.forEach(function(line){
            res = true;
        })

    });
    
    link.end();
    return res;
}


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
/*
var configUrl = 'http://localhost:3000';// currently my node js using this port
var io = io(configUrl); 
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/', function(req, res){
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  res.sendFile(__dirname + '/index.html');
});

app.get('/angular', function(req, res){
  res.sendFile(__dirname + '/angular.min.js');
});

app.get('/sanitize', function(req, res){
  res.sendFile(__dirname + '/angular-sanitize.min.js');
});

app.get('/socketIo', function(req, res){
  res.sendFile(__dirname + '/socket.io-1.2.0.js');
});

app.get('/app', function(req, res){
  res.sendFile(__dirname + '/app.js');
});

app.get('/controllers', function(req, res){
  res.sendFile(__dirname + '/controllers/userController.js');
});

app.get('/directives', function(req, res){
  res.sendFile(__dirname + '/directives/a.js');
});

app.get('/factories', function(req, res){
  res.sendFile(__dirname + '/factories/userFactory.js');
});


app.get('/channels', function(req, res){
    var link =  connectDb();
    link.query('SELECT cle, intitule FROM channel', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
    
    link.end();
});

app.post('/connexion', function(req, res){
    
    var user = req.body.user;
    var pass = req.body.pass;
    
    console.log(user, pass);
    console.log('body', req.body);
    //var result = authentification(user, pass);
    
    var link = connectDb();
    var users = [];
    console.log(user, pass);
    link.query("SELECT id FROM user WHERE login ='"+user+"' AND pass = '"+pass+"'", function(err, rows, fields){
        console.log(rows);
        res.json(rows[0]);
        
    });
    
    link.end();
  
})

app.get('/getMessageByChannel/:channel', function(req, res){
    
    var link = connectDb();
    var channel = req.params.channel;

    link.query("SELECT message, expediteur, destinataire FROM message WHERE destinataire ='"+channel+"'", function(err, rows, fields){
        console.log(rows);
        res.json(rows);
        
    });
    
    link.end();
})

http.listen(port, function(){
  console.log('listening on *:' + port);
});
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});
*/

var link = connectDb();

link.query("SELECT cle FROM channel", function(err, rows, fields){
    rows.forEach(function(ligne){
        console.log(ligne.cle);
        io.on('connection', function(socket){
            socket.on(ligne.cle, function(msg, pseudo){
                io.emit(ligne.cle, msg, pseudo+" : "+pseudo);
                console.log(ligne.cle, msg, pseudo);
                saveMsg(pseudo, ligne.cle, pseudo+" : "+ msg);
                //saveMsg();
            });

        });
    })
});
    
link.end();

