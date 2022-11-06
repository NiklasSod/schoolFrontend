let todosDiv = document.getElementById('todosDiv');
let addTodoBtn = document.getElementById('addTodoBtn');
let headerInput = document.getElementById('headerInput');
let textInput = document.getElementById('textInput');
let paginationDiv = document.getElementById('paginationDiv');

const fetchTodos = async (page = 0) => {
  const res = await fetch('http://localhost:9999/api/getTodos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({page})
  });
  const data = await res.json();
  appendTodos(data.todos);
  todoCompleted(data.todos);
  pagination(data.length);
};

const appendTodos = (allTodos) => {
  todosDiv.innerText = '';
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

const pagination = (todoAmount) => {
  if (todoAmount <= 5) return;
  paginationDiv.innerText = '';
  for (let i = 0; i < todoAmount; i += 5) {
    if (i > 100) return;
    let pageNumber = document.createElement('button');
    pageNumber.addEventListener('click', (e) => {
      e.preventDefault();
      fetchTodos(Math.floor(i/5));
    });
    i === 0 ? pageNumber.innerText = 1 : pageNumber.innerText = 1 + (i / 5);
    paginationDiv.appendChild(pageNumber);
  };
};

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (headerInput.value.trim() === '' || textInput.value.trim() === '') {
    return;
  };
  const date = Date.now();
  fetch('http://localhost:9999/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.random(),
      createdAt: date,
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
  setTimeout(() => {
    location.reload();
  }, 100);
};

fetchTodos();
