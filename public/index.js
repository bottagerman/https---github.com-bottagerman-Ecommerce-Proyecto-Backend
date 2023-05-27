const socket = io();


socket.on("msg_server_to_front", (msg)=>{
    console.log(msg)
})