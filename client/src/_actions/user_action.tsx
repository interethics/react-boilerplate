import Axios from 'axios';
import types from './types';

/* 고객 관련 액션들 */

// 회원 등록
export function registerUser(dataToSubmit: any): any {
	const request = Axios.post('/api/users/register', dataToSubmit).then((res) => res.data);
	return {
		type: types.USER.REGISTER,
		payload: request,
	};
}

// 로그인
export function loginUser(dataToSubmit: any): any {
	const request = Axios.post('/api/users/login', dataToSubmit).then((res) => res.data);
	return {
		type: types.USER.LOGIN,
		payload: request,
	};
}

// 인증 검증
export function auth(): any {
	const request = Axios.get('/api/users/auth').then((res) => res.data);
	return {
		type: types.USER.AUTH,
		payload: request,
	};
}
