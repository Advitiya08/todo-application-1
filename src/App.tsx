
import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Todo } from './Interface/Todo'
import TodoItem from './lib/TodoItem'

function App() {
  const [value,setValue]=useState("")
  const [todoList,setTodoList]=useState(new Array<Todo>())
  const onClickAdd=function(){

    let todo:Todo={
      id:todoList.length,
      title:value,
      content:"",
      isCompleted:false
          }
          todoList.push(todo);
          let todoList2=[...todoList]
          setTodoList(todoList2)
          setValue("")
          
  }
  return (
   <div >
    <div>
   <Input placeholder='Add Something' value={value} onChange={(e)=>{
    console.log(e);
    setValue(e.target.value);
   }}>
    
   </Input>
   </div>
   <div>
    <Button disabled={value.trim()===""} onClick={()=>{ onClickAdd()}}>
      Add 
    </Button>
    </div>
          <div>
          {todoList.map((todo,ind)=>{return (<TodoItem key={ind} todoItem={todo}></TodoItem>)})}

          </div>

   </div>

  )
}

export default App
