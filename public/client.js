const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// let d = new Date()
// let t = d.toLocaleTimeString()
// let ti = d.getHours() +":"+ d.getMinutes()
// let a = 11 (testing)
do {
    name = prompt('Please enter your name: ')
    socket.emit('new-user-joined', name)
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function append(message) {
    let me = document.createElement('div');
    me.innerText = message;
    me.classList.add('joined')
    messageArea.append(me);
}

socket.on('user-joined', name => {
    append(name + ' joined the chat room', 'joined')
})

function sendMessage(message) {
    let d = new Date()
    let currentHours = d.getHours();
    let currentMinutes = d.getMinutes();
    if (currentMinutes.toString().length == 1) {
        currentMinutes = "0" + currentMinutes;
    }
        
    let msg = {
        user: name,
        message: message.trim(),
        time: (currentHours +":"+ currentMinutes)
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



