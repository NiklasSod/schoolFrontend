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
};

fetchTodos();

const appendTodos = (allTodos) => {
  allTodos.map((todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('class', 'todoDiv');
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todo.header;
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todo.text;
    todoDiv.appendChild(todoHeader);
    todoDiv.appendChild(todoParagraph);
    todosDiv.appendChild(todoDiv);
  })
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
      text: textInput.value
    })
  });
  location.reload();
});
