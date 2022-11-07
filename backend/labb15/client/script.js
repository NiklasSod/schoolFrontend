let todosDiv = document.getElementById('todosDiv');
let addTodoBtn = document.getElementById('addTodoBtn');
let headerInput = document.getElementById('headerInput');
let textInput = document.getElementById('textInput');
let paginationDiv = document.getElementById('paginationDiv');
let popupDiv = document.getElementById('popupDiv');
let popupHeaderInput = document.getElementById('popupHeaderInput');
let popupTextInput = document.getElementById('popupTextInput');
let updateTodoBtn = document.getElementById('updateTodoBtn');
let cancelUpdateTodoBtn = document.getElementById('cancelUpdateTodoBtn');
let radioBtnFalse = document.getElementById('not_complete');

// used to remember id to popup-modal and edit todo
let updateId = "";

// remade GET to POST so I could add page and fetch only 5 todos instead of all
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

// creates alot but limit of 5 divs with elements and buttons with listeners
const appendTodos = (allTodos) => {
  todosDiv.innerText = '';
  allTodos.map((todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('id', todo.id);
    todoDiv.setAttribute('class', 'todoDiv');
    todoDiv.addEventListener('click', function(e) {
      if (e.target === todoDeleteBtn) return;
      if (e.target === updateTodoTextBtn) return;
      updateTodoComplete(todo.id);
    });
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todo.header;
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todo.text;
    let updateTodoTextBtn = document.createElement('button');
    updateTodoTextBtn.setAttribute('class', 'updateTodoTextBtn');
    updateTodoTextBtn.innerText = 'Update';
    updateTodoTextBtn.addEventListener('click', function() {
      popupDiv.classList.remove('hidden');
      updateId = todo.id;
    });
    let todoDeleteBtn = document.createElement('button');
    todoDeleteBtn.setAttribute('class', 'todoDeleteBtn');
    todoDeleteBtn.innerText = 'x';
    todoDeleteBtn.addEventListener('click', function() {
      deleteTodo(todo.id);
    });
    todoDiv.appendChild(todoHeader);
    todoDiv.appendChild(todoParagraph);
    todoDiv.appendChild(updateTodoTextBtn);
    todoDiv.appendChild(todoDeleteBtn);
    todosDiv.appendChild(todoDiv);
  })
};

// creates a background to todo showing green - completed or red
const todoCompleted = (data) => {
  let count = todosDiv.childElementCount;
  for (let i = 0; i < count; i++) {
    if (data[i].id == todosDiv.children[i].id) {
      data[i].completed ? todosDiv.children[i].classList.add("completed") : todosDiv.children[i].classList.add("not__completed");
    }
  };
};

// if more than 5 todos, create button to another page
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

const updateTodoComplete = (todoId) => {
  fetch('http://localhost:9999/api/todos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: todoId})
  });
  updateColor(todoId);
};

updateTodoBtn.addEventListener('click', (e) => {
  // TODO use info below, create fetch call and add new API to update a todo!
  e.preventDefault();
  console.log(popupHeaderInput.value)
  console.log(popupTextInput.value)
  console.log(updateId)
  radioBtnFalse.checked ? console.log('false') : console.log('true')
});

// close popup-modal
cancelUpdateTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupDiv.classList.add('hidden');
});

// update div-color on frontend, no need to refresh page
// another function does update server at the same time
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
