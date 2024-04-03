
import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Todo } from './Interface/Todo'
import TodoItem from './lib/TodoItem'
import axios from 'axios'
import { JokeResponseModel } from './Interface/JokeResponseModel'
function App() {
  
  
  const [value,setValue]=useState("")
  const [joke,setJoke]=useState<JokeResponseModel | null>(null)
  const [todoList,setTodoList]=useState<Todo[]>(()=>{
    let todos=localStorage.getItem('todoList')
    if(todos)
    return JSON.parse(todos)
  return[]})
  const deleteTodoItem=function(id:number){
    setTodoList(todoList.filter(x=>x.id!==id))
    
  }
  const initialiseJoke=()=>{
    axios.get<JokeResponseModel>('https://v2.jokeapi.dev/joke/Programming')
    .then((res)=>{
      setJoke(res.data) 
    
    }) 
    .catch((err)=>console.error(`error in response ${err}`));
  }
  useEffect(()=>{initialiseJoke()},[])
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

      {joke && joke.joke?<p className='my-8'> {joke.joke}</p>:null}
      {joke && joke.setup?<p className='my-8'>Quesion? {joke.setup}</p>:null}
      {joke && joke.delivery?<p className='my-8'>Response? {joke.delivery}</p>:null}

      {joke?<Button onClick={()=>{initialiseJoke()}}> More Joke ...</Button>:null}

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
