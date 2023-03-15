import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {SuperButton} from "./Components/SuperButton";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const removeHandler =()=>{
        props.removeTodolist(props.id)
    }
    const addTaskHandler = () => {
        props.addTask(title, props.id)
        setTitle('')
    }

    const filterHandler =()=>{
        props.changeFilter(props.filter, props.id)
    }

    return <div>
        <h3> {props.title}
            <SuperButton name={'del'} onClickCallBack={removeHandler} />
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <SuperButton onClickCallBack={addTaskHandler} name={'add'} />
            {error && <div className="error-message">{error}</div>}
            </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    const removeTaskHandler = () => {
                        props.removeTask(t.taskId, props.id)
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <SuperButton onClickCallBack={removeTaskHandler} name={'X'}/>
                    </li>
                })
            }
        </ul>
        <div>

            <SuperButton onClickCallBack={filterHandler} name={'all'} />
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={()=>{}}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={()=>{}}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={()=>{}}>Completed
            </button>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


