const wsUri = "wss://echo.websocket.org/";

function pageLoaded() {
  const wsInfo = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const locationBtn = document.querySelector(".btn_location");
  
  let websocket = new WebSocket(wsUri);
  
  websocket.onopen = function() {
    wsInfo.innerText = 'Соединение установлено'
  };
  
  websocket.onmessage = function(event) {
    writeToChat(event.data, true)
  };
  
  websocket.onerror = function(event) {
    wsInfo.innerHTML = '<span style="color: red;" >ОШИБКА: </span>' + event.data
  };
  
  function writeToChat(message, isRecieved) {
    chatOutput.innerHTML += `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`
  }; 
  
  sendBtn.addEventListener('click', sendMessage);
  
  function sendMessage() {
    if(!input.value) return;
    websocket.send(input.value);
    writeToChat(input.value, false);
    input.value = "";
  }

//Работа с гео-локацией
  function error(){
    let message = "Произошла ошибка";
    writeToChat(message, true);
}
  
  function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let message = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Гео-локация на карте</a>`
    writeToChat(message, true);
}
  
  locationBtn.addEventListener("click", () => {
  
    if(!navigator.geolocation) {
      let message = "Определение местоположения не поддерживается вашим браузером";
      writeToChat(message, true);
    } else {
      let message = "Определение местоположения...";
      writeToChat(message, true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
}); 
};

document.addEventListener("DOMContentLoaded", pageLoaded);