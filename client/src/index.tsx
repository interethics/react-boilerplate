import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; // 시작 경로만 입력하면 index.tsx에서 컴바인 된 함수들을 가져온다.

import './index.css';
import 'antd/dist/antd.css';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: Function;
	}
}
// 리덕스는 오브젝트 값만 받으므로 함수나 프로미스를 받기 위해 미들웨어로 리덕스 프로미스와 리덕스 청크를 추가한다.
const createStroeWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
	<Provider store={createStroeWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
