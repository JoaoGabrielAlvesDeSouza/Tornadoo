const App = require ("express") ();
const server = require ("http").createServer (App);
const io = require ("socket.io") (server, {cors : {origin : "http://localhost:5173"}});

io.on ("connection" , socket => {

    socket.on ("userName" , userName => {
        socket.data.userName = userName;
        console.log ("\n usuário conectado \n id : " + socket.id + "\n nome : " + userName);
    })

    socket.on ("disconnect" , () => {
        console.log ("usuário " + socket.id + " desconectado");
    })

    socket.on ("message" , message => {
        io.emit ("recieveMessage" , {
            message,
            sender : socket.data.userName,
            senderId : socket.id
        });
    })
})

server.listen (3000, () => { console.log ("server up") });