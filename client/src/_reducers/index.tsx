import { combineReducers } from 'redux';
import user from './user_reducer';

// 여러개의 기능별 리듀서를 combineReducers로 하나의 루트 리듀서로 합친다.
const rootReducer = combineReducers({
	user,
});

export default rootReducer;
