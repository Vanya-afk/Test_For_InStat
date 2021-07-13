import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from '@material-ui/icons';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addTask: (title: string) => void
    filteredTasks: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addTask(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        props.filteredTasks(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div style={{
        fontSize: '28px'
    }
    }>
        <TextField
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
        />
        <IconButton
            color="inherit" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
})
