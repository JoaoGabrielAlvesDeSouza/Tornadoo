import Header from "../components/Header";
import Footer from "../components/Footer";
import {Navigate} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import io from "socket.io-client";
import Webcam from "react-webcam";
import Peer from "peerjs";

export default function Room ({loggedIn}) {

    let parameters = new URLSearchParams (window.location.search);
    let name = parameters.get ("name");

    if (name != "" && name != null) {

        const [messages, setMessages] = useState ([]);
        const [socket, setSocket] = useState ("");
        const [id, setId] = useState ();
        const [video, setVideo] = useState ();
        let [peer, setPeer] = useState ();
        const myVideo = useRef (null);
        const remoteVideo = useRef (null);

        useEffect (() => {
            let peer = new Peer ();
            setPeer (peer);
            let socket = io.connect ("http://localhost:3000");
            socket.emit ("userName" , name);

            navigator.mediaDevices.getUserMedia ({video : true , audio : true})
            .then (stream => {

                myVideo.current.srcObject = stream;
                setVideo (stream);

                peer.on ("open" , userId => {

                    setId (userId);

                    peer.on ("call" , call => {

                        call.answer (stream);

                        call.on ("stream" , remote => {
                            remoteVideo.current.srcObject = remote;

                        });
                    });
                });
            });

            setSocket (socket);
        } , []);

        if (socket != "") {
            socket.on ("recieveMessage" , recievedMessage =>  {
                setMessages ([ ...messages, {recievedMessage}]);
             });
        }

        async function sendMessage (e) {
            e.preventDefault ();
            socket.emit ("message" , document.getElementById ("message").value);
            document.querySelector ("#message").value = "";
        }

        function calling (e) {

            e.preventDefault ();

            let callId = document.getElementById ("callId").value;
            document.getElementById ("callId").value="";

            let call = peer.call (callId , video);

            call.on ("stream" , remote => {

                remoteVideo.current.srcObject = remote;

            });
        }

        return (
            <div className = "grid">

                <Header/>

                <div className="flex w-full">
                    <div heigth = "600px" className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                        <video className = "place-self-center" width = "600px" heigth = "600px" ref = {remoteVideo} autoPlay/>
                        <Webcam className = "place-self-end absolute" width = "200px" heigth = "200px" audio = {false} ref = {myVideo}/>
                        <div>
                        </div>
                    </div>

                    <div className="divider divider-horizontal"></div>

                    <div className="max-h-96 h-96 overflow-y-auto grid bg-base-300 rounded-box place-self-center">
                        {messages.map ((messages, key) => (
                            <div className={messages.recievedMessage.senderId === socket.id ? "chat chat-end" : "chat chat-start"} key = {key} id = "bubble">
                                <div className="chat-header"> {messages.recievedMessage.sender} </div>
                                <div className="chat-bubble" > {messages.recievedMessage.message} </div>
                            </div>
                        ))}
                        <form onSubmit = {sendMessage} className = "grid flex card bg-base-300 rounded-box">
                            <input type="text" id = "message" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs place-self-end" />
                        </form>

                    </div>
                </div>

                <form onSubmit = {calling}>
                    <input id = "callId" type="text" placeholder="Id do outra chamada" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" value = "Conectar" className="btn btn-primary" />

                </form>

                <div> Seu id : {id} </div>

                <div className = " h-4/4 border-black border-4 flex items-stretch"> <Footer/> </div>

            </div>
        );
} else {
    return <Navigate to = "/" replace/>
}
}