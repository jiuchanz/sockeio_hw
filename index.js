var app=require("express")();
var http=require("http").Server(app);
var io=require("socket.io")(http);
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
    io.emit('chat message', "welcome new member");
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
        console.log(msg);
    });
    socket.on("typing",function(msg){
        socket.broadcast.emit("typing", msg);
    });
    socket.on("stop typing",function(msg){
        socket.broadcast.emit("stop typing", msg);
    });
});


http.listen(3000,function () {
    console.log("listening on *:3000");
});
