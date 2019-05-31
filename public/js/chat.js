const socket = io()
const para = document.getElementById('welcome');
const form = document.getElementById('myform');


myform.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.elements.message.value;
    socket.emit('sendMessage', name)
})

socket.on('message', (msg) => {
    console.log(msg)
})