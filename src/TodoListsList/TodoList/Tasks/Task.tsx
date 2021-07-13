import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import t from './Task.module.css'

type TaskPropsType = {
    id: string
    title: string
    checked: boolean
    changeTaskStatus: (id: string, checked: boolean) => void
    removeTask: (id: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.id)
    }, [props])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.id, newIsDoneValue)
    }, [props]);

    return <div className={t.task}>
        <Checkbox
            checked={props.checked}
            color="primary"
            onChange={onChangeHandler}
        />
        <p>{props.title}</p>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
