var arr=[];
module.exports=function(ioConn) {
  ioConn.on('connection' , function(socket){
    console.log("User connected");

    //user gets disconnected
    socket.on('disconnect', function(){
      var name=socket.name;
      for(var i=0;i<arr.length;i++){
        if(arr[i].name==name){
          break;
        }
      }
      arr.splice(i,1);
      socket.broadcast.emit('logarr',arr);
      socket.emit('logarr',arr);
      console.log("User disconnected");
    });

    //message gets displayed
    socket.on('message', function(msg){
      console.log('message: ' + msg);
      socket.to(msg.sendTo).emit('receiveMsg',msg.message);
    });

    //online users-user gets connected
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
        //obj.socket=socket;
        arr.push(obj);
        socket.name=username;
        socket.broadcast.emit('logarr',arr);
        socket.emit('logarr',arr);
      }

    });

    //receiving sender and receiver id
    socket.on('chat-start',function(msg){
      socket.to(msg.receiverId).emit('chatReq',{'senderId':msg.senderId,'senderName':msg.senderName,'receiverId':msg.receiverId});

    });

    //accept request
    socket.on("acceptedRequest",function(msg){
      //console.log("inside acceptedRequest2..cor "+ msg.receiverId);
      socket.to(msg.senderId).emit("acceptedReq",{"receiverId":msg.receiverId,"senderId":msg.senderId});
    });


  });

}
