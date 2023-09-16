// localStream :will be for local camera video feed abd micro phone audio
let localStream;
// once we are connented to another user this will be their camera and audio data 
let remoteStream;

let init = async() => {
    // this will request our  camera feeds and audio feeds from the user
    localStream= await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    //document.getElementById("user-1").srcObject =localStream

    const videoElement = document.getElementById("user-1");
    videoElement.srcObject= localStream;

    videoElement.onplay();
}

init()
















