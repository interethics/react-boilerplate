// git remote add origin https://github.com/kim-youngseok-bm/box-super.git
// git push -u origin master

const express = require('express');
const app = express();
const port = 3055;
const bodyParser = require('body-parser'); // 바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config/key');  // 환경에 따라 가져오는 값이 달라진다.

mongoose.connect(config.mongoURI,{
	useNewUrlParser: true	
}).then(()=>console.log('몽고 디비 접속')).catch(err=>console.log);


// 소스의 변화를 감지하여 자동으로 재시동 되게 하는 것

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded를 분석해준다.
app.use(bodyParser.json()); // application/json 타입으로 온 데이터를 분석해준다.


app.get('/', (req,res)=>res.send('안녕 세상아~~~!!!'));

app.post('/register', (req, res)=> {
	// 회원 가입할 떄 필요한 정보들을 client에서 가져오면, 그것들을 디비에 넣어준다.

	// body안에는 json 형식으로 요청 데이터가 들어 있다. 이것은 bodyParser가 있어서 가능한 것이다. 
	const user = new User(req.body);
	user.save((err, userInfo)=>{
		return err ? res.json({ success: false, err }) : res.status(200).json({ success: true, userInfo });
	});

});


app.listen(port, ()=>console.log(`예제 앱은 포트 ${port}에서 듣고 있습니다.`));
