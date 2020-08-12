const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name:{
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true, // 빈칸을 없어주는 역활
		unique: 1,
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number, // 0이면 관리자, 1이면 일반 유저(이건 내가 설정한 것이다)
		default: 1 // 기본 값
	},
	image: String,
	token:{ // 유효성 검사
		type: String
	},
	tokenExp: { // 토큰 유효 기간
		type: Number
	}
});


// 모델은 스키마를 감싸주는 역할
module.exports = mongoose.model('User', userSchema);