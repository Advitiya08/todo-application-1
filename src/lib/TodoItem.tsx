import { Todo } from '@/Interface/Todo'
import { Checkbox } from '@/components/ui/checkbox'
import {FC, useState} from 'react'
interface TodoItemProps{
    todoItem:Todo,
    checkBoxModifed?:Function
}
const TodoItem:FC<TodoItemProps>=function({todoItem,checkBoxModifed}){
       // state
    //    const [checked,setChecked]=useState(todoItem.isCompleted)
       const onchangeCheckBox=function(value:any){
           console.log(value,todoItem.id)
            todoItem.isCompleted=value
            if(checkBoxModifed){
                checkBoxModifed(todoItem.id,value)
            }
        }
    return(
        <div className='flex items-center gap-2'>
          <Checkbox checked={todoItem.isCompleted} onCheckedChange={(value)=>onchangeCheckBox(value)}></Checkbox>
        <p className={todoItem.isCompleted?"line-through":""}>
            {todoItem.title}
        </p>

        </div>
    )
        
}
export default TodoItem;