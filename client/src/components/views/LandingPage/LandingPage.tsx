import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props: any) {
	React.useEffect(() => {
		Axios.get('/api/hello').then((res) => console.log(res));
	}, []);

	const onLogoutHandler = () => {
		Axios.get('/api/users/logout').then((res: any) => {
			if (res.data.success) {
				alert('로그아웃 되었습니다.');
				props.history.push('/login');
			} else {
				console.log(res);
				alert('로그아웃에 실패했습니다');
			}
		});
	};

	return (
		<section style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
			<div>
				<h2>시작페이지</h2>
				<button onClick={onLogoutHandler}>로그아웃</button>
			</div>
		</section>
	);
}

export default withRouter(LandingPage);
