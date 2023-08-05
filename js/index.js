let dataChat = {
  guest: [
    'K đang gặp H',
    'K & H sẽ đến nhà ông Khê.'
  ],
  mine: [
    'Tôi muốn kết nối thử.'
  ]
}

// Debounce function to introduce delay
function debounce(func, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  };
}

// Function to append messages to ChatWindows
function appendMessage(message, messageType) {
  const chatWindow = document.querySelector('#chat_list');

  if (messageType === 'mine') {
    const myMessage = document.createElement('div');
    myMessage.className =
      'ChatItem MyMessage h-[60px] pl-[23px] pr-[30px] py-5 rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[15px] border border-black border-opacity-50 justify-start items-center inline-flex';
    myMessage.innerHTML = `<div class="text-white text-base font-medium">${message}</div>`;
    chatWindow.appendChild(myMessage);
  } else if (messageType === 'guest') {
    const guestMessage = document.createElement('div');
    guestMessage.className =
      'ChatItem GuestMessage h-[60px] px-[23px] py-5 rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] border border-black border-opacity-60 justify-center items-center inline-flex';
    guestMessage.innerHTML = `<div class="text-white text-base font-medium">${message}</div>`;
    chatWindow.appendChild(guestMessage);
  }
}

// Function to handle keyup events globally
function handleKeyUp(event) {
  const inputText = event.key.trim().toLowerCase();
  if (inputText === 'm') {
    // Append your chat message after 100ms
    debounce(() => appendMessage(dataChat.mine.shift(), 'mine'), 100)();
  } else if (inputText === 'g') {
    // Append guest chat message after 100ms
    debounce(() => appendMessage(dataChat.guest.shift(), 'guest'), 100)();
  } else if (inputText === 'c') {
    dataChat = {
      guest: [
        'K đang gặp H',
        'K & H sẽ đến nhà ông Khê.'
      ],
      mine: [
        'Tôi muốn kết nối thử.'
      ]
    }
    // Empty the ChatWindows
    document.querySelector('#chat_list').innerHTML = '';
  }
}

// Function to handle keyup events globally
function sendMyChat() {
  appendMessage(document.getElementById('chat_input').value, 'mine');
  document.getElementById('chat_input').value = '';
}

// Function to handle keyup events globally
function sendMyChatEnter(event) {
  if (event.keyCode === 13) {
    sendMyChat();
  }
}

// Wait for the document to be fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', () => {
  console.log('done load');
  // Add event listener to the document for keyup events
  document.addEventListener('keyup', handleKeyUp);

  // Add event listener to the document for keyup events
  document.getElementById('send_chat').addEventListener('click', sendMyChat);

  document.getElementById('chat_input').addEventListener('keyup', sendMyChatEnter);
});