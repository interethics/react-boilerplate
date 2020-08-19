import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props: any) {
	const dispatch = useDispatch();
	const [Email, setEmail] = useState('test1@n.com');
	const [Name, setName] = useState('김영석');
	const [Passowrd, setPassowrd] = useState('123456');
	const [ConfirmPassword, setConfirmPassword] = useState('123456');

	const onSubmitHandler: any = (event: any) => {
		event.preventDefault();
		if (Passowrd !== ConfirmPassword) {
			return alert('비밀번호와 확인 비밀번호가 같아야 합니다😅');
		}

		const body = {
			email: Email,
			name: Name,
			password: Passowrd,
		};

		dispatch(registerUser(body)).then((res: any) => {
			if (res.payload.success) {
				props.history.push('/login');
				console.log(res.payload.userInfo);
			} else {
				alert('회원가입에 실패했습니다.');
			}
		});
	};

	return (
		<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
			<form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column' }}>
				<label>
					<p>이메일</p>
					<input type="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)} />
				</label>
				<label>
					<p>이름</p>
					<input type="text" value={Name} onChange={(e) => setName(e.currentTarget.value)} />
				</label>
				<label>
					<p>비밀번호</p>
					<input type="password" value={Passowrd} onChange={(e) => setPassowrd(e.currentTarget.value)} />
				</label>
				<label>
					<p>비밀번호 확인</p>
					<input type="password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
				</label>
				<br />
				<hr style={{ width: '100%' }} />
				<br />
				<button>회원가입</button>
			</form>
		</div>
	);
}

export default withRouter(RegisterPage);
