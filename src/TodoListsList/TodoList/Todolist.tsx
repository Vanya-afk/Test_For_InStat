import React, {useCallback, useState} from 'react'
import {Task} from "./Tasks/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTaskAC, removeTaskAC, searchTaskAC, updateTaskAC} from "../../store/tasks-reducer";
import {AddItemForm} from '../../Components/AddItemForm';
import S from './Todolist.module.css'


export const Todolist = React.memo(function () {

    const [isActive, setIsActive] = useState(false)

    const tasks = useSelector((state: AppRootStateType) => state.tasks.activeTasks)
    const allTasks = useSelector((state: AppRootStateType) => state.tasks.allTasks)

    const dispatch = useDispatch()

    const filteredTasks = useCallback((searchingValue: string) => {
        setIsActive(false)
        dispatch(searchTaskAC(searchingValue))
    }, [dispatch])
    const addTask = useCallback(function (title: string) {
        setIsActive(true)
        dispatch(addTaskAC(title))
    }, [dispatch])
    const removeTask = useCallback(function (id: string) {
        dispatch(removeTaskAC(id))
    }, [dispatch])
    const changeStatus = useCallback(function (id: string, checked: boolean) {
        dispatch(updateTaskAC(id, checked))
    }, [dispatch])

    return <>
        <div className={S.AddItemFormBox}>
            <AddItemForm
                addTask={addTask}
                filteredTasks={filteredTasks}
            />
        </div>
        <div className={S.tasksBox}>
            {isActive ?

                allTasks.map((t, i) => {
                    return <div key={i}>
                        <Task
                            id={t.id}
                            title={t.title}
                            checked={t.checked}
                            changeTaskStatus={changeStatus}
                            removeTask={removeTask}
                        />
                    </div>
                })
                : tasks.map((t, i) => {
                    return <div key={i}>
                        <Task
                            id={t.id}
                            title={t.title}
                            checked={t.checked}
                            changeTaskStatus={changeStatus}
                            removeTask={removeTask}
                        />
                    </div>
                })
            }
        </div>
    </>
})


