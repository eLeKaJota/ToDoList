import './styles.css';
import { Todo,TodoList } from './classes';
import {crearTodoHtml} from './js/componentes'


export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); //Si solo tiene un argumento, se puede utilizar así

console.log(todoList);