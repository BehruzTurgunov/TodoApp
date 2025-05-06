// todo app
const elInput = document.getElementById('title');
const elForm = document.getElementById('form');
const elList = document.getElementById('list');
const elerror = document.getElementById('inputError')
// edit todo
const eleditform = document.querySelector('.FormEdit')
const eleditinput = document.querySelector('.editInput')
const eleditmessage = document.querySelector('.editmessage')
// modal
const elBtn = document.querySelector('.js-modal')
const elmodal = document.querySelector('.modal')
const eloverlay = document.querySelector('.overlay')
const elexite = document.querySelector('.js-exit')
// const elBtn = document.getElementById('btn');


let edititeamid

let todos = JSON.parse(localStorage.getItem('list'))
    ? JSON.parse(localStorage.getItem('list'))
    : []

if (todos.length) showTodos()

// local Storage
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))

}

// time
function time() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
    const year = now.getFullYear()
    return (`${date}.${month}.${year}`);
}

// show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    elList.innerHTML = ''
    todos.forEach((item, i) => {
        elList.innerHTML +=
            `
       
    <li
    class="mt-3 flex w-full items-center justify-between bg-white py-2 px-4 rounded-lg border border-gray-200 shadow">
    <h3>${item.text}</h3>
    <div class="flex items-center space-x-2">
        <span>${item.time}</span>
        <img onclick="editTodo(${i})" src="img/edit-54.svg" alt="edit" class="  text-white rounded-md w-5">

        <img onclick="deleteTodo(${i})" src="/img/Delete-button.svg" alt="delete"
            class=" py-2 px-3 text-white rounded-md ">

    </div>
</li>

        `
    });
}



// errorfunction
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 3000);
}

elForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const todotext = elInput.value.trim()
    elForm.reset()
    if (todotext.length) {
        todos.push({ text: todotext, time: time() })
        setTodos()
        showTodos()
    }

    else {
        showMessage('inputError', 'please enter text...')
    }



})
//  delete
function deleteTodo(id) {

    const deletetodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deletetodos
    setTodos()
    showTodos()

}

// Form Edit

eleditform.addEventListener('submit', (e) => {
    e.preventDefault()
    const todotext = eleditinput.value.trim()
    eleditform.reset()
    if (todotext.length) {
        todos.splice(edititeamid, 1, { text: todotext, time: time() })
        setTodos()
        showTodos()
        modalexit()
    }

    else {
        showMessage('editmessage', 'please enter text...')

    }
})


// todo edit
function editTodo(id) {
    modal()
    edititeamid = id
}

elexite.addEventListener('click', modalexit)
eloverlay.addEventListener('click', modalexit)

// modal
function modal() {
    elmodal.classList.remove('hidden')
    eloverlay.classList.remove('hidden')
}
function modalexit() {
    elmodal.classList.add('hidden')
    eloverlay.classList.add('hidden')
}




// `
//         <li
//         class="mt-3 flex w-full items-center justify-between bg-white py-2 px-4 rounded-lg border border-gray-200 shadow">
//          <h3>${todo.title}</h3>
//          <button onclick="deleteTodo(${todo.id})" class="bg-red-700 py-2 px-3 text-white rounded-md">
//             <i class="bi bi-trash"></i>
//          </button>
//         </li>
//         `