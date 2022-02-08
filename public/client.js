// comment 1
const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let s1 = new Audio('/sound/pop.mp3')
let s2 = new Audio('/sound/plucky.mp3')
let s3 = new Audio('/sound/intuition.mp3')
let a1 = new Audio('/audio/hey.mp3')
let a2 = new Audio('/audio/heyy.mp3')
let a3 = new Audio('/audio/heyyy.mp3')
let a4 = new Audio('/audio/access-granted.mp3')
let a5 = new Audio('/audio/access-granted1.mp3')
let a6 = new Audio('/audio/answer-will-you.mp3')
let a7 = new Audio('/audio/applauses.mp3')
let a8 = new Audio('/audio/completed.mp3')
let a9 = new Audio('/audio/done.mp3')
let a10 = new Audio('/audio/done1.mp3')
let a11 = new Audio('/audio/done-for-you.mp3')
let a12 = new Audio('/audio/excuse-me.mp3')
let a13 = new Audio('/audio/excuse-me1.mp3')
let a14 = new Audio('/audio/excuse-me2.mp3')
let a15 = new Audio('/audio/guess who.mp3')
let a16 = new Audio('/audio/guess-who1.mp3')
let a17 = new Audio('/audio/guess-what.mp3')
let a18 = new Audio('/audio/creepy door.mp3')
let a19 = new Audio('/audio/haha.mp3')
let a20 = new Audio('/audio/haha1.mp3')
let a21 = new Audio('/audio/huhaha.mp3')
let a22 = new Audio('/audio/hello.mp3')
let a23 = new Audio('/audio/hello1.mp3')
let a24 = new Audio('/audio/hello-interrogative.mp3')
let a25 = new Audio('/audio/hey-take-a-look.mp3')
let a26 = new Audio('/audio/hey-take-a-look1.mp3')
let a27 = new Audio('/audio/hm.mp3')
let a28 = new Audio('/audio/hmm.mp3')
let a29 = new Audio('/audio/hmmm.mp3')
let a30 = new Audio('/audio/if you dont pick up.mp3')
let a31 = new Audio('/audio/if-you-dont-pick-up1.mp3')
let a32 = new Audio('/audio/incoming-call.mp3')
let a33 = new Audio('/audio/incoming-call1.mp3')
let a34 = new Audio('/audio/its-me-again.mp3')
let a35 = new Audio('/audio/knock.mp3')
let a36 = new Audio('/audio/knock-knock.mp3')
let a37 = new Audio('/audio/message.mp3')
let a38 = new Audio('/audio/message1.mp3')
let a39 = new Audio('/audio/message-with-intro3.mp3')
let a40 = new Audio('/audio/mmm.mp3')
let a41 = new Audio('/audio/mmmm.mp3')
let a42 = new Audio('/audio/new-notification.mp3')
let a43 = new Audio('/audio/new-notification1.mp3')
let a44 = new Audio('/audio/okay.mp3')
let a45 = new Audio('/audio/okayy.mp3')
let a46 = new Audio('/audio/pick-me-up.mp3')
let a47 = new Audio('/audio/pick-me-up1.mp3')
let a48 = new Audio('/audio/sorry.mp3')
let a49 = new Audio('/audio/sorryy.mp3')
let a50 = new Audio('/audio/sorry-to-bother-you.mp3')
let a51 = new Audio('/audio/you-have-a-new-message.mp3')
let a52 = new Audio('/audio/you-have-a-new-message1.mp3')
// hgfhgfh
// Chat features
help = `<b>Voice commands:</b> <br>
    #hey<br>
    #heyy<br>
    #heyyy<br>
    #access granted<br>
    #access granted 1<br>
    #answer me<br>
    #applause<br>
    #completed<br>
    #done<br>
    #done 1<br>
    #done for you<br>
    #excuse me<br>
    #excuse me 1<br>
    #excuse me 2<br>
    #guess who<br>
    #guess who 1<br>
    #guess what<br>
    #creepy door<br>
    #haha<br>
    #haha 1<br>
    #huhaha<br>
    #hello<br>
    #hello 1<br>
    #hello?<br>
    #take a look<br>
    #take a look 1<br>
    #hm<br>
    #hmm<br>
    #hmmm<br>
    #if you dont pick<br>
    #if you dont pick 1<br>
    #incoming call<br>
    #incoming call 1<br>
    #its me again<br>
    #knock<br>
    #knock knock<br>
    #message<br>
    #message 1<br>
    #message 2<br>
    #mmm<br>
    #mmmm<br>
    #new notification<br>
    #new notification 1<br>
    #okay<br>
    #okayy<br>
    #pick me up<br>
    #pick me up 1<br>
    #sorry<br>
    #sorryy<br>
    #sorry to bother you<br>
    #you have a new message<br>
    #you have a new message 1<br>
`    

do {
    name = prompt('Please enter your name: ')
    socket.emit('new-user-joined', name)
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function append_uj(message) {
    let uj = document.createElement('div'); 
    uj.innerText = message;
    uj.classList.add('joined')
    messageArea.append(uj);
    s2.play()
}

function append_ul(message) {
    let ul = document.createElement('div'); 
    ul.innerText = message;
    ul.classList.add('left')
    messageArea.append(ul);
}

socket.on('user-joined', name => {
    append_uj(name + ' joined the chat room', 'joined')
    s2.play()
})

socket.on('left', name => {
    append_ul(name + ' left the chat room', 'left')
    s3.play()
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


    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
  
    if (msg.message == "-help") {
        msg.message = help
        appendMessage(msg, 'outgoing')
    }
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
    if (msg.message == '#hey') {
        appendMessage(msg, 'incoming');
        a1.play();
    }
    else if (msg.message == '#heyy') {
        appendMessage(msg, 'incoming');
        a2.play();
    }
    else if (msg.message == '#heyyy') {
        appendMessage(msg, 'incoming');
        a3.play();
    }
    else if (msg.message == '#access granted') {
        appendMessage(msg, 'incoming');
        a4.play();
    }
    else if (msg.message == '#access granted 1') {
        appendMessage(msg, 'incoming');
        a5.play();
    }
    else if (msg.message == '#answer me') {
        appendMessage(msg, 'incoming');
        a6.play();
    }
    else if (msg.message == '#applause') {
        appendMessage(msg, 'incoming');
        a7.play();
    }
    else if (msg.message == '#completed') {
        appendMessage(msg, 'incoming'); 
        a8.play();
    }
    else if (msg.message == '#done') {
        appendMessage(msg, 'incoming');
        a9.play();
    }
    else if (msg.message == '#done 1') {
        appendMessage(msg, 'incoming');
        a10.play();
    }
    else if (msg.message == '#done for you') {
        appendMessage(msg, 'incoming');
        a11.play();
    }
    else if (msg.message == '#excuse me') {
        appendMessage(msg, 'incoming');
        a12.play();
    }
    else if (msg.message == '#excuse me 1') {
        appendMessage(msg, 'incoming');
        a13.play();
    }
    else if (msg.message == '#excuse me 2') {
        appendMessage(msg, 'incoming'); 
        a14.play();
    }
    else if (msg.message == '#guess who') {
        appendMessage(msg, 'incoming');
        a15.play();
    }
    else if (msg.message == '#guess who 1') {
        appendMessage(msg, 'incoming');
        a16.play();
    }
    else if (msg.message == '#guess what') {
        appendMessage(msg, 'incoming');
        a17.play();
    }
    else if (msg.message == '#creepy door') {
        appendMessage(msg, 'incoming');
        a18.play();
    }
    else if (msg.message == '#haha') {
        appendMessage(msg, 'incoming');
        a19.play();
    }
    else if (msg.message == '#haha 1') {
        appendMessage(msg, 'incoming');
        a20.play();
    }
    else if (msg.message == '#huhaha') {
        appendMessage(msg, 'incoming');
        a21.play();
    }
    else if (msg.message == '#hello') {
        appendMessage(msg, 'incoming');
        a22.play();
    }
    else if (msg.message == '#hello 1') {
        appendMessage(msg, 'incoming');
        a23.play();
    }
    else if (msg.message == '#hello?') {
        appendMessage(msg, 'incoming');
        a24.play();
    }
    else if (msg.message == '#take a look') {
        appendMessage(msg, 'incoming');
        a25.play();
    }
    else if (msg.message == '#take a look 1') {
        appendMessage(msg, 'incoming');
        a26.play();
    }
    else if (msg.message == '#hm') {
        appendMessage(msg, 'incoming');
        a27.play();
    }
    else if (msg.message == '#hmm') {
        appendMessage(msg, 'incoming');
        a28.play();
    }
    else if (msg.message == '#hmmm') {
        appendMessage(msg, 'incoming');
        a29.play();
    }
    else if (msg.message == '#if you dont pick') {
        appendMessage(msg, 'incoming'); 
        a30.play();
    }
    else if (msg.message == '#if you dont pick 1') {
        appendMessage(msg, 'incoming');
        a31.play();
    }
    else if (msg.message == '#incoming call') {
        appendMessage(msg, 'incoming');
        a32.play();
    }
    else if (msg.message == '#incoming call 1') {
        appendMessage(msg, 'incoming');
        a33.play();
    }
    else if (msg.message == '#its me again') {
        appendMessage(msg, 'incoming');
        a34.play();
    }
    else if (msg.message == '#knock') {
        appendMessage(msg, 'incoming');
        a35.play();
    }
    else if (msg.message == '#knock knock') {
        appendMessage(msg, 'incoming');
        a36.play();
    }
    else if (msg.message == '#message') {
        appendMessage(msg, 'incoming');
        a37.play();
    }
    else if (msg.message == '#message 1') {
        appendMessage(msg, 'incoming'); 
        a38.play();
    }
    else if (msg.message == '#message 2') {
        appendMessage(msg, 'incoming');
        a39.play();
    }
    else if (msg.message == '#mmm') {
        appendMessage(msg, 'incoming');
        a40.play();
    }
    else if (msg.message == '#mmmm') {
        appendMessage(msg, 'incoming');
        a41.play();
    }
    else if (msg.message == '#new notification') {
        appendMessage(msg, 'incoming');
        a42.play();
    }
    else if (msg.message == '#new notification 1') {
        appendMessage(msg, 'incoming');
        a43.play();
    }
    else if (msg.message == '#okay') {
        appendMessage(msg, 'incoming');
        a44.play();
    }
    else if (msg.message == '#okayy') {
        appendMessage(msg, 'incoming');
        a45.play();
    }
    else if (msg.message == '#pick me up') {
        appendMessage(msg, 'incoming');
        a46.play();
    }
    else if (msg.message == '#pick me up 1') {
        appendMessage(msg, 'incoming');
        a47.play();
    }
    else if (msg.message == '#sorry') {
        appendMessage(msg, 'incoming');
        a48.play();
    }
    else if (msg.message == '#sorryy') {
        appendMessage(msg, 'incoming');
        a49.play();
    }
    else if (msg.message == '#sorry to bother you') {
        appendMessage(msg, 'incoming');
        a50.play();
    }
    else if (msg.message == '#you have a new message') {
        appendMessage(msg, 'incoming');
        a51.play();
    }
    else if (msg.message == '#you have a new message 1') {
        appendMessage(msg, 'incoming');
        a52.play();
    }
    else if (msg.message == help) {
        msg.message = "-help <br><br>"+ msg.message
        appendMessage(msg, 'incoming');    
    }
    else {
        appendMessage(msg, 'incoming');
        s1.play();
    }
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
