const chatForm = document.getElementById('loginIn');

const socket = io();

socket.on('message', message => {
    console.log(message);
});

//Message submit
loginIn.addEventListener('submit', e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    console.log(msg);
});