import {combineReducers, createStore} from 'redux'
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer
})
export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
