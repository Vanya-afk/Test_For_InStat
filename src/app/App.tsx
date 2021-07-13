import {Paper} from '@material-ui/core';
import React from 'react';
import {Todolist} from '../TodoListsList/TodoList/Todolist';
import S from './App.module.css'

function App() {

    return (
        <div className={S.todoListContainer}>
            <div>
                <Paper style={{
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'linear-gradient(315deg, rgb(211 56 213), rgb(49 254 188))'
                }} elevation={10}>
                    <Todolist/>
                </Paper>
            </div>
        </div>
    );
}

export default App
