let todosDiv = document.getElementById('todosDiv');

const fetchTodos = async () => {
  const res = await fetch('http://localhost:9999/api/todos');
  const data = await res.json();
  appendTodos(data);
};

fetchTodos();

const appendTodos = (allTodos) => {
  allTodos.map((todo) => {
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('id', todo.id);
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
