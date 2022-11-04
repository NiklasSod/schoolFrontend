let todosDiv = document.getElementById('todosDiv');
let addTodoBtn = document.getElementById('addTodoBtn');
let headerInput = document.getElementById('headerInput');
let textInput = document.getElementById('textInput');

const fetchTodos = async () => {
  const res = await fetch('http://localhost:9999/api/todos', {
    method: 'GET'
  });
  const data = await res.json();
  appendTodos(data);
  todoCompleted(data);
};

fetchTodos();

const appendTodos = (allTodos) => {
  allTodos.map((todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('id', todo.id);
    todoDiv.setAttribute('class', 'todoDiv');
    todoDiv.addEventListener('click', function(e) {
      if (e.target === todoDeleteBtn) return;
      updateTodo(todo.id);
    });
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todo.header;
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todo.text;
    let todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.innerText = 'Delete';
    todoDeleteBtn.addEventListener('click', function() {
      deleteTodo(todo.id);
    });
    todoDiv.appendChild(todoHeader);
    todoDiv.appendChild(todoParagraph);
    todoDiv.appendChild(todoDeleteBtn);
    todosDiv.appendChild(todoDiv);
  })
};

const todoCompleted = (data) => {
  let count = todosDiv.childElementCount;
  for (let i = 0; i < count; i++) {
    if (data[i].id == todosDiv.children[i].id) {
      data[i].completed ? todosDiv.children[i].classList.add("completed") : todosDiv.children[i].classList.add("not__completed");
    }
  };
};

addTodoBtn.addEventListener('click', (e) => {
  if (headerInput.value.trim() === '' || textInput.value.trim() === '') {
    return;
  };
  fetch('http://localhost:9999/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.random(),
      header: headerInput.value,
      text: textInput.value,
      completed: false 
    })
  });
  location.reload();
});

const updateTodo = (todoId) => {
  fetch('http://localhost:9999/api/todos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: todoId})
  });
  updateColor(todoId);
};

const updateColor = (todoId) => {
  let updateColor = document.getElementById(todoId);
  if (updateColor.classList.contains('completed')) {
    updateColor.classList.remove('completed');
    updateColor.classList.add('not__completed');
  } else {
    updateColor.classList.remove('not__completed');
    updateColor.classList.add('completed');
  };
};

const deleteTodo = (todoId) => {
  fetch('http://localhost:9999/api/todos', {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: todoId})
  });
  location.reload();
};
