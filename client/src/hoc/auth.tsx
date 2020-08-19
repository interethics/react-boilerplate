import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { transcode } from 'buffer';

export default function (SpecificComponent: any, option: boolean | null, adminRoute: boolean = false) {
	function AuthenticationCheck(props: any) {
		/**
		 *	option
		 *	null: 누구나 접속 가능
		 *	true: 로그인한 유저만 접속 가능
		 *	false: 로그인한 유저 접속 불가
		 */

		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then((res: any) => {
				console.log(res);

				// 어드민 페이지에 일반 사용자가 접속할 경우
				if (adminRoute && !res.payload.isAdmin) {
					props.history.push('/');
				}

				// 로그인이 되어 있는 경우
				if (res.payload.isAuth) {
					if (option === false) {
						props.history.push('/');
					}
				}
				// 안 되어 있는 경우
				else {
					if (option) {
						props.history.push('/login');
					}
				}
			});

			return () => {
				console.log('컴포넌트가 화면에서 사라짐');
			};
		}, []);

		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
