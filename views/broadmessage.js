var socket = io();

const usertext = document.querySelector('#userText');
const chatbox = document.querySelector(".chatbox");

let userInfo = [];

$.ajax({ 
        
  method: "POST",
  url: "/main",

}).done(function(data){
  userInfo[0] = data.nickName;
  userInfo[1] = data.gender;
  userInfo[2] = data.selfIntroduce;
  userInfo[3] = data.studentId;
  userInfo[4] = data.myHeartCount;
  userEmail = data.email;
})

$('#userText').keydown(function(e){
  if(e.keyCode == 13){
    e.preventDefault();
    if(usertext.value){
      socket.emit('broad', usertext.value, userInfo[0]);
      let list = document.createElement('p');
      list.classList.add('bubble-right');
      chatbox.appendChild(list);
      list.innerHTML=`${usertext.value}` + "(<span class='" + "nickN'" + ">" + userInfo[0] +"</span>)";//이부분 합침
      $('.nickN').css('color','red')//이 부분 합침
      $('.bubble-right').css('margin-bottom',5);//이 부분 합침
      chatbox.scrollTop=chatbox.scrollHeight;
      usertext.value='';
    }
  }
})

socket.on('broad', (data, nick)=>{
  // console.log(data)
  let list = document.createElement('p');
  list.classList.add('bubble-left');
  chatbox.appendChild(list);
  list.innerHTML="(<span class='" + "nickN2'" + ">" + nick + "</span>)" + `${data}`;//이 부분 합침
  $('.nickN2').css('color','red')//이 부분 합침
  $('.bubble-left').css('margin-bottom',5);//이부분 합침
  chatbox.scrollTop=chatbox.scrollHeight;
})

$('#broadButton').click(function(){
  $('.card').show()
  chatbox.innerHTML=''
  socket.emit('userCome', userInfo[0]);//이 부분 합침
})
socket.on('userCome', function(user){
  let list = document.createElement('p');
  list.classList.add('userCome')
  chatbox.appendChild(list);
  list.innerHTML="(" + `${user}` + ")" + " 님이 입장했습니다"
  $('.userCome').css('margin-bottom',5)
})//이 부분 합침

$('#delete').click(function(){
  $('.card').hide()
  chatbox.innerHTML=''
  socket.emit('userOut',userInfo[0]);
})
socket.on('userOut', function(user){
  let list = document.createElement('p');
  list.classList.add('userOut')
  chatbox.appendChild(list);
  list.innerHTML="(" + `${user}` + ")" + " 님이 퇴장했습니다"
  $('.userOut').css('margin-bottom',5)
})

$('#modalButton2').click(function(){
  location.href='/main'
})

socket.on('userCount', function(data){
  $('#currentUser').text("현재 이용자 수: " + data + " 명")
})//현재 이용자 수 기록 

