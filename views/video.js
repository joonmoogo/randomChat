var peer = new Peer();


const myFace = document.getElementById("myFace");
const peerFace = document.getElementById("peerFace");
let localStream;
let remoteStream;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:{
      echoCancellation:true
    }
  }).then(stream =>{
    myFace.srcObject = stream;
    localStream = stream;
    myFace.play();
    myFace.volume=0;
    myFace.muted=true;
    console.log('local스트림 저장되고 출력중');
  
    // peer.on('call',(call)=>{
    //   console.log('답장보내는중');
    //   call.answer(localStream);
  
    //   call.on('stream',userVideoStream=>{
    //     peerFace.srcObject = userVideoStream;
    //     remoteStream = userVideoStream;
    //     peerFace.play();
    //     peerFace.volume=0;
    //     peerFace.muted=0;
        
    //   })
    //   peerFace.style.display='block';
  
    // })
  
  })
  
  
  function connectToNewUser(userId,stream){
    const call = peer.call(userId,stream);
    console.log('call보내는중')
    
  
    call.on('stream',(userVideoStream)=>{
     peerFace.srcObject = userVideoStream;
      remoteStream = userVideoStream;
     peerFace.play();
      console.log('play');
  
    })
   peerFace.style.display='block';
   
  }