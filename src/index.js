import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './store/reducer';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {watchAgeChange} from './sagas/saga';

// creating our middleware from the saga lib
const sagaMiddleware = createSagaMiddleware();


// store gets our reducer and also our saga middleware
// when a action is dispatched, our sagaMiddleware will listen and catch actions
const store = createStore(reducer,applyMiddleware(sagaMiddleware));

// sageMiddleware will run watchAgeUp on page load
sagaMiddleware.run(watchAgeChange);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// 1. App.js -- AGE_UP is dispatched in the UI
// 2. index.js -- Since sagaMiddleware is running --> sagaMiddleware.run(watchAgeUp), sagaMiddleware will catch actions that are passed in.
// 3. saga.js -- yield takeEvery('AGE_UP', ageUpAsync); --> Listen for AGE_UP action and call function ageUpAsync
// 4. saga.js -- ageUpAsync will do some stuff and then dispatch an action AGE_UP_ASYNC
// 5. reducer.js -- AGE_UP_ASYNC will hit the reducer
// 6. State will be updated and the UI will rerender

