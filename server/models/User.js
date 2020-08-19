const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; // 솔트를 몇자리까지 할 것인가.

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true, // 빈칸을 없어주는 역활
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5,
	},
	lastname: {
		type: String,
		maxlength: 50,
	},
	role: {
		type: Number, // 0:일반유저, 1:관리자, 2:특정부서
		default: 1, // 기본 값
	},
	image: String,
	token: {
		// 유효성 검사
		type: String,
	},
	tokenExp: {
		// 토큰 유효 기간
		type: Number,
	},
});

/*  해당 아이디와 토큰이 맞는지 토큰을 찾는다 */
userSchema.statics.findByToken = function (token, callback) {
	let user = this;

	// 토큰을 풀어해친후 찾아본다
	jwt.verify(token, 'secretToken', function (err, decoded) {
		user.findOne({ _id: decoded, token: token }, callback);
	});
};

/* 해당 아이디로 토큰을 만든다. */
userSchema.methods.generateToken = function (callback) {
	let user = this;
	// json web token을 이용해 token을 생성한다.
	let token = jwt.sign(user._id.toHexString(), 'secretToken');

	// 토큰을 DB에 저장해놓고 쿠키와 비교한다.
	user.token = token;
	user.save(function (err, user) {
		if (err) {
			return callback(err);
		}
		callback(null, user);
	});
};

/* 비밀번호가 맞는지 검사 */
userSchema.methods.comparePassword = function (plainPassword, callback) {
	// userSchema에서 패스워드를 가져오기 위해 this.password를 사용한다.
	bcrypt.compare(plainPassword, this.password, callback);
};

// 저장하기 전에 수행을 무언가를 하고 한다.
userSchema.pre('save', function (next) {
	let user = this; // == new User(req.body)로 인해 사용자가 입력한 데이터가 들어간 상황

	// 패스워드에 값이 변화(입력)될 때만 실행한다.
	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				return next(err);
			}

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash; // 문제가 없으면 해시 된 값을 넣는다.
				next();
			});
		});
	} else {
		next();
	}
});

// 모델은 스키마를 감싸주는 역할
const User = mongoose.model('User', userSchema);
module.exports = User;
