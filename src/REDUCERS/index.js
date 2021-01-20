import {combineReducers} from 'redux';

import parcelInfo from './parcelReducer';
import keyList from './keyListReducer';

export default combineReducers({ parcelInfo, keyList })