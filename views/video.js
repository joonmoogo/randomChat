var peer = new Peer();


const myFace = document.getElementById("myFace");
const peerFace = document.getElementById("peerFace");
let localStream;
let remoteStream;

navigator.mediaDevices.getUserMedia({
    video:false,
    audio:{
      echoCancellation:true
    }
  }).then(stream =>{
    myFace.srcObject = stream;
    localStream = stream;
    let playPromise = myFace.play();
    if (playPromise !== undefined) { playPromise.then((_) => {}).catch((error) => {}); }
    myFace.volume=0;
    myFace.muted=true;
    console.log('local스트림 저장되고 출력중');
    if(localStream==undefined){
      console.log('err');
    }
    const audioContext = new AudioContext();

    // MediaStreamAudioSourceNode 생성
    const source = audioContext.createMediaStreamSource(stream);

    // AnalyserNode 생성
    const analyser = audioContext.createAnalyser();

    // 오디오 노드를 연결
    source.connect(analyser);

    // FFT 사이즈 설정
    analyser.fftSize = 2048;

    // 분석 결과를 저장할 배열 생성
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 분석 함수
    function analyze() {
      // 분석 결과 저장
      analyser.getByteTimeDomainData(dataArray);

      // 볼륨 레벨 계산
      const volume = getVolumeLevel(dataArray);
      const profile = document.querySelector('.call-avatar1');

      // 콘솔에 출력
      if(volume>1){
        console.log(volume);
        profile.classList.add('shine');
      }
      else{
        profile.classList.remove('shine');
      }

      // 다음 분석 예약
      requestAnimationFrame(analyze);
    }

    // 분석 함수 실행
    analyze();
  
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
  
  }).catch((err)=>{
    console.log(err);
    console.log('err');
  })

  function getVolumeLevel(dataArray) {
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += Math.abs(dataArray[i] - 128);
    }
    return sum / dataArray.length;
  }
  
  
  function connectToNewUser(userId,stream){
    const call = peer.call(userId,stream);
    console.log('call보내는중')
    
  
    if(stream){
      call.on('stream',(userVideoStream)=>{
        peerFace.srcObject = userVideoStream;
         remoteStream = userVideoStream;
        peerFace.play();
         console.log('play');
         const audioContext = new AudioContext();

    // MediaStreamAudioSourceNode 생성
    const source = audioContext.createMediaStreamSource(userVideoStream);

    // AnalyserNode 생성
    const analyser = audioContext.createAnalyser();

    // 오디오 노드를 연결
    source.connect(analyser);

    // FFT 사이즈 설정
    analyser.fftSize = 2048;

    // 분석 결과를 저장할 배열 생성
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 분석 함수
    function analyze() {
      // 분석 결과 저장
      analyser.getByteTimeDomainData(dataArray);

      // 볼륨 레벨 계산
      const volume = getVolumeLevel(dataArray);
      const profile = document.querySelector('.call-avatar2');

      // 콘솔에 출력
      if(volume>1){
        console.log(volume);
        profile.classList.add('shine');
      }
      else{
        profile.classList.remove('shine');
      }

      // 다음 분석 예약
      requestAnimationFrame(analyze);
    }

    // 분석 함수 실행
    analyze();
         
     
       })
      
    }
  }