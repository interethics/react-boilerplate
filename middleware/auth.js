const User = require('../models/User');

// 인증 처리 하는 곳
let auth = (req, res, next) => {
	// 클라에서 쿠키 토큰을 가져온다
	let token = req.cookies.x_auth;

	// 토큰을 못찾을 경우 미들웨어에서 돌아간다.
	User.findByToken(token, (err, user) => {
		if (err) {
			throw err;
		}
		if (!user) {
			return res.json({ isAuth: false, error: true });
		}

		req.user = user;
		next();
	});
};

module.exports = auth;
