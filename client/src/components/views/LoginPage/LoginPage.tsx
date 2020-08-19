import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props: any) {
	const dispatch = useDispatch();

	// props와 state의 차이를 항상 기억해두자
	// props는 부모에서 자식에서만(vue할 때 힘들었음...)
	// state는 컴퍼넌트 내에서
	const [Email, setEmail] = useState('test@n.com');
	const [Password, setPassword] = useState('12345');

	const onEmailHandler: any = (event: any) => {
		setEmail(event.currentTarget.value);
	};
	const onPasswordHandler: any = (event: any) => {
		setPassword(event.currentTarget.value);
	};

	const onSubmitHandler: any = (event: any) => {
		event.preventDefault();

		const body = {
			email: Email,
			password: Password,
		};

		// 액션에서 리듀서로 넘어가고 다시 컴포넌트의 스토어로 넘어간다.
		dispatch(loginUser(body)).then((res: any) => {
			if (res.payload.loginSuccess) {
				props.history.push('/');
			} else {
				alert(res.payload.message);
			}
		});
	};

	return (
		<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
			<form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column' }}>
				<label>
					<p>이메일</p>
					<input type="email" value={Email} onChange={onEmailHandler} />
				</label>
				<label>
					<p>비밀번호</p>
					<input type="password" value={Password} onChange={onPasswordHandler} />
				</label>
				<br />
				<hr style={{ width: '100%' }} />
				<br />
				<button>로그인</button>
			</form>
		</div>
	);
}

export default withRouter(LoginPage);
