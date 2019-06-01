const socket = io()
const $form = document.getElementById('myform')
const $forminput = $form.querySelector('input')
const $formsubmit = $form.querySelector('button')
const $location = document.getElementById('location')
const $messages = document.getElementById('messages')
const messageTemplate = document.getElementById('message-template').innerHTML
const locationTemplate = document.getElementById('location-template').innerHTML


$form.addEventListener('submit', (e) => {
    e.preventDefault()
    $formsubmit.setAttribute('disabled', 'disabled')
    const msg = e.target.elements.message.value;
    socket.emit('sendMessage', msg, (error) => {
        $formsubmit.removeAttribute('disabled')
        $forminput.value = ''
        $forminput.focus()
        if(error){
            return console.log('bad words will not be permitted')
        }
        console.log('Message delivered')
    })
})

$location.addEventListener('click', () => {
    $location.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation){
        return alert('Your browser does not support this.')
    }
    navigator.geolocation.getCurrentPosition(({coords}) => {
        socket.emit('sendLocation', {latitude: coords.latitude, longitude: coords.longitude}, () => {
            $location.removeAttribute('disabled')
            console.log('Location shared')
        })
    })
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('location', (url) => {
    console.log(url)
    const html = Mustache.render(locationTemplate, {
        url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})