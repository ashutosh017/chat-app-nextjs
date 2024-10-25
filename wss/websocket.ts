import WebSocket from 'ws'

const wss = new WebSocket.Server({
    port:8000
})
wss.on('connection',(socket)=>{
    socket.on('message',(message)=>{
        console.log('recieved: ',message.toString());
        const msg = 'hello client';
        console.log('sent: ', msg);
        socket.send(msg)        
    })
    wss.on('custom event',(msg)=>{
        console.log("msg recieved from client: ",msg);

    })
})

wss.on('message',(socket)=>{
    console.log('message recieved')

})