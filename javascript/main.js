const input = document.querySelector("form input");
const ul = document.querySelector(".todos");
const form = document.querySelector("form");

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
  todos.forEach(todo => addTodo(todo))
}

function addTodo(todo) {
  const li = document.createElement('li');

  li.setAttribute('class', todo.completed ? 'completed' : '')

  li.innerHTML = `
    <span>${todo.text}</span>
    <i class="fas fa-trash"></i>
  `;

  li.querySelector('i').addEventListener('click', (e) => {
    e.target.parentElement.remove();
    updateTodo()
  })

  li.addEventListener('click', function() {
    this.classList.toggle('completed')
    updateTodo()
  })

  ul.appendChild(li);
  updateTodo()
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  text !="" ? addTodo({text, completed: false}) : undefined;
  input.value = "";
})

function updateTodo() {
  const list = document.querySelectorAll('li');

  const todos = [];

  list.forEach(item => {
    todos.push({
      text: item.querySelector('span').innerHTML,
      completed: item.classList.contains('completed')
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}
