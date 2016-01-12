var express=require('express');
 var app = express();
// var app=require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongojs=require('mongojs');
var db=mongojs('localhost:27017/MongoDB',['airTab']);
server.listen(3000);
// app.listen(3000);
app.use(express.static(__dirname+"/public"));

i=0;
app.get('/contactlist',function(req,res){
	console.log("I received a GET request");
	db.airTab.find({"group":3},function(err,data){
	if( err ||!data) console.log("No data found");
	else 
		 data.forEach(function(temp){
		 	temp.value=i++;
		 	temp.value=(temp.value/temp.radio).toFixed(1);
		
			 console.log(temp);
		   　});

		// {
		// 	data.value=i;
			res.json(data);
		// }
	})
 });

//-----------------------------------------------
io.on('connection', function (socket) {
 console.log("new connect: socketId="+socket.id);
 
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
    console.log(socket.id);
  });

   socket.on('disconnect', function () {
   console.log("disconnect: socketId="+socket.id);
 });
});


console.log("Server running on port 3000");