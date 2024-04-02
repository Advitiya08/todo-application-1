import { Todo } from '@/Interface/Todo'
import { Checkbox } from '@/components/ui/checkbox'
import {FC, useState} from 'react'
interface TodoItemProps{
    todoItem:Todo
}
const TodoItem:FC<TodoItemProps>=function({todoItem}){
       // state
       const [checked,setChecked]=useState(todoItem.isCompleted)
       const onchangeCheckBox=function(value:any){
            setChecked(value)
            todoItem.isCompleted=value
        }
    return(
        <div className='flex items-center gap-2'>
          <Checkbox checked={checked} onCheckedChange={(value)=>onchangeCheckBox(value)}></Checkbox>
        <p className={checked?"line-through":""}>
            {todoItem.title}
        </p>

        </div>
    )
        
}
export default TodoItem;