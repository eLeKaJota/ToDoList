import {Todo} from '../classes';
import {todoList} from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletos = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');



export const crearTodoHtml = (todo) => {
    const htmlTodo = 
    `<li class="${todo.completado?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

txtInput.addEventListener('keyup',(evento) =>{
    if (evento.keyCode === 13 && txtInput.value.length > 0){
        
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        console.log(todoList);
    }
})

divTodoList.addEventListener('click',(evento)=>{
const nombreElemento = evento.target.localName; //Buscamos el input checkbox
const todoElemento = evento.target.parentElement.parentElement; //Buscamos el li
const todoId = todoElemento.getAttribute('data-id');

if(nombreElemento.includes('input')){
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
}
if(nombreElemento.includes('button')){
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
}
    console.log(todoList);
});

btnBorrarCompletos.addEventListener('click',(evento) => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length -1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click',(evento) =>{
    const filtro = evento.target.text;
    if(!filtro) return;
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    evento.target.classList.add('selected');

    for(const e of divTodoList.children){
        e.classList.remove('hidden');
        const completado = e.classList.contains('completed');
        switch (filtro){
            case 'Pendientes':
                if(completado){
                    e.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    e.classList.add('hidden');
                }
        }
    }
});


