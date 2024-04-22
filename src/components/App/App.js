import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, text: 'Check mail', completed: false, editing: false },
        { id: 2, text: 'Drink coffee', completed: false, editing: false },
        { id: 3, text: 'Refuel the car', completed: false, editing: false },
      ],
      filter: 'all',
    }
  }

  // Изменение значения свойства у элемента
  handleTaskCompleted = (id, completed) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    }))
  }

  // Добавление задач
  handleAddTask = (newTask) => {
    const createdTask = { ...newTask, createdAt: new Date() }
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, createdTask],
    }))
  }

  // Удаление задач
  handleDeleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }))
  }

  // Удаление всех выполненных задач
  handleClearCompletedTasks = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }))
  }

  // Фильтрация по кнопкам
  handleFilterTasks = (filter) => {
    this.setState({ filter })
  }

  filterTasks = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }

  // Состояние задач
  clickOnInput = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  // Подсчет активных задач
  countIncompleteTasks = () => {
    const { tasks } = this.state
    return tasks.filter((task) => !task.completed).length
  }

  // Редактирование задач
  handleEditTask = (id, newText) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    }))
  }

  render() {
    const { filter, tasks } = this.state
    const filteredTasks = this.filterTasks(tasks, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.handleAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={this.handleDeleteTask}
            onTaskCompleted={this.handleTaskCompleted}
            clickOnInput={this.clickOnInput}
            onEditTask={this.handleEditTask}
            createdAt={new Date()}
          />
          <Footer
            filter={this.state.filter}
            onClearCompletedTasks={this.handleClearCompletedTasks}
            onFilterTasks={this.handleFilterTasks}
            countIncompleteTasks={this.countIncompleteTasks}
          />
        </section>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
