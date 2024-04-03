
import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './Interface/Todo'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { useJokes } from './hooks/useJokes'
import TodoItem from './lib/TodoItem'

function App() {
  
  const {joke,isLoading,fetchMoreJokes}=useJokes()
  const [value,setValue]=useState("")
 
  const [todoList,setTodoList]=useState<Todo[]>(()=>{
    let todos=localStorage.getItem('todoList')
    if(todos)
    return JSON.parse(todos)
  return[]})
  const deleteTodoItem=function(id:number){
    setTodoList(todoList.filter(x=>x.id!==id))
    
  }
  
  useJokes()
  useEffect(()=>{console.log(todoList)
    localStorage.setItem('todoList',JSON.stringify(todoList))},[todoList])
  const onClickAdd=function(){
    let todo:Todo={
      id:Date.now(),
      title:value,
      content:"",
      isCompleted:false
          }
          todoList.push(todo);
          let todoList2=[...todoList]
          setTodoList(todoList2)
          setValue("")
          
  }
  const checkChanged=function(id:any,flag:any){
    console.log(id,flag)
    setTodoList(todoList.map(item => {
      if(item.id===id){
        console.log("hi")
      item.isCompleted=flag;
      return {...item}
      }
      return item
    }))
   
  }
  return (
   <div >
    <div>
      <h1>
        Start Your day with a joke
      </h1>
      {isLoading && <p> Joke Loading Wait .....</p>}
      {joke && joke.joke?<p className='my-8'> {joke.joke}</p>:null}
      {joke && joke.setup?<p className='my-8'>Quesion? {joke.setup}</p>:null}
      {joke && joke.delivery?<p className='my-8'>Response? {joke.delivery}</p>:null}

      {joke?<Button onClick={()=>{
        
        fetchMoreJokes()}}> More Joke ...</Button>:null}

    </div>
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
          {todoList.map((todo,ind)=>{return (<TodoItem checkBoxModifed={(id:any,flag:any)=>{checkChanged(id,flag)}} deleteTodoItem={deleteTodoItem} key={ind} todoItem={todo}></TodoItem>)})}

          </div>

   </div>

  )
}

export default App
