import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


class App extends Component {
  
  state={
    task:'',
    taskList:[],
  };
// assigning the input task to state task
  inputChangeHandler = (input)=>{
      this.setState({
        task: input
      });
  }
// Adding the added tasks
  btnAddHandler = (inputTask)=>{
    let item = {
      value: inputTask,
      done: false,
      edit: false
    }
    let newList = [
      ...this.state.taskList,
      item
    ] 
    this.setState({
      taskList:newList,
      task: ''
    })

  }
// deleting the added tasks after clicking the delete buttton
  btnDeleteHandler = (itemIndex) =>{
    this.state.taskList.splice(itemIndex, 1);
    this.setState({taskList: this.state.taskList});
  }
// Striking the task after clicking the done buttton
  btnDoneHandler = (itemIndex) =>{
    let newList = this.state.taskList.map((todo, index) => {
      if(index === itemIndex) {
        return {
          ...todo,
          done: true
        }
      } else {
        return todo
      }
    })
    this.setState({
        taskList : newList,
    })
  }
//Editing the added task after clicking the edit buttton
  editHandler = (itemIndex) => {

    let newList = this.state.taskList.map((todo, index) => {
      if(index === itemIndex) { 
        return {
          ...todo,
          edit: true
        }
      } else {
        return todo
      }
    })
    this.setState({
        taskList : newList,
    })
  }

  //Removing edit mode after double clicking on edit button
  editSaveHandler = (itemIndex) => {

    let newList = this.state.taskList.map((todo, index) => {
      if(index === itemIndex) { 
        return {
          ...todo,
          edit: false
        }
      } else {
        return todo
      }
    })
    this.setState({
        taskList : newList,
    })
  }


  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do App</h1>
        </header>

          <div className="ContentBody">
            {/* input box for adding tasks */}
            <input 
                type="text" 
                className="inputTask"
                placeholder="Add your task" 
                onChange={(event) => this.inputChangeHandler(event.target.value)}
                value ={this.state.task}
                />
            {/* buttton for adding the input task */}
            <button 
                type="submit" 
                className="submitBtn"
                onClick={()=> this.btnAddHandler(this.state.task)} >Add</button> 
            {/* list of all the added tasks  */}
            <ul className="ulTag">
              {this.state.taskList.map((todo,index) => 
                <li className="outputTaskList" 
                    style={{textDecoration: this.state.taskList[index].done ? 'line-through' : 'none', }}>
                {/* Adding the task to output */}
                <div contentEditable= {this.state.taskList[index].edit ? "true" : "false"}
                    style={{width:'300px'}}> {todo.value} </div>
               {/* Different buttons for editing , deleting anf completed */}
                <button 
                      className="outputBtns" 
                      onClick={() => this.btnDoneHandler(index)} > Done</button>
                 <button 
                      className="outputBtns" 
                      onClick={(event) => this.editHandler(index)}
                      onDoubleClick={()=> this.editSaveHandler(index)}> Edit</button>
                <button 
                      className="outputBtns"
                      onClick={(event) => this.btnDeleteHandler(index)} >Delete</button> 
              </li>)}
            </ul>
           
          </div>
      </div>
    );
  }
}

export default App