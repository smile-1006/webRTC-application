// localStream :will be for local camera video feed abd micro phone audio
let localStream;
// once we are connented to another user this will be their camera and audio data 
let remoteStream;
// 
let peerConnection;

const servers = {
    iceServers:[
        {
        urls:['stun:stun1.1.google.com:19302','stun:stun2.1.google.com:19302']
        }
    ]
}

let init = async() => {
    // this will request our  camera feeds and audio feeds from the user
    localStream= await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    document.getElementById("user-1").srcObject =localStream

    createOffer();
    
}

let createOffer = async () => {
    // creating new peer connection and this interface that store all the information between us and that remote peer and that provide us with the bounch of mathods to actually connect to the banch of peer
    peerConnection = new RTCPeerConnection(servers)
    // setted our media stream 
    remoteStream = new MediaStream()
    document.getElementById("user-2").srcObject = remoteStream
    
    //looping all the audio and video to the remote peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    //lesion when peer are connected with easch other
    peerConnection.ontrack = (event ) => {
        event.streams[0].getTracks().forEach((track) =>{
            remoteStream.addTrack(track)
        })
    }


    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track,localStream)
    })

    peerConnection.ontrack =(event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    //generation ICE candidate  
    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            console.log("New ICE candidate:", event.candidate)
        }
    }
    
    
    //lets create an offer
    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    console.log("offer:",offer);

}

init()
















