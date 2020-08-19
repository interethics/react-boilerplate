// git remote add origin https://github.com/kim-youngseok-bm/box-super.git
// git push -u origin master

const express = require('express');
const app = express();
const port = 3055;
const bodyParser = require('body-parser'); // 바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const User = require('./models/User');
const auth = require('./middleware/auth');
const config = require('./config/key'); // 환경에 따라 가져오는 값이 달라진다.

mongoose
	.connect(config.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('몽고 디비 접속'))
	.catch((err) => console.log);

// 소스의 변화를 감지하여 자동으로 재시동 되게 하는 것
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded를 분석해준다.
app.use(bodyParser.json()); // application/json 타입으로 온 데이터를 분석해준다.
app.use(cookieParser());

app.get('/api/hello', (req, res) => {
	res.send('헬로우~~');
});

app.get('/', (req, res) =>
	res.send(`
	<style>
		body{
			background:#000;
			color: #fff;
		}
		h1{
			margin: 8em 0;
			font-size: 3em;
		}
	</style>
	<div style="text-align:center;">
		<h1>시작은 미약하나 그 끝은 창대하리라</h1>
	</div>
`)
);

/* 회원가입 */
app.post('/api/users/register', (req, res) => {
	// 회원 가입할 떄 필요한 정보들을 client에서 가져오면, 그것들을 디비에 넣어준다.
	// body안에는 json 형식으로 요청 데이터가 들어 있다. 이것은 bodyParser가 있어서 가능한 것이다.
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.status(200).json({ success: true, userInfo });
	});
});

app.get('/remove', (req, res) => {
	User.remove({}, (err) => {
		return res.send('성공');
	});
});

app.post('/api/users/login', (req, res) => {
	// 이메일이 존재하는지
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: '제공한 이메일에 해당하는 이메일이 존재하지 않습니다.',
			});
		}

		// 비밀번호가 같은지 확인
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({ loginSuccess: false, message: '비밀번호가 틀립니다' });
			}

			// 비밀번호가 맞다면 토큰 생성
			user.generateToken((err, user) => {
				if (err) {
					return res.status(400).send(err);
				}

				// 쿠키를 저장한다, 어디에? 쿠키, 로컬스토리지, 세션
				res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
			});
		});
	});
});

/* 로그인 여부 확인 */
app.get('/api/users/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAuth: true,
		isAdmin: req.user.role === 0 ? false : true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		image: req.user.image,
	});
});

/* 로그아웃 */
app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) {
			return res.json({ success: false, err });
		}
		res.status(200).send({
			success: true,
		});
	});
});

app.listen(port, () => console.log(`http://localhost:${port} 실행 되었습니다.`));
