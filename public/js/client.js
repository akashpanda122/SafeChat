const socket = io()

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinRoom', { username, room});


let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector(".message_area")
do {
    name = prompt("Please enter your name: ")
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //Sending to the server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieving Messages

socket.on("message", (msg) => {
    console.log(message);
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}