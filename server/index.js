const WebSocket = require('ws');
var ip = require("ip");

const wss = new WebSocket.Server({ port: 4000 });

const clients = new Map();

wss.on('connection', (ws) => {
    const id = uuidv4();
    const metadata = { id };

    sendAll(JSON.stringify({event: "join", id: id}));
    ws.send(JSON.stringify({event: "id", id: id}));
    clients.set(ws, metadata);
    console.log("id: " + id + " connected");

    ws.on('message', (messageAsString) => {
        const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);

        message.sender = metadata.id;

        const outbound = JSON.stringify(message);

        console.log(message);

        sendAll(outbound);
        });

    ws.on("close", () => {
        console.log("id: " + id + " closed");
        sendAll(JSON.stringify({event: "leave", id: id}));
        clients.delete(ws);
      });
  });

function sendAll(str) {
    [...clients.keys()].forEach((client) => {
        client.send(str);
    });
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

console.log("wss running on " + ip.address() + ":4000");