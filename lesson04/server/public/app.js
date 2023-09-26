const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5))
})

let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})