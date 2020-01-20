import { put, delay, takeLatest } from 'redux-saga/effects';

// Generator function 
// makes a func synchronous so the next line won't run unless the line before it has finished
function* ageUpAsync() {
    yield delay(2000);
    // put works like an action and dispatch
    yield put({type: 'AGE_UP_ASYNC', value: 1});
}

function* ageDownAsync() {
    yield delay(2000);
    yield put({type: 'AGE_DOWN_ASYNC', value: 1});
}

// Watch for an action that is fired called AGE_UP or AGE_DOWN in the UI
// Once that action is fired, saga will catch it and fire a function as the second arg
export function* watchAgeChange() {
    // takeEvery will dispatch for each time you click
    // so if you click multiple times during the delay, after the delay is done it will click the amount of time yous clicked
    // yield takeEvery('AGE_UP', ageUpAsync);
    // yield takeEvery('AGE_DOWN', ageDownAsync);

    // takeLatest will take the last click and only dispatch for that
    yield takeLatest('AGE_UP', ageUpAsync);
    yield takeLatest('AGE_DOWN', ageDownAsync);
}