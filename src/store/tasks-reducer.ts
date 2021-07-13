const initialTasks = [
    {id: '0', title: 'Hello', checked: false},
    {id: '1', title: 'React', checked: false},
    {id: '2', title: 'Js', checked: true}]

const initialState = {
    allTasks: initialTasks,
    activeTasks: initialTasks
}

export type TaskType = {
    title: string
    checked: boolean
    id: string
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                allTasks: state.allTasks.filter(t => t.id !== action.taskId),
                activeTasks: state.activeTasks.filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: new Date().toString(),
                title: action.title,
                checked: false
            }
            return {
                allTasks: [...state.allTasks, newTask],
                activeTasks: [newTask, ...state.activeTasks]
            }
        case 'UPDATE-TASK':
            return {
                allTasks: state.allTasks.map(t => t.id === action.taskId ? {...t, checked: action.checked} : t),
                activeTasks:  state.activeTasks.map(t => t.id === action.taskId ? {...t, checked: action.checked} : t)
            }
        case 'FIND-TASK':
            const activeTasks = state.allTasks.filter(t => t.title.toLowerCase().trim().includes(action.title.toLowerCase().trim()))
            return {
                ...state, activeTasks
            }
        case 'SET-TASKS':
            return initialState
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string) =>
    ({type: 'REMOVE-TASK', taskId} as const)
export const addTaskAC = (title: string) =>
    ({type: 'ADD-TASK', title} as const)
export const updateTaskAC = (taskId: string, checked: boolean) =>
    ({type: 'UPDATE-TASK', taskId, checked} as const)
export const searchTaskAC = (title: string) =>
    ({type: 'FIND-TASK', title} as const)
export const setTasksAC = () =>
    ({type: 'SET-TASKS'} as const)

// types
export type TasksStateType = typeof initialState
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof searchTaskAC>
    | ReturnType<typeof setTasksAC>
