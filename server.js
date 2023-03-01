const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const nodemailer = require("nodemailer");
app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
const { Collection } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const constant = require("./constant");
const fs = require('fs');
let sharp = require('sharp');

let multer = require('multer');
let storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./images');
  },
  filename: function(req,file,cb){
    //이미 존재하는 이름의 사진이면 삭제 후, 새로 사진을 저장한다.
    // if(fs.existsSync("./images/" + req.user._id + ".png")){
    //   fs.rmSync("./images/" + req.user._id + ".png")
    // }
    cb(null,req.user._id +'.png');
  }
});
let upload = multer({storage: storage});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const { fstat } = require('fs');

app.use(session({secret: '비밀코드',resave: true, saveUninitialized: false})); // 미들웨어: 요청과 응답 중간에 동작을 실행
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());



var db;

MongoClient.connect('mongodb+srv://junemuk:1998born@cluster0.deeugr7.mongodb.net/?retryWrites=true&w=majority',function(error,client){
    server.listen(5000, function () {
        console.log('listening on 5000'); 
      })

      db = client.db('assaa');
      if(error){
        console.log(error);
      }      
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: constant.EMAIL_SAMPLE,  
    pass: constant.EMAIL_PASS,
  },
});



let isOkay = true;
let error ='';
app.get('/', function (req, res) {
  if(req.user){
    res.redirect('/home');
  }
  else{
    let fmsg = req.flash();
    console.log(fmsg);
    let feedback = fmsg.error;
    if(feedback){
      console.log(feedback[0]);
      isOkay = false;
      res.render('index.ejs',{isOkay:isOkay,error:feedback});

    }
    else{
      isOkay=true;
      res.render('index.ejs',{isOkay:isOkay,error:feedback});
    }
  }
})

app.post('/',function(req,res){ /// 회원가입임
 
  db.collection('user').insertOne({
      email:req.body.email,
      nickName:req.body.nickName,
      password:req.body.password,
      studentId:req.body.studentId,
      gender:req.body.gender,
      mbti:req.body.mbti,
      selfIntroduce:req.body.selfIntroduce,
      myHeartCount: 0},
      function(error,result){
          if(error){
              console.log(error);
          }
          else{ 
              console.log(req.body);
              console.log(`${req.body.email} 가입 완료`);
              error='none';
              isOkay=true;
              res.render('index.ejs',{isOkay:isOkay,error:error});
              
          }
      })    
})
app.delete('/delete',function(req,res){
  console.log(req.body);

  db.collection('user').deleteOne(req.body,function(error,result){
      if(error){
          console.log(error);
      }
      console.log(' 삭제완료');
      res.status(200).send({message: '성공'});
  })
})
// app.post('/deleteImage', function(req, res){
//   console.log(req.body);

//   db.collection('user').findOne(req.body, function(error, result){
//     if(error){
//       console.log(error);
//     }
//     fs.rmSync("./images/" + result._id + ".png")
//   })
//   res.send()
// })

app.post('/blackUpload',function(req,res){  // 블랙리스트 등록
  db.collection('user').updateOne(req.body,{$set:{"black":"true","nickName":"차단된사용자"}},function(error,result){
    res.status(200).send({message: '성공'});
    
  })
  
})

app.get('/list',function(req,res){ // 관리자 화면
  db.collection('user').find().toArray(function(error,result){
      if(error){
          console.log(error);
      }
      console.log(result);
      res.render('list.ejs',{posts : result});

  });
})


app.get('/profile',isLogin, function (req, res) {  // 프로필 화면
  res.render('profile.ejs',{data : req.user});
})

app.get('/main',isLogin ,function (req, res) {  // 채팅 화면
  res.render('main.ejs', {data : req.user});
})

app.get('/mainNologin',function(req,res){
  res.render('mainNologin.ejs');
})

app.post('/main', function(req, res){  
  res.status(200).send(req.user)
})



app.get('/logout',function(req,res){   // 로그아웃
  req.session.destroy(function(err){})
  res.redirect('/');
})

app.get('/findPassword',function(req,res){  // 비밀번호 찾기
  res.render('findPassword.ejs')
})

app.get('/home',isLogin,function(req,res){   // 홈 화면
  let male=0;
  let female=0;
  let animal=0;
  let ISTJ=0;
  let ISFJ=0;
  let INFJ=0;
  let INTJ=0;
  let ISTP=0;
  let ISFP=0;
  let INFP=0;
  let INTP=0;
  let ESTP=0;
  let ESFP=0;
  let ENFP=0;
  let ENTP=0;
  let ESTJ=0;
  let ESFJ=0;
  let ENFJ=0;
  let ENTJ=0;
  let all=0;

  db.collection('user').find({}).toArray(function(err,result){
    for(let i = 0; i< result.length; i++){

      if(result[i].gender=='남자'){
        male++;
      }if(result[i].gender=='여자'){
        female++;
      }if(result[i].gender=='중성'){
        animal++;
      }if(result[i].mbti=='ISTJ'){
        ISTJ++;
      }if(result[i].mbti=='ISFJ'){
        ISFJ++;}
      if(result[i].mbti=='INFJ'){
        INFJ++;
      }if(result[i].mbti=='INTJ'){
        INTJ++;
      }if(result[i].mbti=='ISTP'){
        ISTP++;
      }if(result[i].mbti=='ISTP'){
        ISTP++;
      }if(result[i].mbti=='ISFP'){
        ISFP++;
      }if(result[i].mbti=='INFP'){
        INFP++;
      }if(result[i].mbti=='INTP'){
        INTP++;
      }if(result[i].mbti=='ESTP'){
        ESTP++;
      }if(result[i].mbti=='ESFP'){
        ESFP++;
      }if(result[i].mbti=='ENFP'){
        ENFP++;
      }if(result[i].mbti=='ESTJ'){
        ESTJ++;
      }if(result[i].mbti=='ESFJ'){
        ESFJ++;
      }if(result[i].mbti=='ENFJ'){
        ENFJ++;
      }if(result[i].mbti=='ENTJ'){
        ENTJ++;
      }
      
      
      
    }
    all=result.length;

    res.render('home.ejs',{
      female:female,male:male,animal:animal,all:all,
      ISTJ:ISTJ,ISFJ:ISFJ,INFJ:INFJ,INTJ:INTJ,ISTP:ISTP,ISFP:ISFP,INFP:INFP,INTP:INTP,
      ESTP:ESTP,ESFP:ESFP,ENFP:ENFP,ENTP:ENTP,ESTJ:ESTJ,ESFJ:ESFJ,ENFJ:ENFJ,ENTJ:ENTJ
    });
    
    
  })
  });

app.post('/findPassword',function(req,res){  // 비밀번호 찾기 POST 요청
  const  userEmail  = req.body.email
  console.log(userEmail + " 로 비밀번호 전송");
  
   db.collection('user').findOne({'email': userEmail},function(error,result){
    let mailOption = transporter.sendMail(  // send mail with defined transport object
    {
      from: constant.EMAIL_SAMPLE,  // 
      to: userEmail, // 받는 사람 메일임
      subject: "[Assaa] 비밀번호 입니다.", // 메일 제목임
      // text: "인증코드는 [ " + authCode + " ] 입니다.", 이렇게 스트링+변수값+스트링 쓸때는 String literal 혹은 스트링 리터럴 쓰면됨
      text: `비밀번호는 [ ${result.password} ] 입니다.` // 메일 본문임
    });

    transporter.sendMail(mailOption, function (error, info) {
      console.log(`${userEmail} " 로 비밀번호 전송 완료"`);
      res.status(200).redirect('/findPasswordOk');
    });
  });

})
app.get('/findPasswordOk',function(req,res){
  res.render('findPasswordOk.ejs');
})




app.post('/mailAuth', function (req, res) {

  console.log(req.body);
  const { email } = req.body;

  console.log(email + " 로 인증요청");

  db.collection('user').findOne({'email':email},function(error,result){
    console.log(result);
    if(result){
      res.status(200).send({error:'이미 있는 이메일이에요'});
    }
    else{
      
  const userEmail = email;
  let authCode = Math.round(Math.random() * 10000);


  let mailOption = transporter.sendMail(  // send mail with defined transport object
    {
      from: constant.EMAIL_SAMPLE,  // 
      to: userEmail, // 받는 사람 메일
      subject: "[Assaa] 인증코드 입니다.", // 메일 제목
    
      text: `인증코드는 [ ${authCode} ] 입니다.` // 메일 본문
    });

  transporter.sendMail(mailOption, function (error, info) {
    console.log(`${userEmail} " 로 인증코드 전송 완료"`);
    

    res.status(200).send( // 그냥 authCode만 send하면 expressjs에서 statusCode로 인식해서 오류남
      {
        authCode   //인증코드 만든거 클라이언트 측으로 보냄
      }
    );
  });

    }
  })
})

app.post('/upload',upload.single('userFile'),function(req,res){
  if(req.user){
    sharp(req.file.path).resize({width:640,height:480}).withMetadata().toBuffer((error,buffer)=>{
      if(error){
        console.log(error)
      }
      fs.writeFile(req.file.path,buffer,(error)=>{
        if(error){
          console.log(error);
        }
        res.redirect('/profile');

      })
      
    })
  }
  else{
    console.log("error");
    res.send('전송실패');
  }
})

app.post('/login',passport.authenticate('local',{
  failureRedirect : '/',
  failureFlash : true,
  successFlash : true
}),function(req,res){
  
  res.redirect('/home');
})


passport.use(new LocalStrategy({
  usernameField: 'loginEmail',
  passwordField: 'loginPassword',
  session: true, 
  passReqToCallback: false, 
}, function (입력한아이디, 입력한비번, done) {
  db.collection('user').findOne({ email: 입력한아이디 }, function (error, result) {
    if (error) {
      return done(result)
    }
    if(result?.black){  // ?. 연산자를 통한 안전한 속성값 접근  여러 단계로 이루어진 객체를 탐색할 때는 항상 TypeError가 발생할 확률 발생
      return done(null, false, { message: '이메일이 차단 되었습니다.' }) 
    }
    
    if (!result) {
      return done(null, false, { message: '존재하지않는 아이디요' })
    }
    if (입력한비번 == result.password) {
      return done(null, result)
    } 
    else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function(user,done){
  done(null,user.email)
})
passport.deserializeUser(function(id,done){
  db.collection('user').findOne({email : id},function(error,result){
    done(null,result)

  })
})

function isLogin(req,res,next){
  if(req.user){
    next()
  }
  else{
    res.write("<script>alert('login plz!'); location.href='/';</script>")//이 부분 합침
  }
}

let findingPeople=[];

io.sockets.on('connection', function(socket){
  console.log('a user connected');
    socket.on('disconnect', ()=> {
    console.log('user disconnected');
    });

    
  socket.on('broad', (data, nick)=>{
    console.log(data)
    socket.broadcast.emit('broad', data, nick)
  })
  socket.on('userCome', function(user){
    io.emit('userCome',user)
  })//이 부분 합침
  socket.on('userOut', function(user){
    io.emit('userOut',user)
  })//이 부분 합침
  // socket.on('userCheck', function(roomname){
  //   console.log(io.sockets.adapter.rooms.get(roomname).size)
  //   if(io.sockets.adapter.rooms.get(roomname).size == 1){
  //     io.in(roomname).emit('leaveMessage');
  //     io.sockets.socketsLeave(roomname);
  //     findingPeople.pop();
  //   }
  // })//이 부분 합침
  setInterval(()=>{
    socket.emit('userCount', io.sockets.adapter.sids.size)
  },1000)

  socket.on('profile', function(roomname, userInfo){
    socket.to(roomname).emit('profile',userInfo)
  })
  socket.on('givingHeart', function(roomname){
    socket.to(roomname).emit('givingHeart')
  })
  socket.on('heart', function(userEmail){
    db.collection('user').updateOne({email: userEmail}, {$inc: {myHeartCount: 1}})
  })
  socket.on('heartupdate', function(roomname, data){
    socket.to(roomname).emit('heartupdate', data)
  })

    

    socket.on('userCamerause', function(roomname){
      socket.to(roomname).emit('welcome')
    })

    socket.on('chat message', (msg,data,nick) => {
      console.log('message: ' + msg);
      console.log("room :"+data);
      socket.to(data).emit('chat message', msg, nick);
    });
  
    socket.on('longButton',(data)=>{
      io.in(data).emit('longButton');
    });

    socket.on('requestChat',(data)=>{
      console.log(data);
  

  
      if(findingPeople.includes(data)){
        console.log('이미 찾는 중임');
      }
      else{ // 한명 있는 방이 있을 때 들어감
        if(findingPeople.length>=1){
          io.in(findingPeople[0]).emit('callpeer',data);
          socket.join(findingPeople[0]);
          console.log('방 있어서 들어감');
          io.in(findingPeople[0]).emit('requestChat',findingPeople[0]);
          io.in(findingPeople[0]).emit('matchingComplete');
          // socket.to(findingPeople[0]).emit('welcome')
          findingPeople.pop();
          console.log(findingPeople);
        }
        else{ // 방 없을 때 자기가 만들고 들어감
          let userRoom =data+" 's room";
          console.log(io.sockets);
          console.log('방 없어서 생성함');
          socket.join(userRoom);
          findingPeople.push(userRoom);
          console.log(findingPeople);
          io.in(userRoom).emit('requestChat',userRoom);
          // io.in(userRoom).emit('callpeer',data);
          // socket.to(userRoom).emit('welcome')
        }
      }

     
    

    socket.on('requestLeave',(data)=>{
      console.log('requested Leave');
      io.in(data).emit('leaveMessage');
      io.sockets.socketsLeave(data);
      findingPeople.pop();

    })

    socket.on('requestMatchLeave',(data)=>{
      console.log('requested Match Leave');
      io.in(data).emit('leaveMessage');
      io.sockets.socketsLeave(data);
    })

    app.post('/reload',(req,res)=>{
      console.log(req.body.roomname);
      io.in(req.body.roomname).emit('leaveMessage');
      io.sockets.socketsLeave(req.body.roomname);
      findingPeople.pop();
    })




    /*socket.join(roomnumber);

    if(io.sockets.adapter.rooms.get(roomnumber).size > 2 ){
      socket.leave(roomnumber);
      socket.emit('user-overload','이 방의 이용자 수를 초과했습니다');
    }//각 방의 이용자 수가 2명을 초과하면 초과했다는 경고문을 보여줌.

    console.log(`${userNickname}가 ${roomnumber}번 방에 들어옴`);

    socket.on('countdown', function(data){
      socket.to(roomnumber).emit("countdown", data)
    })

    socket.on('longTime',function(time, longButton){
      socket.to(roomnumber).emit('longTime',time, longButton)
    })

    socket.on('userProfile', function(usersData){
      socket.to(roomnumber).emit('userProfile', usersData)
    })*/




    /*socket.on('disconnect', function(){//시간이 되어 연결이 끊길시, 방에서 나가고 상대방에게 '상대방이 방을 나갔습니다'라는 메시지를 보냄.
      console.log('연결끊김')
      io.to(roomnumber).emit('user-exit','상대방이 방을 나갔습니다.')
    })  


    io.to(roomnumber).emit('user-enter', `(${userNickname}) 님이 접속했습니다.`);
    console.log(io.sockets.adapter.rooms.get(roomnumber).size)

    socket.on('user-send', function(data){
      console.log(data);
      io.to(roomnumber).emit('broadcast', `${userNickname} : ${data}`);
    })*/
  })



//webRTC socket.io 연결
  // socket.on('offer', (offer, roomName) => {
  //   socket.to(roomName).emit('offer', offer);
  // });
  // socket.on('answer', (answer, roomName) => {
  //   socket.to(roomName).emit('answer', answer);
  // })
  // socket.on("ice", (ice, roomName) => {
  //   socket.to(roomName).emit("ice", ice);
  // })

})













