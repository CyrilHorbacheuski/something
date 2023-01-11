import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite"
import todo, { TodoType } from '../../store/todo';
import Loader from '../../components/utilities/loader/Loader';
import './_todo.scss'
import { Button } from '../../styles/uiKit';
import Close from '../../images/close.svg'

const Todos = observer(() => {
    const [isLoading, setIsLoading] = useState(false)
    const [newTodo, setNewTodo] = useState<TodoType>({title: ""})

    // useEffect(() => {
    //     todo.getTodos(setIsLoading)
    // }, [])



    return <>
        <section>
            <h2>Сделай это!</h2> 
            <div className="buttons">
                <Button 
                    style={{margin: "3rem 0 5rem 0", fontSize: "2rem"}} 
                    onClick={() => todo.getTodos(setIsLoading)}>
                        Нажми чтобы обновить список
                </Button>  

                <input type="text" onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}/>
                <Button 
                    style={{margin: "3rem 0 5rem 0", fontSize: "2rem"}} 
                    onClick={() => todo.addTodo(2, newTodo.title)}>
                        Добавить задачу
                </Button>  
            </div>
           
        </section>
        <section className="todos">
            <div className="todos-wrapper">
                {todo.todos.map(t => 
                    <div className='todo-item' key={t.id}>
                        <p className='todo-item__id'>{t.id}.</p>
                        <input className={`todo-item__status`} type={'checkbox'} checked={t.completed} onChange={() => todo.completeTodo(t.id)} />
                        <p className={`todo-item__title status-${t.completed}`}>{t.title}</p>
                        <div className='todo-item__close'><img src={Close} alt=""  onClick={() => todo.removeTodo(t.id)}/></div>
                    </div>
                )}
            </div>
        </section>

        {isLoading && <Loader isLoading={isLoading} />}
    </>
})

export default Todos