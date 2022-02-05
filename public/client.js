const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// let d = new Date()
// let t = d.toLocaleTimeString()
// let ti = d.getHours() +":"+ d.getMinutes()
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim(),
        time: Date.getHours() +":"+ Date.getMinutes()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <h5>${msg.time}</h5>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



