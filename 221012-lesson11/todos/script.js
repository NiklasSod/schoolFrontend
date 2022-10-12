const output = document.querySelector('#output');
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const error = document.querySelector('#error');

const todos = [];

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  const data = await res.json();
  data.forEach(todo => todos.push(todo))
  
  listTodos()
}
fetchTodos()

const listTodos = () => {
  output.innerHTML = ''
  todos.forEach(todo => {
    output.appendChild(createTodoElement(todo))
  })
}

const createTodoElement = todo => {

  let todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  let title = document.createElement('p');
  title.classList.add('todo-title');
  title.innerText = todo.title;
  if(todo.completed) {
    title.classList.add('completed')
  }

  title.addEventListener('click', () => {toggleComplete(todo, title)})

  let button = document.createElement('button');

  let trash = document.createElement('i');
  trash.classList.add('fa-solid', 'fa-trash-can');

  button.appendChild(trash)

  todoDiv.appendChild(title);
  todoDiv.appendChild(button);

  button.addEventListener('click', () => {removeTodo(todo, todoDiv)})

  return todoDiv;
}

const toggleComplete = (todo, title) => {
  fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      completed: !todo.completed
    })
  })
  .then(res => res.json())
  .then(data => {
    todo.completed = data.completed
    listTodos()
  })
}

const removeTodo = (todo, todoElement) => {
  if(!todo.completed) {
    setError('you need to complete the todo first')
    return
  }

  setSuccess()

  fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
    method: 'DELETE'
  })
  .then(res => {
    console.log(res)
    if(!res.ok) {
      setError('Something went wrong!')
      return
    }

    todos.splice(todos.findIndex(_todo => _todo.id === todo.id), 1)
    listTodos();
  })
}

const addTodo = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    data.id = Date.now()

    todos.push(data)
    output.appendChild(createTodoElement(data))
  })

}

const setError = (message) => {
  error.classList.remove('d-none')
  error.innerText = message
}
const setSuccess = () => {
  error.classList.add('d-none')
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if(input.value.trim() === '') {
    setError('You need to enter what todo')
    return
  }

  setSuccess()
  addTodo(input.value)
  input.value = ''
  input.focus()
})