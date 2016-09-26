var arr=[];
module.exports=function(ioConn) {
  ioConn.on('connection' , function(socket){
    console.log("User connected");

    socket.on('disconnect', function(){
      var name=socket.name;
      for(var i=0;i<arr.length;i++){
        if(arr[i].name==name){
          break;
        }
      }
      arr.splice(i,1);
      //socket.emit('logarr',arr);
      console.log("User disconnected");
    });

    socket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('receiveMsg',msg);
    });

    //online users
    socket.on('logged',function(username){
      var f=0;
      for(var i=0;i<arr.length;i++){
        if(arr[i].name==username){
          f=1;
          break;
        }
      }
      if(f==0){
        var obj={}
        obj.name=username;
        obj.id=socket.id;
        arr.push(obj);
        socket.name=username;
      }
      socket.emit('logarr',arr);
    });

  });

}
