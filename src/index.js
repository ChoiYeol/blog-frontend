import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom' //BrowserRouter 추가
import {Provider } from 'react-redux' // 여기부터 리덕스
import {createStore , applyMiddleware } from 'redux'  //applyMiddleware 미들웨어 추가
import {composeWithDevTools} from 'redux-devtools-extension' //웹에서 라우터 되나 체크용 -> 의미없다고 느낌
import createSagaMiddleware from 'redux-saga'; // saga 생성 통신전에 비동기 미들웨어라고 보면됨.
import rootReducer , { rootSaga } from './modules'
import {tempSetUser, check} from './modules/user'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser(){
  try{
    const user = localStorage.getItem('user');
    if(!user) return;//로그인 상태가 아니라면 아무것도 하지않음

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  }catch(e){
    console.log(`localStorage is not working`);
  }
}

sagaMiddleware.run(rootSaga); //saga를 먼저하고 dispatch해주지않으면 check 에서 비동기통신 똑바로 못할수있음
loadUser();

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
