import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on('listening', ()=>{
  console.log('server is listening or wtf')
  // wtf.on('message',message(data,isBinary){
  //   console.log(data.toString())
  // })
} )

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      // if(client.CLOSED)
      // console.log(WebSocket.CLOSING);
      if (client.readyState === WebSocket.OPEN) {
        console.log("data: ",data.toString());
        // console.log("is binary: ",isBinary);
        client.send("sending from server", { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080 ');
});


