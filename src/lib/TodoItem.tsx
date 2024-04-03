import { Todo } from '@/Interface/Todo'
import { Checkbox } from '@/components/ui/checkbox'
import { FC } from 'react'
import {MdDelete} from 'react-icons/md'
interface TodoItemProps {
    todoItem: Todo,
    checkBoxModifed?: Function,
    deleteTodoItem?:Function
}
const TodoItem: FC<TodoItemProps> = function ({ todoItem, checkBoxModifed,deleteTodoItem }) {

    const  onClickDelete=function(){
        if(deleteTodoItem){
            deleteTodoItem(todoItem.id)
        }
    }
    // state
    //    const [checked,setChecked]=useState(todoItem.isCompleted)
    const onchangeCheckBox = function (value: any) {
        console.log(value, todoItem.id)
        todoItem.isCompleted = value
        if (checkBoxModifed) {
            checkBoxModifed(todoItem.id, value)
        }
    }
    return (
        <div className='flex items-center gap-2'>
            <Checkbox checked={todoItem.isCompleted} onCheckedChange={(value) => onchangeCheckBox(value)}></Checkbox>
            <p className={todoItem.isCompleted ? "line-through" : ""}>
                {todoItem.title}
            </p>
            <MdDelete onClick={()=>onClickDelete()}></MdDelete>
        </div>
    )

}
export default TodoItem;