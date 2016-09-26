var arr=[];
module.exports=function(ioConn) {
  ioConn.on('connection' , function(socket){
    console.log("User connected");

    socket.on('disconnect', function(){
      var name=socket.name;
      arr.splice((arr.indexOf(name)),1);
      //socket.emit('logarr',arr);
      console.log("User disconnected");
    });

    socket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('receiveMsg',msg);
    });

    //online users
    socket.on('logged',function(username){
      if(arr.indexOf(username)<0){
        arr.push(username);
        socket.name=username;
      }
      socket.emit('logarr',arr);
    });

  });

}
