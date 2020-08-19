import types from '../_actions/types';

export default function (previousState = {}, action: any) {
	switch (action.type) {
		case types.USER.REGISTER:
			return { ...previousState, loginSuccess: action.payload };
		case types.USER.LOGIN:
			return { ...previousState, success: action.payload };
		case types.USER.AUTH:
			return { ...previousState, userData: action.payload };
		default:
			return previousState;
	}
}
