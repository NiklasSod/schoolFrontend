const output = document.querySelector('#output');
const comments = document.querySelector('#comments');

const id = new URLSearchParams(window.location.search).get('id');

let url = 'https://jsonplaceholder.typicode.com/posts/' + id;

const getPost = async() => {
  const res = await fetch(url);
  const post = await res.json();

  let template = `
    <div class="card p-3 mb-3">
      <h2>${post.title}</h2>
      <p class="m-0">${post.body}</p>
    </div>
  `;
  output.insertAdjacentHTML('beforeend', template);
};

const getComments = async() => {
  // const res = await fetch(`something/${id}/comments`);
  // blabla
};

getPost();
getComments();